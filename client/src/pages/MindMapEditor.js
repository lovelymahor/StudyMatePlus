'use client'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ReactFlow, {
  Controls, Background,
  addEdge, applyEdgeChanges, applyNodeChanges,
  MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';
import './MindMapEditor.css';
import './ScrollToTop.css';

import { v4 as uuid } from 'uuid';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Moon, Sun, Download, Upload, Save, Plus, Trash2 } from 'lucide-react';
import { FaArrowUp } from "react-icons/fa";
import * as htmlToImage from 'html-to-image';

// ---- Subject palette ----
const SUBJECTS = {
  Math:   '#4f83cc',
  Science:'#4caf50',
  History:'#ffb300',
  Literature:'#9c27b0',
  CS:     '#5c6bc0',
  Default:'#2d7ef7',
};

// ---- Custom Node Renderer (label+subject+collapse) ----
function StudyNode({ id, data, selected }) {
  const { label, subject, color, onToggleCollapse, collapsed, matchesQuery } = data;
  const bg = color || SUBJECTS[subject] || SUBJECTS.Default;

  return (
    <div className={`node-inner ${matchesQuery ? 'highlight' : ''}`} style={{ background: bg }}>
      <div>{label}</div>
      <div className="node-badge">{subject || 'General'}</div>
      <div className="collapse-toggle" onClick={() => onToggleCollapse?.(id)}>
        {collapsed ? 'Expand' : 'Collapse'}
      </div>
    </div>
  );
}
const nodeTypes = { study: StudyNode };

// ---- Helpers for collapse visibility ----
function computeHiddenTargets(collapsedIds, edges) {
  const hidden = new Set();
  const queue = [...collapsedIds];
  while (queue.length) {
    const src = queue.shift();
    edges.forEach(e => {
      if (e.source === src && !hidden.has(e.target)) {
        hidden.add(e.target);
        queue.push(e.target);
      }
    });
  }
  return hidden;
}

export default function MindMapEditor() {
  const [dark, setDark] = useState(false);
  const [search] = useState(''); // search used for highlight; setter removed as no UI currently updates it

  // Graph state
  const [nodes, setNodes] = useState([
    {
      id: 'root',
      type: 'study',
      position: { x: 250, y: 100 },
      data: { label: 'Study Plan', subject: 'Default', color: SUBJECTS.Default, collapsed: false },
    },
  ]);
  const [edges, setEdges] = useState([]);
  const [selectedId, setSelectedId] = useState('root');
  const [collapsed, setCollapsed] = useState(new Set());
  const [showScroll, setShowScroll] = useState(false);

  // Persist
  useEffect(() => {
    const saved = localStorage.getItem('smp_map_v2');
    const theme = localStorage.getItem('smp_theme');
    if (saved) {
      try {
        const { nodes, edges, collapsed } = JSON.parse(saved);
        setNodes(nodes);
        setEdges(edges);
        setCollapsed(new Set(collapsed || []));
      } catch {}
    }
    if (theme) setDark(theme === 'dark');
  }, []);
  useEffect(() => {
    const toast = document.getElementById('save-toast');
    localStorage.setItem('smp_map_v2', JSON.stringify({ nodes, edges, collapsed: Array.from(collapsed) }));
    if (toast) { toast.style.opacity = 1; setTimeout(() => (toast.style.opacity = 0), 900); }
  }, [nodes, edges, collapsed]);
  useEffect(() => { localStorage.setItem('smp_theme', dark ? 'dark' : 'light'); }, [dark]);

  // Effect to handle scroll events for the button
  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScroll && window.scrollY > 300) {
        setShowScroll(true);
      } else if (showScroll && window.scrollY <= 300) {
        setShowScroll(false);
      }
    };

    window.addEventListener('scroll', checkScrollTop);
    return () => {
      window.removeEventListener('scroll', checkScrollTop);
    };
  }, [showScroll]);

  // Function to scroll to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Derived: filter by collapsed + search highlighting
  const hiddenTargets = useMemo(() => computeHiddenTargets(collapsed, edges), [collapsed, edges]);

  const decoratedNodes = useMemo(() => {
    const q = search.trim().toLowerCase();
    return nodes
      .filter(n => !hiddenTargets.has(n.id) && !collapsed.has(n.id))
      .map(n => ({
        ...n,
        data: {
          ...n.data,
          onToggleCollapse: (id) => {
            setCollapsed(prev => {
              const next = new Set(prev);
              next.has(id) ? next.delete(id) : next.add(id);
              return next;
            });
          },
          matchesQuery: q ? (n.data.label || '').toLowerCase().includes(q) : false,
        },
      }));
  }, [nodes, hiddenTargets, collapsed, search]);

  const visibleEdges = useMemo(() => {
    return edges.filter(e => !hiddenTargets.has(e.source) && !hiddenTargets.has(e.target) && !collapsed.has(e.source));
  }, [edges, hiddenTargets, collapsed]);

  // RF handlers
  const onNodesChange = useCallback(changes => setNodes(nds => applyNodeChanges(changes, nds)), []);
  const onEdgesChange = useCallback(changes => setEdges(eds => applyEdgeChanges(changes, eds)), []);
  const onConnect = useCallback(params => {
    setEdges(eds => addEdge({ ...params, type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } }, eds));
  }, []);

  // Selection
  const onSelectionChange = useCallback(({ nodes }) => {
    if (nodes?.[0]) setSelectedId(nodes[0].id);
  }, []);

  const selectedNode = useMemo(() => nodes.find(n => n.id === selectedId), [nodes, selectedId]);

  // Actions
  const addChild = useCallback((subject = 'Default') => {
    const base = selectedNode || nodes[0];
    if (!base) return;
    const id = uuid();
    const pos = { x: base.position.x + 200, y: base.position.y + (Math.random() * 160 - 80) };
    const color = SUBJECTS[subject] || SUBJECTS.Default;
    const newNode = { id, type: 'study', position: pos, data: { label: `${subject} Topic`, subject, color, collapsed: false } };
    setNodes(nds => nds.concat(newNode));
    setEdges(eds => eds.concat({ id: uuid(), source: base.id, target: id, type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } }));
    setSelectedId(id);
  }, [nodes, selectedNode]);

  const deleteSelected = useCallback(() => {
    if (!selectedNode || selectedNode.id === 'root') return;
    const id = selectedNode.id;
    setNodes(nds => nds.filter(n => n.id !== id));
    setEdges(eds => eds.filter(e => e.source !== id && e.target !== id));
    setSelectedId('root');
  }, [selectedNode]);

  // Inspector edits
  const updateSelected = (patch) => {
    setNodes(nds => nds.map(n => n.id === selectedId ? { ...n, data: { ...n.data, ...patch } } : n));
  };

  // Templates
  const applyTemplate = (type) => {
    if (type === 'exam') {
      const n1 = { id: '1', type: 'study', position: { x: 250, y: 80 }, data: { label: 'Exam Prep', subject: 'Default', color: SUBJECTS.Default } };
      const n2 = { id: '2', type: 'study', position: { x: 60, y: 260 }, data: { label: 'Math', subject: 'Math', color: SUBJECTS.Math } };
      const n3 = { id: '3', type: 'study', position: { x: 250, y: 260 }, data: { label: 'Science', subject: 'Science', color: SUBJECTS.Science } };
      const n4 = { id: '4', type: 'study', position: { x: 440, y: 260 }, data: { label: 'History', subject: 'History', color: SUBJECTS.History } };
      setNodes([n1, n2, n3, n4]);
      setEdges([
        { id: 'e1-2', source: '1', target: '2', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
        { id: 'e1-3', source: '1', target: '3', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
        { id: 'e1-4', source: '1', target: '4', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
      ]);
      setSelectedId('1'); setCollapsed(new Set());
      return;
    }
    if (type === 'research') {
      const ids = ['root','i','m','r','c'];
      const base = [
        { id: ids[0], label:'Research Paper' },
        { id: ids[1], label:'Introduction' },
        { id: ids[2], label:'Method' },
        { id: ids[3], label:'Results' },
        { id: ids[4], label:'Conclusion' },
      ].map((x, idx) => ({
        id: x.id, type:'study',
        position: { x: 140 + idx*160, y: idx ? 260 : 90 },
        data: { label: x.label, subject:'Default', color: SUBJECTS.Default }
      }));
      setNodes(base);
      setEdges(base.slice(1).map(n => ({ id: uuid(), source: ids[0], target: n.id, type:'smoothstep', markerEnd:{ type: MarkerType.ArrowClosed }})));
      setSelectedId(ids[0]); setCollapsed(new Set());
      return;
    }
    if (type === 'planner') {
      const root = { id:'root', type:'study', position:{ x:250, y:90 }, data:{ label:'Today', subject:'Default', color:SUBJECTS.Default }};
      const morn = { id:'m', type:'study', position:{ x:80, y:250 }, data:{ label:'Morning', subject:'Default', color:'#6c8cff' }};
      const noon = { id:'n', type:'study', position:{ x:250, y:250 }, data:{ label:'Afternoon', subject:'Default', color:'#64d2b4' }};
      const eve  = { id:'e', type:'study', position:{ x:420, y:250 }, data:{ label:'Evening', subject:'Default', color:'#ff9e6e' }};
      setNodes([root, morn, noon, eve]);
      setEdges([
        { id: uuid(), source:'root', target:'m', type:'smoothstep', markerEnd:{ type: MarkerType.ArrowClosed }},
        { id: uuid(), source:'root', target:'n', type:'smoothstep', markerEnd:{ type: MarkerType.ArrowClosed }},
        { id: uuid(), source:'root', target:'e', type:'smoothstep', markerEnd:{ type: MarkerType.ArrowClosed }},
      ]);
      setSelectedId('root'); setCollapsed(new Set());
    }
  };

  // Export / Import
  const wrapperRef = useRef(null);
  const exportPNG = () => {
    if (!wrapperRef.current) return;
    htmlToImage.toPng(wrapperRef.current).then((url) => {
      const a = document.createElement('a');
      a.href = url; a.download = 'mindmap.png'; a.click();
    });
  };
  const exportJSON = () => {
    const blob = new Blob([JSON.stringify({ nodes, edges, collapsed: Array.from(collapsed) }, null, 2)], { type:'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'mindmap.json'; a.click();
  };
  const fileRef = useRef(null);
  const importJSON = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result);
        setNodes(parsed.nodes || []); setEdges(parsed.edges || []);
        setCollapsed(new Set(parsed.collapsed || []));
      } catch { alert('Invalid JSON'); }
    };
    reader.readAsText(file);
  };

  return (
    <div className={`mindmap ${dark ? 'dark' : ''}`}>
      {/* Toolbar */}
      <motion.div className="toolbar" initial={{ y: -24, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <div className="group">
          <button onClick={() => applyTemplate('exam')}><Layers size={16}/> Exam Prep</button>
          <button onClick={() => applyTemplate('research')}><Layers size={16}/> Research</button>
          <button onClick={() => applyTemplate('planner')}><Layers size={16}/> Planner</button>
        </div>
        <div className="group">
          <button onClick={() => addChild('Math')}>+ Math</button>
          <button onClick={() => addChild('Science')}>+ Science</button>
          <button onClick={() => addChild('History')}>+ History</button>
          <button onClick={() => addChild('Literature')}>+ Lit</button>
          <button onClick={() => addChild('CS')}>+ CS</button>
        </div>
        {/* <div className="group">
          <input className="search" placeholder="Search node…" value={search} onChange={e => setSearch(e.target.value)} />
        </div> */}
        <div className="group">
          <button onClick={exportPNG}><Download size={16}/> PNG</button>
          <button onClick={exportJSON}><Save size={16}/> JSON</button>
          <label className="button" title="Import JSON">
            <Upload size={16}/> Import
            <input ref={fileRef} type="file" accept="application/json" hidden onChange={(e)=> e.target.files?.[0] && importJSON(e.target.files[0])}/>
          </label>
        </div>
        <div className="group">
          <button onClick={() => setDark(d => !d)}>{dark ? <Sun size={16}/> : <Moon size={16}/>} Theme</button>
        </div>
      </motion.div>

      {/* Canvas */}
      <div className="canvas" ref={wrapperRef}>
        <ReactFlow
          nodeTypes={nodeTypes}
          nodes={decoratedNodes}
          edges={visibleEdges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onSelectionChange={onSelectionChange}
          fitView
        >
          
          <Controls />
          <Background gap={18} />
        </ReactFlow>

        {/* Autosave toast */}
        <div id="save-toast" className="toast">💾 Saved</div>
      </div>

      {/* Inspector */}
      <div className="inspector">
        <h3>Inspector</h3>
        {selectedNode ? (
          <>
            <div className="field">
              <label>Selected Node ID</label>
              <div style={{ fontSize: 12, opacity: .7 }}>{selectedNode.id}</div>
            </div>
            <div className="field">
              <label>Label</label>
              <input
                type="text"
                value={selectedNode.data.label || ''}
                onChange={(e) => updateSelected({ label: e.target.value })}
                placeholder="e.g., Algebra, Literature Review"
              />
            </div>
            <div className="row">
              <div className="field" style={{ flex: 1 }}>
                <label>Subject</label>
                <select
                  value={selectedNode.data.subject || 'Default'}
                  onChange={(e) => {
                    const subj = e.target.value;
                    updateSelected({ subject: subj, color: SUBJECTS[subj] || SUBJECTS.Default });
                  }}
                >
                  {Object.keys(SUBJECTS).map(k => <option key={k} value={k}>{k}</option>)}
                </select>
              </div>
              <div className="field" style={{ width: 110 }}>
                <label>Custom Color</label>
                <input
                  type="color"
                  value={selectedNode.data.color || SUBJECTS.Default}
                  onChange={(e) => updateSelected({ color: e.target.value })}
                />
              </div>
            </div>

            <div className="row">
              <button className="btn-primary" onClick={() => addChild(selectedNode.data.subject || 'Default')}>
                <Plus size={14}/> Add Child
              </button>
              <button className="btn-danger" onClick={deleteSelected} disabled={selectedNode.id === 'root'}>
                <Trash2 size={14}/> Delete
              </button>
            </div>
          </>
        ) : (
          <div style={{ opacity: .7, fontSize: 14 }}>Select a node to edit.</div>
        )}
      </div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScroll && (
          <motion.button
            key="scrollTop"
            className="scroll-to-top"
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ scale: 1.15, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaArrowUp />
          </motion.button>
        )}
      </AnimatePresence>
   </div>
 );
}

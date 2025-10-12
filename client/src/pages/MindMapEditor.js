'use client'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ReactFlow, {
  Controls, Background,
  applyEdgeChanges, applyNodeChanges,
  MarkerType, Handle, Position
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
    <div className={`node-inner ${matchesQuery ? 'highlight' : ''}`} style={{ background: bg, position: 'relative' }}>
      {/* target handle on left */}
      <Handle type="target" position={Position.Left} id="a" style={{ background: '#fff', border: '2px solid rgba(0,0,0,0.12)' }} />
      <div style={{ padding: '8px 12px' }}>
        <div>{label}</div>
        <div className="node-badge">{subject || 'General'}</div>
      </div>
      <div className="collapse-toggle" onClick={() => onToggleCollapse?.(id)}>
        {collapsed ? 'Expand' : 'Collapse'}
      </div>
      {/* source handle on right */}
      <Handle type="source" position={Position.Right} id="b" style={{ background: '#fff', border: '2px solid rgba(0,0,0,0.12)' }} />
    </div>
  );
}
// small draggable waypoint node used to bend edges
// small draggable waypoint node used to bend edges
function WaypointNode({ id, data }) {
  // Provide source and target handles so edges can connect to this waypoint
  return (
    <div className="waypoint-node" title="Waypoint" style={{ position: 'relative' }}>
      <Handle type="target" position={Position.Left} id="left" style={{ background: '#fff', border: '2px solid rgba(0,0,0,0.12)' }} />
      <div className="waypoint-dot" />
      <Handle type="source" position={Position.Right} id="right" style={{ background: '#fff', border: '2px solid rgba(0,0,0,0.12)' }} />
    </div>
  );
}
function InfoNode({ data }) {
  return (
    <div className="info-node">{data?.label || 'Info'}</div>
  );
}
const nodeTypes = { study: StudyNode, waypoint: WaypointNode, info: InfoNode };

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
  const [search] = useState('');

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
  const [selectedEdgeId, setSelectedEdgeId] = useState(null);
  const [collapsed, setCollapsed] = useState(new Set());
  const [showScroll, setShowScroll] = useState(false);
  // connection settings
  const [connLabel, setConnLabel] = useState('');
  const [connType, setConnType] = useState('one-way'); // 'one-way' | 'two-way' | 'none'
  const [connColor, setConnColor] = useState('#4f46e5');
  const [connWidth, setConnWidth] = useState(2);
  const [connLabelBg, setConnLabelBg] = useState(true);
  const [connLabelBgColor, setConnLabelBgColor] = useState('#ffffff');
  const [connLabelTextColor, setConnLabelTextColor] = useState('#111827');
  const [currentTool, setCurrentTool] = useState('one-way'); // one-way | two-way | informational | node | dotted
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

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

  // create a new node (used by Node Box tool)
  const createNodeBox = useCallback(() => {
    const id = uuid();
    const pos = { x: 120 + Math.random() * 200, y: 120 + Math.random() * 200 };
    const color = SUBJECTS.Default;
    const newNode = { id, type: 'study', position: pos, data: { label: `New Node`, subject: 'Default', color, collapsed: false } };
    setNodes(nds => nds.concat(newNode));
    setSelectedId(id);
  }, []);

  const createNodeBoxAt = useCallback((pos) => {
    const id = uuid();
    const color = SUBJECTS.Default;
    const newNode = { id, type: 'study', position: pos, data: { label: `New Node`, subject: 'Default', color, collapsed: false } };
    setNodes(nds => nds.concat(newNode));
    setSelectedId(id);
  }, []);

  const createInfoNodeAt = useCallback((pos) => {
    const id = uuid();
    const newNode = { id, type: 'info', position: pos, data: { label: 'Info', color: '#fff' } };
    setNodes(nds => nds.concat(newNode));
    setSelectedId(id);
  }, []);

  // RF handlers
  const onNodesChange = useCallback(changes => setNodes(nds => applyNodeChanges(changes, nds)), []);
  const onEdgesChange = useCallback(changes => setEdges(eds => applyEdgeChanges(changes, eds)), []);
  const onConnect = useCallback(
    (params) => {
      const id = uuid();
      const baseStyle = { stroke: connColor, strokeWidth: Number(connWidth) };

      if (currentTool === 'node') {
        createNodeBox();
        return;
      }

      if (currentTool === 'informational') {
        // informational: create a waypoint and split the connection into two segments (no arrows)
        const wpId = uuid();
        const srcNode = nodes.find(n => n.id === params.source);
        const tgtNode = nodes.find(n => n.id === params.target);
        const mid = srcNode && tgtNode ? { x: (srcNode.position.x + tgtNode.position.x) / 2, y: (srcNode.position.y + tgtNode.position.y) / 2 } : { x: 120, y: 120 };
        const waypoint = { id: wpId, type: 'waypoint', position: mid, data: {} };
        const edgeA = { id: uuid(), source: params.source, target: wpId, type: 'smoothstep', label: connLabel || undefined, style: { ...baseStyle }, markerEnd: undefined, markerStart: undefined, labelShowBg: connLabelBg, labelBgStyle: { fill: connLabelBgColor }, labelStyle: { fill: connLabelTextColor }, labelBgPadding: [6,4] };
        const edgeB = { id: uuid(), source: wpId, target: params.target, type: 'smoothstep', label: undefined, style: { ...baseStyle }, markerEnd: undefined, markerStart: undefined };
        setNodes(nds => nds.concat(waypoint));
        setEdges(eds => eds.concat([edgeA, edgeB]));
        return;
      }

      if (currentTool === 'dotted') {
        const edge = {
          id,
          source: params.source,
          target: params.target,
          type: 'smoothstep',
          label: connLabel || undefined,
          style: { ...baseStyle, strokeDasharray: '6 6' },
          markerEnd: connType !== 'none' ? { type: MarkerType.ArrowClosed } : undefined,
          markerStart: connType === 'two-way' ? { type: MarkerType.ArrowClosed } : undefined,
          labelShowBg: connLabelBg,
          labelBgStyle: { fill: connLabelBgColor },
          labelStyle: { fill: connLabelTextColor },
          labelBgPadding: [6, 4],
        };
        setEdges((eds) => eds.concat(edge));
        return;
      }

      // default behavior: one-way or two-way based on connType
      const edge = {
        id,
        source: params.source,
        target: params.target,
        type: 'smoothstep',
        label: connLabel || undefined,
        style: { ...baseStyle },
        markerEnd: connType !== 'none' ? { type: MarkerType.ArrowClosed } : undefined,
        markerStart: connType === 'two-way' ? { type: MarkerType.ArrowClosed } : undefined,
        labelShowBg: connLabelBg,
        labelBgStyle: { fill: connLabelBgColor },
        labelStyle: { fill: connLabelTextColor },
        labelBgPadding: [6, 4],
      };
      setEdges((eds) => eds.concat(edge));
    },
    [connColor, connLabel, connType, connWidth, connLabelBg, connLabelBgColor, connLabelTextColor, currentTool, nodes, createNodeBox]
  );

  // Selection
  const onSelectionChange = useCallback(({ nodes, edges }) => {
    // prefer node selection; if an edge is selected set edge id
    if (nodes && nodes[0]) {
      setSelectedId(nodes[0].id);
      setSelectedEdgeId(null);
    } else if (edges && edges[0]) {
      setSelectedEdgeId(edges[0].id);
      setSelectedId(null);
    } else {
      setSelectedId(null);
      setSelectedEdgeId(null);
    }
  }, []);

  const selectedNode = useMemo(() => nodes.find(n => n.id === selectedId), [nodes, selectedId]);
  const selectedEdge = useMemo(() => edges.find(e => e.id === selectedEdgeId), [edges, selectedEdgeId]);

  // Keyboard shortcuts: Delete to remove selected node/edge, Shift+N to create a new node at center
  useEffect(() => {
    const onKey = (e) => {
      // Delete / Backspace removes selected node or edge
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (selectedEdgeId) {
          setEdges(eds => eds.filter(x => x.id !== selectedEdgeId));
          setSelectedEdgeId(null);
          e.preventDefault();
          return;
        }
        if (selectedId && selectedId !== 'root') {
          setNodes(nds => nds.filter(n => n.id !== selectedId));
          setEdges(eds => eds.filter(ed => ed.source !== selectedId && ed.target !== selectedId));
          setSelectedId(null);
          e.preventDefault();
          return;
        }
      }

      // Shift+N creates new node at viewport center
      if (e.key.toLowerCase() === 'n' && e.shiftKey) {
        e.preventDefault();
        // compute center of viewport in react-flow coords
        if (reactFlowInstance && typeof reactFlowInstance.project === 'function') {
          const rect = wrapperRef.current?.getBoundingClientRect();
          const cx = rect ? rect.width / 2 : 200;
          const cy = rect ? rect.height / 2 : 120;
          const pos = reactFlowInstance.project({ x: cx, y: cy });
          createNodeBoxAt(pos);
        } else {
          createNodeBox();
        }
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedId, selectedEdgeId, createNodeBoxAt, createNodeBox, reactFlowInstance]);

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

  // Waypoint helpers (allow bending edges by inserting a tiny draggable waypoint node)
  const splitEdgeToWaypoint = useCallback((edgeId) => {
    // need current nodes/edges via functional updates
    setEdges((eds) => {
      const e = eds.find(x => x.id === edgeId);
      if (!e) return eds;
      const srcNode = nodes.find(n => n.id === e.source);
      const tgtNode = nodes.find(n => n.id === e.target);
      const mid = srcNode && tgtNode ? { x: (srcNode.position.x + tgtNode.position.x) / 2 + 20, y: (srcNode.position.y + tgtNode.position.y) / 2 } : { x: 100, y: 100 };
      const wpId = uuid();
      const waypoint = { id: wpId, type: 'waypoint', position: mid, data: {} };
      const newEdges = eds.filter(x => x.id !== edgeId).concat([
        { id: uuid(), source: e.source, target: wpId, type: e.type, label: e.label, style: e.style, markerEnd: e.markerEnd, markerStart: e.markerStart },
        { id: uuid(), source: wpId, target: e.target, type: e.type, label: e.label, style: e.style, markerEnd: e.markerEnd, markerStart: e.markerStart },
      ]);
      setNodes(nds => nds.concat(waypoint));
      return newEdges;
    });
  }, [nodes]);

  // Insert a waypoint at a specific position and split the given edge
  const insertWaypointAt = useCallback((edgeId, position) => {
    // create waypoint node
    const wpId = uuid();
    const waypoint = { id: wpId, type: 'waypoint', position, data: {} };
    // add waypoint node first
    setNodes(nds => nds.concat(waypoint));
    // split edge into two segments and ensure markers/styles are set so lines render
    setEdges(eds => {
      const e = eds.find(x => x.id === edgeId);
      if (!e) return eds;
      const others = eds.filter(x => x.id !== edgeId);
      const style = e.style || {};
      // keep any start marker on the first segment, move end marker to the second segment
      const a = {
        id: uuid(),
        source: e.source,
        target: wpId,
        type: e.type || 'smoothstep',
        label: e.label,
        style: { ...style },
        markerStart: e.markerStart || undefined,
        markerEnd: undefined,
      };
      const b = {
        id: uuid(),
        source: wpId,
        target: e.target,
        type: e.type || 'smoothstep',
        label: undefined,
        style: { ...style },
        markerStart: undefined,
        markerEnd: e.markerEnd || undefined,
      };
      return others.concat([a, b]);
    });
  }, []);

  const removeWaypoint = useCallback((edgeId) => {
    // find the waypoint node that is adjacent to this edge
    const e = edges.find(x => x.id === edgeId);
    if (!e) return;
    const wp = nodes.find(n => n.type === 'waypoint' && (edges.some(ed => ed.source === n.id && ed.target === e.target) || edges.some(ed => ed.target === n.id && ed.source === e.source)));
    if (!wp) return;
    setNodes(nds => nds.filter(n => n.id !== wp.id));
    setEdges(eds => {
      const before = eds.find(x => x.target === wp.id);
      const after = eds.find(x => x.source === wp.id);
      const others = eds.filter(x => x.source !== wp.id && x.target !== wp.id);
      if (before && after) {
        const joined = { id: uuid(), source: before.source, target: after.target, type: before.type, label: before.label, style: before.style, markerEnd: after.markerEnd };
        return others.concat(joined);
      }
      return others;
    });
  }, [edges, nodes]);

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
      {/* Left tools panel */}
      <div className="left-tools">
        <h4>Tools</h4>
        <div className="tool-list">
          <button className={currentTool==='one-way'? 'active': ''} onClick={()=>{ setCurrentTool('one-way'); setConnType('one-way'); }}>One-way</button>
          <button className={currentTool==='two-way'? 'active': ''} onClick={()=>{ setCurrentTool('two-way'); setConnType('two-way'); }}>Two-way</button>
          <button className={currentTool==='informational'? 'active': ''} onClick={()=>{ setCurrentTool('informational'); setConnType('none'); }}>Informational</button>
          <button className={currentTool==='node'? 'active': ''} onClick={()=>setCurrentTool('node')}>Node Box</button>
          <button className={currentTool==='dotted'? 'active': ''} onClick={()=>{ setCurrentTool('dotted'); setConnType('one-way'); }}>Dotted</button>
          <button className={currentTool==='waypoint'? 'active': ''} onClick={()=>{ setCurrentTool('waypoint'); }}>Waypoint</button>
        </div>
      </div>
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
        <div className="group">
          <button onClick={() => {
            // simple auto-arrange: grid layout
            const perRow = Math.ceil(Math.sqrt(nodes.length || 1));
            const spacingX = 200; const spacingY = 160;
            const arranged = nodes.map((n, idx) => ({
              ...n,
              position: { x: 80 + (idx % perRow) * spacingX, y: 80 + Math.floor(idx / perRow) * spacingY }
            }));
            setNodes(arranged);
          }} title="Auto Arrange">Auto Arrange</button>
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
          onPaneClick={(event, coords) => {
            // coords may be provided by React Flow; prefer using reactFlowInstance.project for accuracy
            const rect = wrapperRef.current?.getBoundingClientRect();
            let pos = null;
            if (reactFlowInstance) {
              // project mouse coordinates to flow coordinates
              const clientX = event.clientX;
              const clientY = event.clientY;
              // project expects coords relative to the container, so subtract bounding rect
              const projected = reactFlowInstance.project({ x: clientX - (rect?.left || 0), y: clientY - (rect?.top || 0) });
              pos = projected;
            } else if (coords) {
              pos = coords;
            } else if (rect) {
              pos = { x: event.clientX - rect.left, y: event.clientY - rect.top };
            }

            if (!pos) return;

            if (currentTool === 'node') {
              createNodeBoxAt(pos);
            }
            if (currentTool === 'informational') {
              createInfoNodeAt(pos);
            }
            }}
            onEdgeDoubleClick={(event, edge) => {
              // compute flow coords and insert waypoint
              const rect = wrapperRef.current?.getBoundingClientRect();
              let pos = null;
              if (reactFlowInstance && typeof reactFlowInstance.project === 'function') {
                const clientX = event.clientX;
                const clientY = event.clientY;
                pos = reactFlowInstance.project({ x: clientX - (rect?.left || 0), y: clientY - (rect?.top || 0) });
              } else {
                if (rect) pos = { x: event.clientX - rect.left, y: event.clientY - rect.top };
              }
              if (pos) insertWaypointAt(edge.id, pos);
            }}
            onEdgeClick={(event, edge) => {
              if (currentTool === 'waypoint') {
                const rect = wrapperRef.current?.getBoundingClientRect();
                let pos = null;
                if (reactFlowInstance && typeof reactFlowInstance.project === 'function') {
                  pos = reactFlowInstance.project({ x: event.clientX - (rect?.left || 0), y: event.clientY - (rect?.top || 0) });
                } else if (rect) {
                  pos = { x: event.clientX - rect.left, y: event.clientY - rect.top };
                }
                if (pos) insertWaypointAt(edge.id, pos);
              }
            }}
          onInit={setReactFlowInstance}
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
        {/* Edge inspector */}
        {selectedEdge && (
          <div style={{ marginTop: 12, borderTop: '1px solid var(--border)', paddingTop: 12 }}>
            <h4>Selected Edge</h4>
            <div style={{ fontSize: 13, opacity: .8 }}>ID: {selectedEdge.id}</div>
            <div style={{ marginTop:8 }}>
              <label style={{ display:'block', fontSize:12 }}>Label</label>
              <input value={selectedEdge.label||''} onChange={(e)=> setEdges(eds=>eds.map(x=> x.id===selectedEdge.id?{...x,label:e.target.value}:x))} />
            </div>
            <div style={{ marginTop:8 }}>
              <button className="btn-danger" onClick={()=>{ setEdges(eds=>eds.filter(x=>x.id!==selectedEdge.id)); setSelectedEdgeId(null); }}>Delete Edge</button>
            </div>
          </div>
        )}
          <hr style={{ margin: '12px 0' }} />
          <h4>Connections</h4>
            <div style={{ marginBottom: 8 }}>
            <label style={{ display: 'block', fontSize: 12 }}>Default label</label>
            <input value={connLabel} onChange={e=>setConnLabel(e.target.value)} placeholder="e.g., causes, leads to" />
            <label style={{ display: 'block', fontSize: 12, marginTop:8 }}>Type</label>
            <select value={connType} onChange={e=>setConnType(e.target.value)}>
              <option value="one-way">One-way</option>
              <option value="two-way">Two-way</option>
              <option value="none">No arrow</option>
            </select>
            <label style={{ display: 'block', fontSize: 12, marginTop:8 }}>Color</label>
            <input type="color" value={connColor} onChange={e=>setConnColor(e.target.value)} />
            <label style={{ display: 'block', fontSize: 12, marginTop:8 }}>Width</label>
            <input type="number" min={1} max={8} value={connWidth} onChange={e=>setConnWidth(e.target.value)} />
              <label style={{ display: 'block', fontSize: 12, marginTop:8 }}>
                <input type="checkbox" checked={connLabelBg} onChange={e=>setConnLabelBg(e.target.checked)} /> Show label background
              </label>
              {connLabelBg && (
                <div style={{ display:'flex', gap:8, alignItems:'center', marginTop:6 }}>
                  <label style={{ fontSize:12 }}>BG</label>
                  <input type="color" value={connLabelBgColor} onChange={e=>setConnLabelBgColor(e.target.value)} />
                  <label style={{ fontSize:12 }}>Text</label>
                  <input type="color" value={connLabelTextColor} onChange={e=>setConnLabelTextColor(e.target.value)} />
                </div>
              )}
          </div>

          <div>
            {edges.length === 0 && <div style={{ color: 'var(--muted)' }}>No connections yet.</div>}
            {edges.map(ed => (
              <div key={ed.id} style={{ display:'flex', gap:8, alignItems:'center', marginBottom:6, background:'var(--bg)', padding:6, borderRadius:6 }}>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:600 }}>{ed.source} → {ed.target}</div>
                  <div style={{ fontSize:12, color:'var(--muted)' }}>{ed.label || '—'}</div>
                  <div style={{ display:'flex', gap:8, marginTop:6 }}>
                    <input style={{flex:1}} value={ed.label||''} onChange={(e)=> setEdges(eds=>eds.map(x=> x.id===ed.id?{...x,label:e.target.value}:x))} />
                    <select value={(ed.markerStart && ed.markerEnd)?'two-way':(ed.markerEnd?'one-way':'none')} onChange={(e)=>{
                      const v=e.target.value;
                      setEdges(eds=>eds.map(x=> x.id===ed.id?{...x, markerEnd: v!=='none' ? { type: MarkerType.ArrowClosed } : undefined, markerStart: v==='two-way' ? { type: MarkerType.ArrowClosed } : undefined }:x));
                    }}>
                      <option value="one-way">One-way</option>
                      <option value="two-way">Two-way</option>
                      <option value="none">No arrow</option>
                    </select>
                    <input type="color" value={ed.style?.stroke||'#4f46e5'} onChange={(e)=> setEdges(eds=>eds.map(x=> x.id===ed.id?{...x, style:{ ...(x.style||{}), stroke:e.target.value }}:x))} />
                    <input type="number" min={1} max={8} value={ed.style?.strokeWidth||2} onChange={(e)=> setEdges(eds=>eds.map(x=> x.id===ed.id?{...x, style:{ ...(x.style||{}), strokeWidth:Number(e.target.value) }}:x))} />
                  </div>
                </div>
                <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                  <button onClick={() => setEdges(eds=>eds.filter(e=>e.id!==ed.id))} className="btn-danger">Delete</button>
                  <button onClick={() => splitEdgeToWaypoint(ed.id)} className="btn">Add waypoint</button>
                  <button onClick={() => removeWaypoint(ed.id)} className="btn">Remove waypoint</button>
                </div>
              </div>
            ))}
          </div>
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

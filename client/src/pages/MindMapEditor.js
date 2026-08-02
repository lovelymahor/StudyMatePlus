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
    document.title = "StudyMatePlus | Mind Map";
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
    setNodes(nds => (nds ?? []).map(n => n.id === selectedId ? { ...n, data: { ...n.data, ...patch } } : n));
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
    .catch(err => console.error(err))
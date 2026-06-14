import React, { useEffect, useState } from "react";
import "./Todo.css";
import Calendar from "../components/Calendar";
import TodoItem from "../components/TodoItem";
import TodoForm from "../components/TodoForm";
import TaskModal from "../components/TaskModal";

const STORAGE_KEY = "smp_tasks_v1";

const defaultForm = { id: null, title: "", description: "", deadline: "", recurrence: "none" };

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function addIntervalToDate(iso, recurrence) {
  const d = new Date(iso);
  if (recurrence === "daily") d.setDate(d.getDate() + 1);
  else if (recurrence === "weekly") d.setDate(d.getDate() + 7);
  else if (recurrence === "monthly") d.setMonth(d.getMonth() + 1);
  return d.toISOString();
}

export default function Todo() {
   document.title = "StudyMatePlus | Todo";
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState(defaultForm);
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Load tasks and normalize recurring tasks so their deadlines are not in the past
    const raw = localStorage.getItem(STORAGE_KEY);
    let loaded = raw ? JSON.parse(raw) : [];

    let changed = false;
    const now = new Date();
    loaded = loaded.map((t) => {
      if (t.recurrence && t.recurrence !== "none") {
        let dl = new Date(t.deadline);
        // move forward until deadline >= today (keep time)
        while (dl < now) {
          dl = new Date(addIntervalToDate(dl.toISOString(), t.recurrence));
          t.deadline = dl.toISOString();
          changed = true;
        }
      }
      return t;
    });

    if (changed) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(loaded));
    }
    setTasks(loaded);

    // Basic notification: ask permission and notify about upcoming tasks (next 24h)
    if ("Notification" in window) {
      if (Notification.permission === "default") Notification.requestPermission();
      if (Notification.permission === "granted") {
        const soon = loaded.filter((t) => {
          const dl = new Date(t.deadline);
          const diff = dl - new Date();
          return diff > 0 && diff <= 24 * 60 * 60 * 1000; // within 24 hours
        });
        soon.slice(0, 3).forEach((t) => {
          new Notification("Upcoming task: " + t.title, {
            body: `Due ${new Date(t.deadline).toLocaleString()}`,
          });
        });
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  function resetForm() {
    setForm(defaultForm);
    setIsEditing(false);
    setShowModal(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.title || !form.deadline) return alert("Please provide a title and deadline");

    if (isEditing) {
      setTasks((prev) => prev.map((t) => (t.id === form.id ? { ...t, ...form } : t)));
      resetForm();
      return;
    }

    const newTask = { ...form, id: generateId(), createdAt: new Date().toISOString() };
    setTasks((prev) => [newTask, ...prev]);
    resetForm();
  }

  function handleEdit(task) {
    setForm({ ...task });
    setIsEditing(true);
    setShowModal(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleDelete(id) {
    if (!window.confirm("Delete this task?")) return;
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  function toggleComplete(id) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  }

  function handleAdvanceOnce(id) {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        if (!t.recurrence || t.recurrence === "none") return t;
        const next = addIntervalToDate(t.deadline, t.recurrence);
        return { ...t, deadline: next };
      })
    );
  }

  return (
    <div className="todo-page">
      <div className="todo-left">
        <Calendar
          tasks={tasks}
          selected={form.deadline}
          onSelect={(d) => {
            const dt = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 9, 0, 0);
            setForm((f) => ({ ...f, deadline: dt.toISOString() }));
            setShowModal(true);
          }}
        />
      </div>

      <div className="todo-card">
        <h2>To‑Do List</h2>
        <p className="muted">Use the calendar to pick a date or click Add New Task in the panel.</p>
        <div style={{marginTop: '0.75rem'}}>
          <strong>{tasks.length} task{tasks.length!==1?'s':''}</strong>
          {tasks.length>0 && (
            <ul style={{marginTop:8, listStyle:'none', padding:0, display:'grid', gap:8}}>
              {tasks.slice(0,3).map(t=> (
                <TodoItem 
                  key={t.id} 
                  task={t} 
                  toggleComplete={toggleComplete} 
                  handleEdit={handleEdit} 
                  handleDelete={handleDelete} 
                  handleAdvanceOnce={handleAdvanceOnce} 
                />
              ))}
            </ul>
          )}
        </div>
      </div>

      <TaskModal 
        isOpen={showModal} 
        onClose={resetForm} 
        title={isEditing ? 'Edit Task' : 'Add New Task'}
      >
        <TodoForm 
          form={form} 
          setForm={setForm} 
          handleSubmit={handleSubmit} 
          resetForm={resetForm} 
          isEditing={isEditing} 
        />
      </TaskModal>

      <div className="todo-list">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <h3>Upcoming Tasks</h3>
          <button
            className="btn-primary"
            onClick={() => {
              setForm(defaultForm);
              setIsEditing(false);
              setShowModal(true);
            }}
          >
            Add New Task
          </button>
        </div>
        {tasks.length === 0 && <p className="muted">No tasks yet — add one above.</p>}
        <ul>
          {tasks.map((t) => (
            <TodoItem 
              key={t.id} 
              task={t} 
              toggleComplete={toggleComplete} 
              handleEdit={handleEdit} 
              handleDelete={handleDelete} 
              handleAdvanceOnce={handleAdvanceOnce} 
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

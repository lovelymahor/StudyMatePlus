import React, { useEffect, useState } from "react";
import "./Todo.css";
import Calendar from "../components/Calendar";

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
    console.log("[Todo] saving tasks", tasks);
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
    console.log("[Todo] adding task", newTask);
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
            // prefill deadline with selected day at 09:00 local time and open modal
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
                <li key={t.id} className="task" style={{padding:'8px', background:'var(--bg)', borderRadius:8}}>
                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <div>
                      <div style={{fontWeight:600}}>{t.title}</div>
                      <div style={{color:'var(--muted)', fontSize:12}}>Due {new Date(t.deadline).toLocaleString()}</div>
                    </div>
                    <div>
                      <button onClick={()=>handleEdit(t)} style={{marginRight:8}}>Edit</button>
                      <button className="danger" onClick={()=>handleDelete(t.id)}>Delete</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Modal for add/edit form */}
      {form && (
        <div className={`smp-modal ${showModal ? 'open' : ''}`}>
          <div className="smp-modal-content">
            <div className="smp-modal-header">
              <h3>{isEditing ? 'Edit Task' : 'Add New Task'}</h3>
              <button aria-label="Close" className="modal-close" onClick={resetForm}>×</button>
            </div>
            <form className="todo-form" onSubmit={handleSubmit}>
              <div className="row">
                <input
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  placeholder="Task title"
                />
                <select value={form.recurrence} onChange={(e) => setForm((f) => ({ ...f, recurrence: e.target.value }))}>
                  <option value="none">Does not repeat</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>

              <textarea
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                placeholder="Description (optional)"
              />

              <div className="row">
                <label className="deadline-label">
                  Deadline
                  <input
                    type="datetime-local"
                        value={form.deadline ? new Date(form.deadline).toISOString().slice(0,16) : ''}
                        onChange={(e) => {
                          const v = e.target.value; // yyyy-mm-ddThh:mm
                          const iso = v ? new Date(v).toISOString() : '';
                          setForm((f) => ({ ...f, deadline: iso }));
                        }}
                  />
                </label>

                <div className="form-actions">
                  <button type="submit" className="btn-primary">
                    {isEditing ? "Save" : "Add Task"}
                  </button>
                  <button type="button" className="btn-secondary" onClick={resetForm}>
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

  <div className="todo-list">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <h3>Upcoming Tasks</h3>
          <button
            className="btn-primary"
            onClick={() => {
              // prepare empty form and open modal
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
            <li key={t.id} className={`task ${t.completed ? "done" : ""}`}>
              <div className="task-main">
                <input type="checkbox" checked={!!t.completed} onChange={() => toggleComplete(t.id)} />
                <div className="task-info">
                  <div className="task-title">{t.title}</div>
                  <div className="task-meta">
                    Due {new Date(t.deadline).toLocaleString()} • {t.recurrence !== "none" ? `${t.recurrence}` : "one‑time"}
                  </div>
                  {t.description && <div className="task-desc">{t.description}</div>}
                </div>
              </div>
              <div className="task-actions">
                {t.recurrence !== "none" && (
                  <button title="Advance to next occurrence" onClick={() => handleAdvanceOnce(t.id)}>
                    ⤴
                  </button>
                )}
                <button onClick={() => handleEdit(t)}>Edit</button>
                <button className="danger" onClick={() => handleDelete(t.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

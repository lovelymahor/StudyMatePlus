import React from 'react';
import { SkipForward } from "lucide-react";

const TodoItem = ({ task, toggleComplete, handleEdit, handleDelete, handleAdvanceOnce }) => {
  return (
    <li className={`task ${task.completed ? "done" : ""}`}>
      <div className="task-main">
        <input 
          type="checkbox" 
          checked={!!task.completed} 
          onChange={() => toggleComplete(task.id)} 
        />
        <div className="task-info">
          <div className="task-title">{task.title}</div>
          <div className="task-meta">
            Due {new Date(task.deadline).toLocaleString()} • {task.recurrence !== "none" ? `${task.recurrence}` : "one‑time"}
          </div>
          {task.description && <div className="task-desc">{task.description}</div>}
        </div>
      </div>
      <div className="task-actions">
        {task.recurrence !== "none" && (
          <button title="Advance to next occurrence" onClick={() => handleAdvanceOnce(task.id)}>
            <SkipForward size={16} />
          </button>
        )}
        <button onClick={() => handleEdit(task)}>Edit</button>
        <button className="danger" onClick={() => handleDelete(task.id)}>
          Delete
        </button>
      </div>
    </li>
  );
};

export default TodoItem;

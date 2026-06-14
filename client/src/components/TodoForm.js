import React from 'react';

const TodoForm = ({ form, setForm, handleSubmit, resetForm, isEditing }) => {
  return (
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
            value={form.deadline ? new Date(form.deadline).toISOString().slice(0, 16) : ''}
            onChange={(e) => {
              const v = e.target.value;
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
  );
};

export default TodoForm;

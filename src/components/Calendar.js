import React, { useMemo, useState } from "react";

function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function endOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

export default function Calendar({ tasks = [], selected, onSelect }) {
  const initial = selected ? new Date(selected) : new Date();
  const [viewDate, setViewDate] = useState(new Date(initial.getFullYear(), initial.getMonth(), 1));

  const start = startOfMonth(viewDate);
  const end = endOfMonth(viewDate);

  const days = useMemo(() => {
    const arr = [];
    const startWeekDay = start.getDay();
    for (let i = 0; i < startWeekDay; i++) arr.push(null);
    for (let d = 1; d <= end.getDate(); d++) arr.push(new Date(viewDate.getFullYear(), viewDate.getMonth(), d));
    return arr;
  }, [viewDate, start, end]);

  const taskDates = useMemo(() => new Set(tasks.map((t) => new Date(t.deadline).toDateString())), [tasks]);
  const todayStr = new Date().toDateString();
  const selectedStr = selected ? new Date(selected).toDateString() : null;

  function prevMonth() {
    setViewDate((v) => new Date(v.getFullYear(), v.getMonth() - 1, 1));
  }

  function nextMonth() {
    setViewDate((v) => new Date(v.getFullYear(), v.getMonth() + 1, 1));
  }

  return (
    <div className="smp-calendar">
      <div className="cal-header">
        <button className="cal-nav" onClick={prevMonth} aria-label="Previous month">‹</button>
        <strong>{viewDate.toLocaleString(undefined, { month: "long" })} {viewDate.getFullYear()}</strong>
        <button className="cal-nav" onClick={nextMonth} aria-label="Next month">›</button>
      </div>
      <div className="cal-grid">
        {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map((d)=> <div key={d} className="cal-weekday">{d}</div>)}
        {days.map((d, idx) => {
          const isToday = d && d.toDateString() === todayStr;
          const hasTask = d && taskDates.has(d.toDateString());
          const isSelected = d && selectedStr && d.toDateString() === selectedStr;
          return (
            <div
              key={idx}
              className={`cal-day ${d ? '' : 'empty'} ${hasTask ? 'has-task' : ''} ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}`}
              onClick={() => d && onSelect && onSelect(d)}
            >
              {d && <span className="cal-day-num">{d.getDate()}</span>}
              {hasTask && <span className="cal-dot" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

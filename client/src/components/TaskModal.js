import React from 'react';
import { X } from "lucide-react";

const TaskModal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className={`smp-modal ${isOpen ? 'open' : ''}`}>
      <div className="smp-modal-content">
        <div className="smp-modal-header">
          <h3>{title}</h3>
          <button aria-label="Close" className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default TaskModal;

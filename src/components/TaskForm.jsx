import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const TaskForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task..."
        className="input-field"
      />
      <button
        type="submit"
        className="btn-primary flex items-center gap-2 whitespace-nowrap"
      >
        <Plus size={20} />
        <span>Add Task</span>
      </button>
    </form>
  );
};

export default TaskForm;

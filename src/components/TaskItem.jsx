import React from 'react';
import { Trash2, CheckCircle, Circle } from 'lucide-react';
import { clsx } from 'clsx';

const TaskItem = ({ task, onToggle, onDelete }) => {
  const isCompleted = task.status === 'completed';

  return (
    <div className="flex items-center justify-between p-4 glass hover:bg-white/15 transition-all duration-300 group">
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={() => onToggle(task.id, isCompleted ? 'pending' : 'completed')}
          className={clsx(
            "transition-colors duration-200",
            isCompleted ? "text-emerald-400" : "text-gray-400 hover:text-indigo-400"
          )}
        >
          {isCompleted ? <CheckCircle size={24} /> : <Circle size={24} />}
        </button>
        
        <span className={clsx(
          "text-lg transition-all duration-300",
          isCompleted ? "text-gray-500 line-through" : "text-white"
        )}>
          {task.title}
        </span>
      </div>

      <button
        onClick={() => onDelete(task.id)}
        className="text-gray-400 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
        title="Delete task"
      >
        <Trash2 size={20} />
      </button>
    </div>
  );
};

export default TaskItem;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTasks, createTask, updateTask, deleteTask } from '../services/api';
import TaskItem from '../components/TaskItem';
import TaskForm from '../components/TaskForm';
import { ClipboardList, Layout, Loader2, Sparkles, LogOut, CheckCircle2, User, AlertCircle } from 'lucide-react';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await getTasks();
      setTasks(response.data);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
      setError('Failed to load tasks. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (title) => {
    try {
      setError(''); // Clear previous errors
      const response = await createTask(title);
      setTasks([response.data, ...tasks]);
    } catch (err) {
      console.error('Add task error:', err);
      setError(err.response?.data?.message || 'Failed to add task. Please check your connection.');
    }
  };

  const handleToggleTask = async (id, newStatus) => {
    try {
      const response = await updateTask(id, { status: newStatus });
      setTasks(tasks.map(t => t.id === id ? response.data : t));
    } catch (err) {
      setError('Failed to update task.');
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter(t => t.id !== id));
    } catch (err) {
      setError('Failed to delete task.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-indigo-500" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-4 pb-12 px-4 md:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="space-y-10 animate-in fade-in slide-in-from-top-4 duration-700">
        {/* Dashboard Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 glass p-6 md:p-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-500/30">
              <CheckCircle2 className="text-white" size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white tracking-tight">TaskFlow <span className="text-indigo-400">Pro</span></h1>
              <div className="flex items-center gap-2 text-gray-400 text-sm mt-1">
                <User size={14} className="text-indigo-400" />
                <span className="font-semibold">{user?.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Header Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          <div className="glass p-6 flex items-center gap-5 glass-hover">
            <div className="p-4 bg-indigo-500/10 rounded-2xl text-indigo-400">
              <ClipboardList size={28} />
            </div>
            <div>
              <p className="text-gray-400 text-sm font-medium">Total Tasks</p>
              <p className="text-3xl font-bold text-white leading-tight">{tasks.length}</p>
            </div>
          </div>
          <div className="glass p-6 flex items-center gap-5 glass-hover">
            <div className="p-4 bg-emerald-500/10 rounded-2xl text-emerald-400">
              <Sparkles size={28} />
            </div>
            <div>
              <p className="text-gray-400 text-sm font-medium">Completed</p>
              <p className="text-3xl font-bold text-white leading-tight">
                {tasks.filter(t => t.status === 'completed').length}
              </p>
            </div>
          </div>
          <div className="glass p-6 flex items-center gap-5 glass-hover">
            <div className="p-4 bg-amber-500/10 rounded-2xl text-amber-400">
              <Layout size={28} />
            </div>
            <div>
              <p className="text-gray-400 text-sm font-medium">Pending</p>
              <p className="text-3xl font-bold text-white leading-tight">
                {tasks.filter(t => t.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>

        {/* Main Section */}
        <div className="glass-dark p-6 md:p-10 space-y-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-1">
              <h2 className="text-3xl font-bold text-white tracking-tight">Your Tasks</h2>
              <p className="text-gray-400">Manage and track your daily productivity</p>
            </div>
            <div className="w-full lg:w-1/2 lg:max-w-md">
              <TaskForm onAdd={handleAddTask} />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-3 p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-2xl text-center justify-center">
              <AlertCircle size={20} />
              <p className="font-medium">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 gap-4">
            {tasks.length === 0 ? (
              <div className="text-center py-20 glass rounded-3xl border-dashed border-2">
                <p className="text-gray-500 text-xl font-medium">No tasks yet. Start by adding one above!</p>
              </div>
            ) : (
              tasks.map(task => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={handleToggleTask}
                  onDelete={handleDeleteTask}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

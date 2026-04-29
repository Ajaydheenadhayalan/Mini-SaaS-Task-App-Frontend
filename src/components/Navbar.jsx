import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogOut, CheckCircle2 } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 px-4 py-2 md:px-8 md:py-4 bg-[#0f172a]/80 backdrop-blur-lg border-b border-white/5">
      <div className="max-w-7xl mx-auto flex justify-between items-center glass px-6 py-3 md:px-10">
        <Link to="/" className="flex items-center gap-3 text-2xl font-black text-white group">
          <div className="p-2 bg-indigo-500 rounded-xl group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-indigo-500/40">
            <CheckCircle2 className="text-white" size={24} />
          </div>
          <span className="hidden sm:inline">TaskFlow <span className="text-indigo-400">SaaS</span></span>
          <span className="sm:hidden text-indigo-400">TF</span>
        </Link>

        <div className="flex items-center gap-4 md:gap-8">
          {token ? (
            <>
              <div className="hidden md:flex flex-col items-end">
                <span className="text-white font-bold text-sm leading-none">{user?.email?.split('@')[0]}</span>
                <span className="text-gray-500 text-[10px] uppercase tracking-widest mt-1 font-black">Pro Member</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-gray-400 hover:text-rose-400 transition-all font-bold group"
              >
                <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          ) : (
            <div className="flex items-center gap-6">
              <Link to="/login" className="text-gray-400 hover:text-white transition-colors font-bold">Login</Link>
              <Link to="/signup" className="btn-primary py-2 px-6">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

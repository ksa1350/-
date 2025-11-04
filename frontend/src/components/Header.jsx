import { Link, NavLink, useNavigate } from 'react-router-dom';
import Button from './Button.jsx';
import { useAuth } from '../hooks/useAuth.js';

const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="border-b border-white/10 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
        <Link to="/" className="flex items-center gap-2 text-lg font-semibold text-white">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500 text-lg font-bold">
            MB
          </span>
          Menu Builder
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'text-white' : '')}>
            Product
          </NavLink>
          <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'text-white' : '')}>
            Dashboard
          </NavLink>
        </nav>
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <span className="hidden text-sm text-slate-300 md:inline">
                {user?.name ?? user?.email}
              </span>
              <Button variant="secondary" onClick={handleLogout}>
                Sign out
              </Button>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Button variant="ghost" onClick={() => navigate('/auth')}>
                Sign in
              </Button>
              <Button onClick={() => navigate('/auth')}>Get started</Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

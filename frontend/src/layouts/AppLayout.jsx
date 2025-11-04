import { Outlet } from 'react-router-dom';
import Header from '../components/Header.jsx';

const AppLayout = () => (
  <div className="flex min-h-screen flex-col bg-slate-950">
    <Header />
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-12">
      <Outlet />
    </main>
    <footer className="border-t border-white/10 py-6 text-center text-sm text-slate-500">
      © {new Date().getFullYear()} Menu Builder. All rights reserved.
    </footer>
  </div>
);

export default AppLayout;

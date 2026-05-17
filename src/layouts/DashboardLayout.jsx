import { Outlet } from 'react-router-dom';

import Sidebar from '../components/Sidebar';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex bg-[#080c10] text-white">
      {/* SIDEBAR */}

      <Sidebar />

      {/* MAIN */}

      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
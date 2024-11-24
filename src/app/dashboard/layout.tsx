import '../globals.css';
import Link from 'next/link';
import Sidebar from './components/Sidebar';


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar />
        <main className="flex-grow bg-slate-100 text-gray-700 m-2 ml-0 rounded-lg p-10">
          {children}
        </main>
      </div>
    );
  }

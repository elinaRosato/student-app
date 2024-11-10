import '../globals.css';
import Link from 'next/link';
import Sidebar from './components/Sidebar';


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-grow bg-gray-100">
          {children}
        </main>
      </div>
    );
  }

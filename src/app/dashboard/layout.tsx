import '../globals.css';
import Link from 'next/link';


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex min-h-screen">
        <div className="flex-1">
          <main className="p-6">{children}</main>
        </div>
      </div>
    );
  }

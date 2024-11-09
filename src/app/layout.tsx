import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';


export const metadata: Metadata = {
  title: 'Student App',
  description: 'The number one tool for students. Created by students, for students.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Student App</title>
      </head>
      <body className={`root-body`}>
        
        {/* Header */}
        <header className="bg-blue-500 p-4 fixed top-0 left-0 w-full flex justify-between items-center z-10">
          <Link href="/">
            <h1 className="font-sans text-background text-3xl font-bold">StudentApp</h1>
          </Link>
          <Link href="/login">
            <button className="bg-background text-blue-500 py-2 px-4 rounded-md">
              Login
            </button>
          </Link>
        </header>

        {/* Main content section */}
        <main className="bg-gray-100 p-6 pt-20 min-h-screen">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-gray-200 p-4">
          <p className="text-center text-sm">© 2024 StudentApp</p>
        </footer>
      </body>
    </html>
  );
}

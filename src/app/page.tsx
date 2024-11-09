import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <header className="bg-blue-500 p-4 fixed top-0 left-0 w-full flex justify-between items-center z-10">
        <h1 className="font-sans text-background text-3xl font-bold">StudentApp</h1>
        <Link href="/login">
          <button className="bg-background text-blue-500 py-2 px-4 rounded-md">
            Login
          </button>
        </Link>
      </header>

      {/* Main content section */}
      <body className="bg-gray-100 p-6 pt-20">
        <section className="h-screen flex flex-col justify-center items-center">
          <h1 className="text-4xl font-semibold mb-4">Welcome to Student App!</h1>
          <p className="text-lg mb-6 text-center">The best tool for students. Built by students, for students</p>
          <Link href="/login">
            <button className="bg-background text-blue-500 py-2 px-4 rounded-md">
              Get started
            </button>
          </Link>
        </section>
      </body>

      {/* Footer */}
      <footer className="bg-gray-200 p-4">
        <p className="text-center text-sm">© 2024 StudentApp</p>
      </footer>
    </>
  );
}

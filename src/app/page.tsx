import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <section className="h-screen flex flex-col justify-center items-center">
        <h1 className="text-4xl font-semibold mb-4">Welcome to Student App!</h1>
        <p className="text-lg mb-6 text-center">The best tool for students. Built by students, for students</p>
        <Link href="/login">
          <button className="bg-background text-blue-500 py-2 px-4 rounded-md">
            Get started
          </button>
        </Link>
      </section>
    </>
  );
}

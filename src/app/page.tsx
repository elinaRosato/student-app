import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <header>
        <h1 className="header-logo">StudentApp</h1>
        <Link href="/login">
          <button className="header-button">Login</button>
        </Link>
      </header>
      <main>
        <section>
          <h1>Welcome to Student App!</h1>
          <p>The best tool for students. Built by students, for students</p>
          <Link href="/login">
            <button className="header-button">Get started</button>
          </Link>
        </section>
      </main>
      <footer></footer> 
    </>
  );
}

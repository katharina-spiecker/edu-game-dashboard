import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <header className="bg-yellow-300">
        <nav className="mx-auto max-w-2xl py-3 px-4">
          <a className="me-7" href="/">
            Alle Themen
          </a>
        </nav>
      </header>
      <main className="bg-slate-100 pt-5 md:pt-10">
        <div className="mx-auto max-w-2xl px-4">
          <Outlet />
        </div>
      </main>
    </>
  );
}
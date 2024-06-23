import { Outlet } from "react-router-dom";

export default function Layout() {

    return (
        <>
            <header className="bg-yellow-300">
                <nav className="sm:container mx-auto py-3">
                    <a className="me-7" href="/">Übersicht</a>
                    <a href="">Einstellung</a>
                </nav>
            </header>
            <main className="bg-slate-100 pt-10">
                <div className="mx-auto max-w-2xl">
                    <Outlet />
                </div>
            </main>
        </>
    )
}
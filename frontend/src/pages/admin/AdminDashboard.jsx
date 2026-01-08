import { NavLink, Outlet } from "react-router-dom";

export default function AdminDashboard() {
    return (
        <div className="flex min-h-screen">
            <aside className="w-64 bg-slate-900 text-white p-5">
                <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

                <nav className="flex flex-col gap-3">
                    <NavLink to="appointments">Appointments</NavLink>
                    <NavLink to="cases">Cases</NavLink>
                </nav>
            </aside>

            <main className="flex-1 bg-gray-100">
                <Outlet />
            </main>
        </div>
    );
}

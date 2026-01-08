import { NavLink, Outlet } from "react-router-dom";

export default function UserDashboard() {
    return (
        <div className="flex min-h-screen">
            <aside className="w-64 bg-blue-900 text-white p-5">
                <h2 className="text-xl font-bold mb-6">User Panel</h2>

                <nav className="flex flex-col gap-3">
                    <NavLink to="appointments">My Appointments</NavLink>
                    <NavLink to="create">Create Appointment</NavLink>
                </nav>
            </aside>

            <main className="flex-1 bg-gray-100">
                <Outlet />
            </main>
        </div>
    );
}

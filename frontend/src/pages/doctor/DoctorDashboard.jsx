import { NavLink, Outlet } from "react-router-dom";

export default function DoctorDashboard() {
    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 text-white p-5">
                <h2 className="text-xl font-bold mb-6">Doctor Panel</h2>

                <nav className="flex flex-col gap-3">
                    <NavLink
                        to="appointments"
                        className={({ isActive }) =>
                            isActive ? "font-bold" : ""
                        }
                    >
                        Appointments
                    </NavLink>

                    <NavLink
                        to="cases"
                        className={({ isActive }) =>
                            isActive ? "font-bold" : ""
                        }
                    >
                        Cases
                    </NavLink>
                </nav>
            </aside>

            {/* Content */}
            <main className="flex-1 bg-gray-100">
                <Outlet />
            </main>
        </div>
    );
}

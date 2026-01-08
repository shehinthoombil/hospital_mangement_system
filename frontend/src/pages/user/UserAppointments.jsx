import { useEffect, useState } from "react";
import {
    getMyAppointments,
    cancelAppointment,
} from "../../api/user.api";

export default function UserAppointments() {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        load();
    }, []);

    const load = async () => {
        const res = await getMyAppointments();
        setAppointments(res.data.data);
    };

    const cancel = async (id) => {
        await cancelAppointment(id);
        load();
    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">My Appointments</h2>

            {appointments.map((a) => (
                <div
                    key={a.id}
                    className="border p-4 rounded mb-3 flex justify-between"
                >
                    <div>
                        <p>Date: {new Date(a.appointmentDate).toLocaleString()}</p>
                        <p>Status: {a.status}</p>
                        {a.assignedDoctor && (
                            <p>Doctor: {a.assignedDoctor.name}</p>
                        )}
                    </div>

                    {a.status === "CREATED" && (
                        <button
                            className="btn"
                            onClick={() => cancel(a.id)}
                        >
                            Cancel
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
}

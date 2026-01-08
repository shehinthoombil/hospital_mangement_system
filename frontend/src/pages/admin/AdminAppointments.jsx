import { useEffect, useState } from "react";
import { getAllAppointments } from "../../api/admin.api";
import AssignDoctorModal from "./AssignDoctorModal";

export default function AdminAppointments() {
    const [appointments, setAppointments] = useState([]);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        load();
    }, []);

    const load = async () => {
        const res = await getAllAppointments();
        setAppointments(res.data.data);
    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">All Appointments</h2>

            {appointments.map((a) => (
                <div
                    key={a.id}
                    className="border p-4 rounded mb-3 flex justify-between"
                >
                    <div>
                        <p>Status: {a.status}</p>
                        <p>Date: {new Date(a.appointmentDate).toLocaleString()}</p>
                    </div>

                    {!a.assignedDoctor && (
                        <button
                            className="btn"
                            onClick={() => setSelected(a)}
                        >
                            Assign Doctor
                        </button>
                    )}
                </div>
            ))}

            {selected && (
                <AssignDoctorModal
                    appointment={selected}
                    onClose={() => setSelected(null)}
                    onAssigned={load}
                />
            )}
        </div>
    );
}

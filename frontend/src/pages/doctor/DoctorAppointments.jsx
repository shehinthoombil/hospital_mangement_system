import { useEffect, useState } from "react";
import {
    getAssignedAppointments,
    updateAppointmentStatus,
} from "../../api/doctor.api";
import CreateCaseModal from "./CreateCaseModal";

export default function DoctorAppointments() {
    const [appointments, setAppointments] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    useEffect(() => {
        load();
    }, []);

    const load = async () => {
        const res = await getAssignedAppointments();
        setAppointments(res.data.data);
    };

    const changeStatus = async (id, status) => {
        await updateAppointmentStatus(id, status);
        load();
    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Assigned Appointments</h2>

            {appointments.map((a) => (
                <div
                    key={a.id}
                    className="border p-4 rounded mb-3 flex justify-between"
                >
                    <div>
                        <p>Date: {new Date(a.appointmentDate).toLocaleString()}</p>
                        <p>Status: {a.status}</p>
                    </div>

                    <div className="flex gap-2">
                        {a.status === "ASSIGNED" && (
                            <button
                                className="btn"
                                onClick={() => changeStatus(a.id, "CONFIRMED")}
                            >
                                Confirm
                            </button>
                        )}

                        {a.status === "CONFIRMED" && (
                            <>
                                <button
                                    className="btn"
                                    onClick={() => changeStatus(a.id, "COMPLETED")}
                                >
                                    Complete
                                </button>

                                <button
                                    className="btn"
                                    onClick={() => setSelectedAppointment(a)}
                                >
                                    Create Case
                                </button>
                            </>
                        )}
                    </div>
                </div>
            ))}

            {selectedAppointment && (
                <CreateCaseModal
                    appointment={selectedAppointment}
                    onClose={() => setSelectedAppointment(null)}
                />
            )}
        </div>
    );
}

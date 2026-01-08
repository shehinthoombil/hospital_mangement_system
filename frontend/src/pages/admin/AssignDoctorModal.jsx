import { useEffect, useState } from "react";
import { assignDoctor } from "../../api/admin.api";
import api from "../../api/axios";

export default function AssignDoctorModal({
    appointment,
    onClose,
    onAssigned,
}) {
    const [doctors, setDoctors] = useState([]);
    const [doctorId, setDoctorId] = useState("");

    useEffect(() => {
        api.get("/users?role=DOCTOR").then((res) =>
            setDoctors(res.data.data)
        );
    }, []);

    const submit = async () => {
        await assignDoctor(appointment.id, doctorId);
        onAssigned();
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
            <div className="bg-white p-6 rounded w-96">
                <h3 className="font-bold mb-4">Assign Doctor</h3>

                <select
                    className="w-full border p-2 mb-3"
                    onChange={(e) => setDoctorId(e.target.value)}
                >
                    <option>Select doctor</option>
                    {doctors.map((d) => (
                        <option key={d.id} value={d.id}>
                            {d.name}
                        </option>
                    ))}
                </select>

                <div className="flex justify-end gap-2">
                    <button onClick={onClose}>Cancel</button>
                    <button onClick={submit} className="btn">
                        Assign
                    </button>
                </div>
            </div>
        </div>
    );
}

import { useState } from "react";
import { createAppointment } from "../../api/user.api";

export default function CreateAppointment() {
    const [date, setDate] = useState("");

    const submit = async () => {
        await createAppointment({ appointmentDate: date });
        alert("Appointment created");
    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Create Appointment</h2>

            <input
                type="datetime-local"
                className="border p-2 mb-3"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />

            <button className="btn" onClick={submit}>
                Create
            </button>
        </div>
    );
}

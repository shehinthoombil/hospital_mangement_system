import { useState } from "react";
import { createCase } from "../../api/case.api";

export default function CreateCaseModal({ appointment, onClose }) {
    const [description, setDescription] = useState("");

    const submit = async () => {
        await createCase({
            appointmentId: appointment.id,
            description,
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white p-6 rounded w-96">
                <h3 className="font-bold mb-3">Create Case</h3>

                <textarea
                    className="w-full border p-2 mb-3"
                    placeholder="Case description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <div className="flex justify-end gap-2">
                    <button onClick={onClose}>Cancel</button>
                    <button onClick={submit} className="btn">
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
}

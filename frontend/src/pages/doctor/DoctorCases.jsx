import { useEffect, useState } from "react";
import { getDoctorCases } from "../../api/case.api";

export default function DoctorCases() {
    const [cases, setCases] = useState([]);

    useEffect(() => {
        load();
    }, []);

    const load = async () => {
        const res = await getDoctorCases();
        setCases(res.data.data);
    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">My Cases</h2>

            {cases.map((c) => (
                <div key={c.id} className="border p-4 rounded mb-3">
                    <p>Status: {c.status}</p>
                    <p>{c.description}</p>
                </div>
            ))}
        </div>
    );
}

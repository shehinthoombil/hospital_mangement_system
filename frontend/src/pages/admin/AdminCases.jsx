import { useEffect, useState } from "react";
import { getAllCases } from "../../api/admin.api";

export default function AdminCases() {
    const [cases, setCases] = useState([]);

    useEffect(() => {
        load();
    }, []);

    const load = async () => {
        const res = await getAllCases();
        setCases(res.data.data);
    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">All Cases</h2>

            {cases.map((c) => (
                <div key={c.id} className="border p-4 rounded mb-3">
                    <p>Status: {c.status}</p>
                    <p>{c.description}</p>
                </div>
            ))}
        </div>
    );
}

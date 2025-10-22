import { useState } from "react";

export default function Home() {
    const [status, setStatus] = useState("Idle");

    return (
        <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Robot Control Panel</h2>
            <p>Current status: {status}</p>
            <button
                className="bg-blue-600 text-white px-4 py-2 rounded mt-3"
                onClick={() => setStatus("Running")}
            >
                Start Robot
            </button>
        </div>
    );
}

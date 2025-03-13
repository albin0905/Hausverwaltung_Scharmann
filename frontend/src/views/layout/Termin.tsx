import { useState } from "react";
import {useAuth} from "../../common/context/AuthContext";

export default function Termin() {
    const [grund, setGrund] = useState("");
    const [date, setDate] = useState("");
    const [message, setMessage] = useState("");

    const auth = useAuth();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const appointmentData = {
            userId: auth.currentUser?.id,
            date,
            time: "10:00",
            description: grund,
            confirmed: false
        };

        try {
            const response = await fetch("http://localhost:3000/appointments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(appointmentData),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage("Termin erfolgreich erstellt!");
            } else {
                setMessage(data.message || "Fehler beim Erstellen des Termins");
            }
        } catch (error) {
            console.error("Fehler:", error);
            setMessage("Netzwerkfehler");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-96 p-6 shadow-lg bg-white rounded-lg">
                <h2 className="text-xl font-bold mb-4">Terminwunsch</h2>
                {message && <p className="text-green-500">{message}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block font-medium">Grund</label>
                        <input
                            type="text"
                            value={grund}
                            onChange={(e) => setGrund(e.target.value)}
                            required
                            className="w-full border p-2 rounded"
                            placeholder="Warum möchten Sie einen Termin haben"
                        />
                    </div>

                    <div>
                        <label className="block font-medium">Wunschdatum</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                            className="w-full border p-2 rounded"
                        />
                    </div>

                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                        Absenden
                    </button>
                </form>
            </div>
        </div>
    );
}
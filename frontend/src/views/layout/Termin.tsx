import { useState } from "react";
import { useAuth } from "../../common/context/AuthContext";
import { useNavigate } from "react-router-dom"; // Importiere useNavigate

export default function Termin() {
    const [grund, setGrund] = useState("");
    const [date, setDate] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const auth = useAuth();
    const navigate = useNavigate(); // Hook zum Navigieren

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const appointmentData = {
            userId: auth.currentUser?.id,
            date,
            time: "10:00",
            description: grund,
            confirmed: false,
        };

        try {
            const response = await fetch("http://localhost:3000/appointments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(appointmentData),
            });

            if (response.ok) {
                setShowPopup(true);
                setGrund("");
                setDate("");
                setTimeout(() => setShowPopup(false), 3000);
                setTimeout(() => navigate("/"), 3000);
            }
        } catch (error) {
            console.error("Fehler:", error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100 relative">
            <div className="w-96 p-6 shadow-lg bg-white rounded-lg">
                <h2 className="text-xl font-bold mb-4">Terminwunsch</h2>
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

            {showPopup && (
                <div className="absolute top-4 right-4 bg-green-500 p-3 rounded">
                    <p className="font-bold">Termin erfolgreich angefragt!</p>
                </div>
            )}
        </div>
    );
}
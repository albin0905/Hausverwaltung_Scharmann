import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useAuth } from "../../common/context/AuthContext";
import { IUser } from "../../common/models/IUser.d";
import {useNavigate} from "react-router-dom";

export default function Settings() {
    const { currentUser } = useAuth();
    const [formData, setFormData] = useState<IUser | null>(currentUser);
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            setFormData({ ...currentUser });
        }
    }, [currentUser]);

    if (!formData) return <p>Kein Nutzer angemeldet</p>;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://macar.info/davidApi/user/${currentUser?.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const updatedUser = await response.json();
            if (response.ok) {
                alert("Daten erfolgreich aktualisiert!");
            } else {
                alert("Fehler: " + updatedUser.message);
            }

            navigate('/');
        } catch (error) {
            console.error("Fehler beim Aktualisieren der Daten", error);
        }
    };

    return (
        <div className="container mx-auto p-4 max-w-md">
            <h1 className="text-xl font-bold mb-4">Benutzereinstellungen</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block">Vorname:</label>
                    <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} className="w-full border p-2" />
                </div>
                <div>
                    <label className="block">Nachname:</label>
                    <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} className="w-full border p-2" />
                </div>
                <div>
                    <label className="block">E-Mail:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border p-2" />
                </div>
                <div>
                    <label className="block">Telefon:</label>
                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full border p-2" />
                </div>
                <div>
                    <label className="block">Adresse:</label>
                    <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full border p-2" />
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 w-full">Speichern</button>
            </form>
        </div>
    );
}
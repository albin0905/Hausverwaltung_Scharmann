import React, { useState, useEffect } from "react";
import '../../styles/appointmentCalender.css';
import { IAppointment } from "../../common/models/IAppointment.d";
import { IUser } from "../../common/models/IUser.d";

const Kalender: React.FC = () => {
    const [appointments, setAppointments] = useState<IAppointment[]>([]);
    const [unconfirmedAppointments, setUnconfirmedAppointments] = useState<IAppointment[]>([]);
    const [user, setUser] = useState<IUser | null>(null);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedAppointment, setSelectedAppointment] = useState<IAppointment | null>(null);
    const [newAppointment, setNewAppointment] = useState({ userId: '', date: '', time: '', description: '' });
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetch("http://localhost:3000/appointments")
            .then((res) => res.json())
            .then((data) => {
                setAppointments(data);
            })
            .catch((err) => console.error("Fehler beim Laden der Termine:", err));

        fetch("http://localhost:3000/appointments/unconfirmed")
            .then((res) => res.json())
            .then((data) => {
                setUnconfirmedAppointments(data);
            })
            .catch((err) => console.error("Fehler beim Abrufen der unbestätigten Termine:", err));
    }, []);

    const fetchUserDetails = (userId: number) => {
        fetch(`http://localhost:3000/user/${userId}`)
            .then((res) => res.json())
            .then((data) => {
                console.log("Fetched User:", data);
                setUser(data);
            })
            .catch((err) => console.error("Fehler beim Laden der Benutzerdaten:", err));
    };

    const handleConfirmAppointment = async (id: number) => {
        try {
            const res = await fetch(`http://localhost:3000/appointments/confirm/${id}`, {
                method: "PUT",
            });

            if (!res.ok) {
                const errorData = await res.json();
                setErrorMessage(errorData.message || "Fehler beim Bestätigen des Termins");
                return;
            }

            const data = await res.json();
            console.log("Termin bestätigt:", data.appointment);

            setUnconfirmedAppointments(unconfirmedAppointments.filter((appt) => appt.id !== id));
            setAppointments([...appointments, data.appointment]);
        } catch (err) {
            console.error("Fehler beim Bestätigen des Termins:", err);
        }
    };

    const handleRejectAppointment = async (id: number) => {
        try {
            const res = await fetch(`http://localhost:3000/appointments/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                const errorData = await res.json();
                setErrorMessage(errorData.message || "Fehler beim Ablehnen des Termins");
                return;
            }

            const data = await res.json();
            console.log("Termin abgelehnt:", data.message);

            setUnconfirmedAppointments(unconfirmedAppointments.filter((appt) => appt.id !== id));
        } catch (err) {
            console.error("Fehler beim Ablehnen des Termins:", err);
        }
    };

    const handleDayClick = (day: number) => {
        const formattedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        const formattedDateString = formattedDate.toISOString().split('T')[0];
        const appointment = appointments.find((appt) => appt.date === formattedDateString);

        if (appointment) {
            setSelectedAppointment(appointment);
            fetchUserDetails(appointment.userId);
        }
    };

    const handlePrevMonth = () => {
        setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)));
    };

    const handleNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)));
    };

    const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

    const weekdays = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
    const adjustedFirstDay = (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1);

    const handleAddAppointment = async () => {
        setErrorMessage('');
        try {
            const userRes = await fetch(`http://localhost:3000/user/${newAppointment.userId}`);
            if (!userRes.ok) {
                setErrorMessage("Benutzer nicht gefunden");
                return;
            }

            const appointmentData = {
                userId: newAppointment.userId,
                date: newAppointment.date,
                time: newAppointment.time,
                description: newAppointment.description,
                confirmed: true,
            };

            const res = await fetch("http://localhost:3000/appointments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(appointmentData),
            });

            if (!res.ok) {
                const errorData = await res.json();
                console.error("Error creating appointment:", errorData);
                setErrorMessage(errorData.message || "Fehler beim Erstellen des Termins");
                return;
            }

            const data = await res.json();
            setAppointments([...appointments, data.appointment]);
            setNewAppointment({ userId: '', date: '', time: '', description: '' });
        } catch (err) {
            console.error("Fehler beim Erstellen des Termins:", err);
        }
    };

    const handleDeleteAppointment = async (id: number) => {
        try {
            const res = await fetch(`http://localhost:3000/appointments/${id}`, {
                method: "DELETE",
            });
            if (!res.ok) {
                throw new Error("Fehler beim Löschen des Termins");
            }
            setAppointments(appointments.filter(appt => appt.id !== id));
            setSelectedAppointment(null);
        } catch (err) {
            console.error("Fehler beim Löschen des Termins:", err);
        }
    };

    return (
        <div className="calendar-container">
            <h1 className="calendar-title">Termin-Kalender</h1>
            <div className="calendar-header">
                <button onClick={handlePrevMonth}>&lt;</button>
                <h2>{currentMonth.toLocaleDateString('de-DE', { year: 'numeric', month: 'long' })}</h2>
                <button onClick={handleNextMonth}>&gt;</button>
            </div>
            <div className="calendar-grid">
                {weekdays.map((weekday, index) => (
                    <div key={index} className="calendar-day weekday">
                        {weekday}
                    </div>
                ))}

                {[...Array(adjustedFirstDay)].map((_, index) => (
                    <div key={"empty-" + index} className="calendar-day empty"></div>
                ))}

                {[...Array(daysInMonth)].map((_, day) => {
                    const currentDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day + 2);
                    const formattedDate = currentDate.toISOString().split('T')[0];
                    const hasAppointment = appointments.some((appt) => appt.date === formattedDate && appt.confirmed !== false);

                    return (
                        <div
                            key={day}
                            className={`calendar-day ${hasAppointment ? "has-appointment" : ""}`}
                            onClick={() => handleDayClick(day + 2)}
                            style={{
                                backgroundColor: hasAppointment ? 'blue' : 'transparent',
                                color: hasAppointment ? 'white' : 'black',
                            }}
                        >
                            {day + 1}
                        </div>
                    );
                })}
            </div>

            {unconfirmedAppointments.length > 0 && (
                <div className="unconfirmed-appointments">
                    <h3>Unbestätigte Termine</h3>
                    <ul>
                        {unconfirmedAppointments.map((appointment) => (
                            <li key={appointment.id}>
                                {appointment.date} - {appointment.time} - {appointment.description}
                                <button onClick={() => handleConfirmAppointment(appointment.id)}>Bestätigen</button>
                                <button onClick={() => handleRejectAppointment(appointment.id)}>Ablehnen</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {selectedAppointment && (
                <div className="appointment-details">
                    <h3>Termin Details</h3>
                    <p><strong>Datum:</strong> {selectedAppointment.date}</p>
                    <p><strong>Uhrzeit:</strong> {selectedAppointment.time}</p>
                    <p><strong>Beschreibung:</strong> {selectedAppointment.description}</p>
                    <p><strong>Benutzer:</strong>{user?.firstname + " " + user?.lastname}</p>
                    <button onClick={() => handleDeleteAppointment(selectedAppointment.id)}>Löschen</button>
                    <button onClick={() => setSelectedAppointment(null)}>Schließen</button>
                </div>
            )}

            <div className="appointment-form">
                <h3>Neuen Termin hinzufügen</h3>
                <input
                    type="text"
                    placeholder="Benutzer-ID"
                    value={newAppointment.userId}
                    onChange={(e) => setNewAppointment({ ...newAppointment, userId: e.target.value })}
                />
                <input
                    type="date"
                    value={newAppointment.date}
                    onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                />
                <input
                    type="time"
                    value={newAppointment.time}
                    onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Beschreibung"
                    value={newAppointment.description}
                    onChange={(e) => setNewAppointment({ ...newAppointment, description: e.target.value })}
                />
                <button onClick={handleAddAppointment}>Hinzufügen</button>
                {errorMessage && <p className="error">{errorMessage}</p>}
            </div>
        </div>
    );
};

export default Kalender;
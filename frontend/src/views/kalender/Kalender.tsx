import React, { useState, useEffect } from "react";
import '../../styles/appointmentCalender.css';
import { IAppointment } from "../../common/models/IAppointment.d";
import { IUser } from "../../common/models/IUser.d";

const Kalender: React.FC = () => {
    const [appointments, setAppointments] = useState<IAppointment[]>([]);
    const [user, setUser] = useState<IUser | null>(null);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedAppointment, setSelectedAppointment] = useState<IAppointment | null>(null);
    const [newAppointment, setNewAppointment] = useState({ userId: '', date: '', time: '', description: '' });
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetch("https://macar.info/davidApi/appointments")
            .then((res) => res.json())
            .then((data: IAppointment[]) => {
                console.log("Fetched Appointments:", data);
                setAppointments(data);
            })
            .catch((err) => console.error("Fehler beim Laden der Termine:", err));
    }, []);

    const fetchUserDetails = (userId: number) => {
        fetch(`https://macar.info/davidApi/user/${userId}`)
            .then((res) => res.json())
            .then((data) => {
                console.log("Fetched User:", data);
                setUser(data);
            })
            .catch((err) => console.error("Fehler beim Laden der Benutzerdaten:", err));
    };

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const handleDayClick = (day: number) => {
        const formattedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        const formattedDateString = formattedDate.toISOString().split('T')[0];
        const appointment = appointments.find((appt) => appt.date === formattedDateString);
        console.log(appointment);
        if (appointment) {
            setSelectedAppointment(appointment);
            fetchUserDetails(appointment.userId); // Benutzer anhand der userId abfragen
        }
    };

    const handlePrevMonth = () => {
        setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)));
    };

    const handleNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)));
    };

    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDayOfMonth = getFirstDayOfMonth(currentMonth);

    const weekdays = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
    const adjustedFirstDay = (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1);

    const handleAddAppointment = async () => {
        setErrorMessage('');
        try {
            const userRes = await fetch(`https://macar.info/davidApi/user/${newAppointment.userId}`);
            if (!userRes.ok) {
                setErrorMessage("Benutzer nicht gefunden");
                return;
            }

            const res = await fetch("https://macar.info/davidApi/appointments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newAppointment),
            });

            if (!res.ok) {
                throw new Error("Fehler beim Erstellen des Termins");
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
            const res = await fetch(`https://macar.info/davidApi/appointments/${id}`, {
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
                <h2>{currentMonth.toLocaleDateString('de-DE', {year: 'numeric', month: 'long'})}</h2>
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
                    const hasAppointment = appointments.some((appt) => appt.date === formattedDate);

                    return (
                        <div
                            key={day}
                            className={`calendar-day ${hasAppointment ? "has-appointment" : ""}`}
                            onClick={() => handleDayClick(day + 2)}
                            style={{
                                backgroundColor: hasAppointment ? 'blue' : 'transparent',
                                color: hasAppointment ? 'white' : 'black'
                            }}
                        >
                            {day + 1}
                        </div>
                    );
                })}
            </div>
            {selectedAppointment && (
                <div className="appointment-details">
                    <h3>Termin Details</h3>
                    <p><strong>Datum:</strong> {selectedAppointment.date}</p>
                    <p><strong>Uhrzeit:</strong> {selectedAppointment.time}</p>
                    <p><strong>Beschreibung:</strong> {selectedAppointment.description}</p>
                    <p><strong>Benutzer:</strong>
                        {user?.firstname + " " + user?.lastname}
                    </p>
                    <button onClick={() => handleDeleteAppointment(selectedAppointment.id)}>Löschen</button>
                    <button onClick={() => setSelectedAppointment(null)}>Schließen</button>
                </div>
            )}

            <div className="appointment-form">
                <h3>Neuen Termin hinzufügen</h3>
                <input type="text" placeholder="Benutzer-ID" value={newAppointment.userId}
                       onChange={(e) => setNewAppointment({...newAppointment, userId: e.target.value})}/>
                <input type="date" value={newAppointment.date}
                       onChange={(e) => setNewAppointment({...newAppointment, date: e.target.value})}/>
                <input type="time" value={newAppointment.time}
                       onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})}/>
                <input type="text" placeholder="Beschreibung" value={newAppointment.description}
                       onChange={(e) => setNewAppointment({...newAppointment, description: e.target.value})}/>
                <button onClick={handleAddAppointment}>Hinzufügen</button>
                {errorMessage && <p className="error">{errorMessage}</p>}
            </div>
        </div>
    );
};

export default Kalender;
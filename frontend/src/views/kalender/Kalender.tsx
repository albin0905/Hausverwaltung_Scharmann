import React, { useState, useEffect } from "react";
import '../../styles/appointmentCalender.css';
import { IAppointment } from "../../common/models/IAppointment.d";

const Kalender: React.FC = () => {
    const [appointments, setAppointments] = useState<IAppointment[]>([]);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedAppointment, setSelectedAppointment] = useState<IAppointment | null>(null);

    useEffect(() => {
        fetch("http://localhost:3000/appointments")
            .then((res) => res.json())
            .then((data: IAppointment[]) => setAppointments(data))
            .catch((err) => console.error("Fehler beim Laden der Termine:", err));
    }, []);

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
        const formattedDateString = formattedDate.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
        const appointment = appointments.find((appt) => appt.date === formattedDateString);
        if (appointment) {
            setSelectedAppointment(appointment);
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
                    const currentDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day+2);
                    const formattedDate = currentDate.toISOString().split('T')[0];
                    const hasAppointment = appointments.some((appt) => appt.date === formattedDate);

                    return (
                        <div
                            key={day}
                            className={`calendar-day ${hasAppointment ? "has-appointment" : ""}`}
                            onClick={() => handleDayClick(day+2)}
                            style={{ backgroundColor: hasAppointment ? 'blue' : 'transparent', color: hasAppointment ? 'white' : 'black' }}
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
                    <button onClick={() => setSelectedAppointment(null)}>Schließen</button>
                </div>
            )}
        </div>
    );
};

export default Kalender;
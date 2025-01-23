import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useLanguage} from "../../common/context/LanguageContext";
import {IUser} from "../../common/models/IUser.d";

const UserAnzeige: React.FC = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [newUser, setNewUser] = useState<Omit<IUser, 'id'>>({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        administrator: 0
    });
    const language = useLanguage();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/user');
                setUsers(response.data);
            } catch (err) {
                console.error('Fehler beim Abrufen der Benutzer:', err);
                setError('Fehler beim Laden der Benutzer.');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleAddUser = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/user', newUser);
            alert('Benutzer erfolgreich hinzugefügt!');
            setUsers([...users, { id: users.length + 1, ...newUser }]);
            setNewUser({ firstname: '', lastname: '', email: '', password: '', phone: '', address: '', administrator: 0 });
            setShowForm(false);
        } catch (err: any) {
            console.error('Fehler beim Hinzufügen des Benutzers:', err);
            alert(err.response?.data?.message || 'Fehler beim Erstellen des Benutzers');
        }
    };

    return (
        <div className="container">
            <h2>{language.texts.userList}</h2>
            {loading ? (
                <p>Lade Benutzer...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <ul className="list-group">
                    <table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>{language.texts.firstname}</th>
                            <th>{language.texts.lastname}</th>
                            <th>E-Mail</th>
                            <th>{language.texts.phoneNumber}</th>
                            <th>{language.texts.adresse}</th>
                            <th>Admin</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.firstname}</td>
                                <td>{user.lastname}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>{user.address}</td>
                                <td>{user.administrator ? 'Ja' : 'Nein'}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </ul>
            )}

            <button className="toggle-form-btn" onClick={() => setShowForm(!showForm)}>
                {showForm ? 'Formular schließen' : 'Neuen Benutzer hinzufügen'}
            </button>

            {showForm && (
                <form className="user-form" onSubmit={handleAddUser}>
                    <h3>Neuen Benutzer hinzufügen</h3>
                    <div className="form-group">
                        <label>Vorname</label>
                        <input type="text" value={newUser.firstname} onChange={(e) => setNewUser({ ...newUser, firstname: e.target.value })} required />
                    </div>
                    <div className="form-group">
                        <label>Nachname</label>
                        <input type="text" value={newUser.lastname} onChange={(e) => setNewUser({ ...newUser, lastname: e.target.value })} required />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} required />
                    </div>
                    <div className="form-group">
                        <label>Passwort</label>
                        <input type="password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} required />
                    </div>
                    <div className="form-group">
                        <label>Telefon</label>
                        <input type="text" value={newUser.phone} onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label>Adresse</label>
                        <input type="text" value={newUser.address} onChange={(e) => setNewUser({ ...newUser, address: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label>Administrator</label>
                        <input type="checkbox" checked={!!newUser.administrator} onChange={(e) => setNewUser({ ...newUser, administrator: e.target.checked ? 1 : 0 })} />
                    </div>
                    <button type="submit" className="submit-btn">Benutzer hinzufügen</button>
                </form>
            )}
        </div>
    );
};

export default UserAnzeige;
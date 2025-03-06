import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useLanguage} from "../../common/context/LanguageContext";
import {IUser} from "../../common/models/IUser.d";

const UserAnzeige: React.FC = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState<number | null>(null);
    const [editUser, setEditUser] = useState<IUser | null>(null);
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
                const response = await axios.get('https://macar.info/davidApi/user');
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
            await axios.post('https://macar.info/davidApi/user', newUser);
            alert('Benutzer erfolgreich hinzugefügt!');
            setUsers([...users, { id: users.length + 1, ...newUser }]);
            setNewUser({ firstname: '', lastname: '', email: '', password: '', phone: '', address: '', administrator: 0 });
            setShowForm(false);
        } catch (err: any) {
            console.error('Fehler beim Hinzufügen des Benutzers:', err);
            alert(err.response?.data?.message || 'Fehler beim Erstellen des Benutzers');
        }
    };

    const handleDeleteUser = async (id: number) => {
        if (!window.confirm('Möchtest du diesen Benutzer wirklich löschen?')) return;

        try {
            await axios.delete(`https://macar.info/davidApi/user/${id}`);
            alert('Benutzer erfolgreich gelöscht!');
            setUsers(users.filter(user => user.id !== id));
        } catch (err) {
            console.error('Fehler beim Löschen des Benutzers:', err);
            alert('Fehler beim Löschen des Benutzers');
        }
    };

    const handleUpdateUser = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editUser) return;

        try {
            await axios.put(`https://macar.info/davidApi/user/${editUser.id}`, editUser);
            alert('Benutzer erfolgreich aktualisiert!');
            setUsers(users.map(u => (u.id === editUser.id ? editUser : u)));
            setShowEditForm(null);
        } catch (err) {
            console.error('Fehler beim Aktualisieren des Benutzers:', err);
            alert('Fehler beim Aktualisieren des Benutzers');
        }
    };

    const handleEditUser = (user: IUser) => {
        setEditUser(user);
        setShowEditForm(user.id);
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
                            <th>{language.texts.firstname}</th>
                            <th>{language.texts.lastname}</th>
                            <th>E-Mail</th>
                            <th>{language.texts.password}</th>
                            <th>{language.texts.phoneNumber}</th>
                            <th>{language.texts.adresse}</th>
                            <th>Admin</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.firstname}</td>
                                <td>{user.lastname}</td>
                                <td>{user.email}</td>
                                <td>*****</td>
                                <td>{user.phone}</td>
                                <td>{user.address}</td>
                                <td>{user.administrator ? 'Ja' : 'Nein'}</td>
                                <td>
                                    <button className="edit-btn" onClick={() => handleEditUser(user)}>✏️</button>
                                    <button className="delete-btn" onClick={() => handleDeleteUser(user.id)}>X</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </ul>
            )}

            <button className="toggle-form-btn" onClick={() => setShowForm(!showForm)}>
                {showForm ? 'Formular schließen' : language.texts.addUser}
            </button>

            {showForm && (
                <form className="user-form" onSubmit={handleAddUser}>
                    <h3>{language.texts.addUser}</h3>
                    <div className="form-group">
                        <label>{language.texts.firstname}</label>
                        <input type="text" value={newUser.firstname}
                               onChange={(e) => setNewUser({...newUser, firstname: e.target.value})} required/>
                    </div>
                    <div className="form-group">
                        <label>{language.texts.lastname}</label>
                        <input type="text" value={newUser.lastname}
                               onChange={(e) => setNewUser({...newUser, lastname: e.target.value})} required/>
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" value={newUser.email}
                               onChange={(e) => setNewUser({...newUser, email: e.target.value})} required/>
                    </div>
                    <div className="form-group">
                        <label>{language.texts.password}</label>
                        <input type="password" value={newUser.password}
                               onChange={(e) => setNewUser({...newUser, password: e.target.value})} required/>
                    </div>
                    <div className="form-group">
                        <label>{language.texts.phoneNumber}</label>
                        <input type="text" value={newUser.phone}
                               onChange={(e) => setNewUser({...newUser, phone: e.target.value})}/>
                    </div>
                    <div className="form-group">
                        <label>{language.texts.adresse}</label>
                        <input type="text" value={newUser.address}
                               onChange={(e) => setNewUser({...newUser, address: e.target.value})}/>
                    </div>
                    <button type="submit" className="submit-btn">{language.texts.addUser}</button>
                </form>
            )}

            {showEditForm && editUser && (
                <form className="user-form" onSubmit={handleUpdateUser}>
                    <h3>{language.texts.updateUser}</h3>
                    <div className="form-group">
                        <label>{language.texts.firstname}</label>
                        <input type="text" value={editUser.firstname}
                               onChange={(e) => setEditUser({...editUser, firstname: e.target.value})} required/>
                    </div>
                    <div className="form-group">
                        <label>{language.texts.lastname}</label>
                        <input type="text" value={editUser.lastname}
                               onChange={(e) => setEditUser({...editUser, lastname: e.target.value})} required/>
                    </div>
                    <div className="form-group">
                        <label>E-Mail</label>
                        <input type="text" value={editUser.email}
                               onChange={(e) => setEditUser({...editUser, email: e.target.value})} required/>
                    </div>
                    <div className="form-group">
                        <label>{language.texts.password}</label>
                        <input type="text" value={editUser.password}
                               onChange={(e) => setEditUser({...editUser, password: e.target.value})} required/>
                    </div>
                    <div className="form-group">
                        <label>{language.texts.phoneNumber}</label>
                        <input type="text" value={editUser.phone}
                               onChange={(e) => setEditUser({...editUser, phone: e.target.value})} required/>
                    </div>
                    <div className="form-group">
                        <label>{language.texts.adresse}</label>
                        <input type="text" value={editUser.address}
                               onChange={(e) => setEditUser({...editUser, address: e.target.value})} required/>
                    </div>
                    <button type="submit" className="submit-btn">{language.texts.safe}</button>
                </form>
            )}
        </div>
    );
};

export default UserAnzeige;
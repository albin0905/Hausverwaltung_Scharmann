import {createContext, useState, ReactNode, useContext} from 'react';

type Language = 'de' | 'en' | 'al';
interface LanguageContextType {
    language: Language;
    texts: typeof texts['de'];
    setLanguage: (lang: Language) => void;
}

const texts = {
    de: {
        settings: 'Einstellungen', german: 'Deutsch', english: 'Englisch', albanian: 'Albanisch',
        login: 'Login', impressum: 'Impressum', hausverwaltung: 'Hausverwaltung', house: 'Haus', dashboard: 'Dashboard',
        mainpage: 'Hauptseite', accounting: 'Buchhaltung', calendar: 'Kalender', rights: 'Rechte', home: 'Startseite',
        user: 'Nutzer', userList: 'Benutzerliste', firstname: 'Vorname', lastname: 'Nachname', phoneNumber: 'Telefon',
        adresse: 'Adresse', addUser: 'Benutzer hinzufügen', updateUser: 'Benutzer bearbeiten', safe: 'Speichern',
        backToHouses: 'Zurück zu den Häusern', flatsInHouse: 'Wohnungen in ', flat: 'Wohnung',
        floor: 'Etage', numberOfRooms: 'Zimmeranzahl', bathrooms: 'Badezimmer', toilets: 'Toiletten', kitchen: 'Küche',
        balconies: 'Balkone', bedrooms: 'Schlafzimmer', storageRooms: 'Lagerräume', forRent: 'Zu vermieten',
        name: 'Name', cancel: 'Abbrechen', add: 'Hinzufügen', addNewHouse: 'Neues Haus hinzufügen', addNewFlat: 'Neue Wohnung hinzufügen',
        delete: 'Löschen', deleteFlat: 'Wohnung löschen', edit: 'Bearbeiten', yes:'Ja', no:'Nein', password:'Passwort'
    },
    en: {
        settings: 'Settings', german: 'German', english: 'English', albanian: 'Albanian',
        login: 'Login', impressum: 'Imprint', hausverwaltung: 'House Management', house: 'House', dashboard: 'Dashboard',
        mainpage: 'Mainpage', accounting: 'Accounting', calendar: 'Calendar', rights: 'Rights', home: 'Home',
        user: 'User', userList: 'User List', firstname: 'Firstname', lastname: 'Lastname', phoneNumber: 'Phone',
        adresse: 'Address', addUser: 'Add User', updateUser: 'Update User', safe: 'Save',
        backToHouses: 'Back to houses', flatsInHouse: 'Flats in house', flat: 'Flat',
        floor: 'Floor', numberOfRooms: 'Number of rooms', bathrooms: 'Bathrooms', toilets: 'Toilets', kitchen: 'Kitchen',
        balconies: 'Balconies', bedrooms: 'Bedrooms', storageRooms: 'Storage rooms', forRent: 'For rent',
        name: 'Name', cancel: 'Cancel', add: 'Add', addNewHouse: 'Add new house', addNewFlat: 'Add new flats',
        delete: 'Delete', deleteFlat: 'Delete flat', edit: 'Edit', yes:'Yes', no:'No', password:'Password'
    },
    al: {
        settings: 'Cilësimet', german: 'Gjermane', english: 'Anglisht', albanian: 'Shqiptare', login: 'Identifikimi',
        impressum: 'Gjurmë', hausverwaltung: 'Menaxhimi i pronës', house: 'Shtëpi', dashboard: 'Pult',
        mainpage: 'Faqja Kryesore', accounting: 'Kontabilitetit', calendar: 'Kalendar', rights: 'Drejtë', home: 'Faqja kryesore',
        user: 'Përdorues', userList: 'Lista e Përdoruesve', firstname: 'Emri i parë', lastname: 'Mbiemri', phoneNumber: 'Telefon',
        adresse: 'Adresa', addUser: 'Shto përdorues', updateUser: 'Përditëso përdoruesin', safe: 'Ruaj',
        backToHouses: 'Kthehu te shtëpitë', flatsInHouse: 'Apartamentet në shtëpi', flat: 'Apartament',
        floor: 'Kate', numberOfRooms: 'Numri i dhomave', bathrooms: 'Banjo', toilets: 'Tualete', kitchen: 'Kuzhinë',
        balconies: 'Ballkone', bedrooms: 'Dhoma gjumi', storageRooms: 'Magazina', forRent: 'Me qira',
        name: 'Emri', cancel: 'Anulo', add: 'Shto', addNewHouse: 'Shto shtëpi të re', addNewFlat: 'Shto apartament të ri',
        delete: 'Fshij', deleteFlat: 'Fshij apartamentin', edit: 'Redakto', yes:'Po', no:'Nr', password:'Password'
    }
};

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useState<Language>('de');

    return <LanguageContext.Provider value={{language, texts: texts[language], setLanguage}}>
        {children}
    </LanguageContext.Provider>;
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
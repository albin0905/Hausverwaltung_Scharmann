import {createContext, useState, ReactNode, useContext} from 'react';

type Language = 'de' | 'en' | 'al';
interface LanguageContextType {
    language: Language;
    texts: typeof texts['de'];
    setLanguage: (lang: Language) => void;
}

const texts = {
    de: {settings:'Einstellungen', german:'Deutsch', english:'Englisch', albanian:'Albanisch',
        login:'Login', impressum:'Impressum', hausverwaltung:'Hausverwaltung', house:'Haus', dashboard:'Dashboard',
        mainpage:'Hauptseite', accounting:'Buchhaltung', calendar:'Kalender', rights:'Rechte', home:'Startseite',
        user:'Nutzer', userList:'Benutzerliste', firstname:'Vorname', lastname:'Nachname', phoneNumber:'Telefon',
        adresse:'Adresse'
    },
    en: {settings:'Settings', german:'German', english:'English', albanian:'Albanian',
        login:'Login', impressum: 'Imprint', hausverwaltung:'House Management', house:'House', dashboard:'Dashboard',
        mainpage:'Mainpage', accounting: 'Accounting', calendar: 'Calendar', rights:'Rights', home: 'Home',
        user: 'User', userList:'User List', firstname:'Firstname', lastname:'Lastname', phoneNumber:'Phone',
        adresse:'Address'
    },
    al:{settings:'Cilësimet', german: 'Gjermane', english:'Anglisht', albanian:'Shqiptare', login:'Identifikimi',
        impressum:'Gjurmë', hausverwaltung:'Menaxhimi i pronës', house:'Shtëp', dashboard:'Pult',
        mainpage: 'Faqja Kryesore', accounting:'Kontabilitetit', calendar:'Kalendar', rights:'Drejtë', home:'Faqja kryesore',
        user:'Përdorues', userList:'Lista e Përdoruesve', firstname:'Emri i parë', lastname:'Mbiemri', phoneNumber:'Telefon',
        adresse:'Adresa'
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
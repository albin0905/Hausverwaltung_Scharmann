import React from 'react';
import { Container, Typography } from "@mui/material";
import profilbild from '../../assets/Helmut.png';

function Impressum() {
    return (
        <Container className={"marginSettings impressum"}>
            <Typography variant="h4" gutterBottom>Impressum</Typography>

            <img src={profilbild} alt="Profilbild Helmut Scharmann" style={{ width: "30%", marginBottom: "1rem" }} />

            <p><strong>Firma:</strong> Hausverwaltung Scharmann</p>
            <p><strong>Geschäftsführer:</strong> Helmut Scharmann</p>
            <p><strong>Rechtsform:</strong> Einzelunternehmen</p>
            <p><strong>Anschrift:</strong> Eibiswald 27, 8552 Eibiswald, Österreich</p>
            <p><strong>Telefon:</strong> +43 3466 42326</p>
            <p><strong>E-Mail:</strong> helmut.scharmann@aon.at</p>
            <p><strong>UID-Nummer:</strong> ATU12345678</p>
            <p><strong>Gewerbebehörde:</strong> Bezirkshauptmannschaft Deutschlandsberg</p>
            <p><strong>Mitglied bei:</strong> Wirtschaftskammer Steiermark, Fachgruppe Immobilien- und Vermögenstreuhänder</p>
            <p><strong>Gewerbeordnung:</strong> www.ris.bka.gv.at</p>

            <Typography variant="h5" gutterBottom style={{ marginTop: "2rem" }}>Haftung für Inhalte</Typography>
            <p>
                Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
                Als Diensteanbieter sind wir gemäß § 18 ECG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Wir sind jedoch nicht verpflichtet, übermittelte
                oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
            </p>

            <Typography variant="h5" gutterBottom style={{ marginTop: "2rem" }}>Haftung für Links</Typography>
            <p>
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
                Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige
                Links umgehend entfernen.
            </p>

            <Typography variant="h5" gutterBottom style={{ marginTop: "2rem" }}>Urheberrecht</Typography>
            <p>
                Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem österreichischen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art
                der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den
                privaten, nicht kommerziellen Gebrauch gestattet.
            </p>

            <Typography variant="h5" gutterBottom style={{ marginTop: "2rem" }}>Datenschutz</Typography>
            <p>
                Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen. Wir verarbeiten Ihre Daten daher ausschließlich auf Grundlage der gesetzlichen Bestimmungen (DSGVO, TKG 2003).
                In diesen Datenschutzinformationen informieren wir Sie über die wichtigsten Aspekte der Datenverarbeitung im Rahmen unserer Website.
            </p>

            <Typography variant="body2" color="textSecondary" style={{ marginTop: "2rem" }}>
                Letzte Aktualisierung: Juni 2025
            </Typography>
        </Container>
    );
}

export default Impressum;
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {useState} from "react";
import {ExportCSV, ImportCSV} from "../../services/CSVHandlers";
import {darkMode, junk, lightMode} from "../../data/JunkIcons";

function JunkNavbar({programs, setPrograms}) {
    const [theme, setTheme] = useState('darkMode');

    function handleTheme() {
        if (theme === 'lightMode') {
            document.documentElement.setAttribute('data-bs-theme', 'dark');
            setTheme('darkMode');
        } else {
            document.documentElement.setAttribute('data-bs-theme', 'light');
            setTheme('lightMode');
        }
    }

    return (
        <Navbar expand="md">
            <Container fluid className="align-items-center justify-content-start gap-2">
                <Navbar.Brand href="https://github.com/janananena/react-junkaddict" target="_blank" >
                    {junk}{' '}
                    Reality Stundenplan</Navbar.Brand>
                <ExportCSV data={programs} fileName={`junkDataExport_${new Date().toISOString().slice(0, 10)}`}/>
                <ImportCSV setJunks={setPrograms}/>
            </Container>
            <Nav.Link className="justify-content-end" onClick={handleTheme}>
                {theme === 'darkMode' && darkMode}
                {theme === 'lightMode' && lightMode}
            </Nav.Link>
        </Navbar>);
}

export default JunkNavbar;
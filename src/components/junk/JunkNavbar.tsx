import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {useState} from "react";
import {ExportCSV, ImportCSV} from "../../services/CSVHandlers";
import {darkMode, junk, lightMode} from "../../data/JunkIcons";

import Form from "react-bootstrap/Form";
import {Junk} from "../../contexts/ProgramContext";
import * as React from "react";

interface JunkNavbarProps {
    programs: Junk[],
    setPrograms: (programs: Junk[]) => void,
    searchString: string,
    setSearchString: (query: string) => void
}

type LightMode = 'darkMode' | 'lightMode';

function JunkNavbar({programs, setPrograms, searchString, setSearchString}: JunkNavbarProps) {
    const [theme, setTheme] = useState<LightMode>('darkMode');

    function handleInputChanges(event: React.ChangeEvent<HTMLInputElement>): void {
        event.preventDefault();
        setSearchString(event.currentTarget.value);
    }

    function handleTheme(): void {
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
                <Navbar.Brand href="https://github.com/janananena/react-junkaddict" target="_blank">
                    {junk}{' '}
                    Reality Stundenplan</Navbar.Brand>
                <ExportCSV data={programs} fileName={`junkDataExport_${new Date().toISOString().slice(0, 10)}`}/>
                <ImportCSV setJunks={setPrograms}/>
            </Container>
            <Container className="justify-content-end gap-2">
                <Form>
                    <Form.Control type="input" placeholder="filter" defaultValue={searchString} onChange={handleInputChanges}/>
                </Form>
                <Nav.Link onClick={handleTheme}>
                    {theme === 'darkMode' && darkMode}
                    {theme === 'lightMode' && lightMode}
                </Nav.Link>
            </Container>
        </Navbar>);
}

export default JunkNavbar;
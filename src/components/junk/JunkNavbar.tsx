import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {useState} from "react";
import {ExportCSV, ImportCSV} from "../../services/CSVHandlers";
import {addIcon, darkMode, junk, lightMode} from "../../data/JunkIcons";

import Form from "react-bootstrap/Form";
import {Junk} from "../../contexts/ProgramContext";
import * as React from "react";
import Button from "react-bootstrap/Button";
import AddJunkCardForm from "./cards/forms/AddJunkCardForm.tsx";

interface JunkNavbarProps {
    programs: Junk[],
    setPrograms: (programs: Junk[]) => void,
    searchString: string,
    setSearchString: (query: string) => void,
    addNewProgram: (junk: Junk) => void
}

type LightMode = 'darkMode' | 'lightMode';

function JunkNavbar({programs, setPrograms, searchString, setSearchString, addNewProgram}: JunkNavbarProps) {
    const [theme, setTheme] = useState<LightMode>('darkMode');
    const [addProgram, setAddProgram] = useState<boolean>(false);
    const toggleAddForm = () => setAddProgram(!addProgram);

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
                {/* @ts-expect-error name is needed */}
                <Navbar.Brand key="brand" name="brand" href="https://github.com/janananena/react-junkaddict" target="_blank">
                    {junk}{' '}Reality Stundenplan
                </Navbar.Brand>
                <Button type="button" variant="secondary" onClick={toggleAddForm}>
                    {addIcon}{' '}Add new Show
                </Button>
                <AddJunkCardForm showAddForm={addProgram} addNewProgram={addNewProgram} toggleAddForm={toggleAddForm}/>
                <ExportCSV data={programs} fileName={`junkDataExport_${new Date().toISOString().slice(0, 10)}`}/>
                <ImportCSV setJunks={setPrograms}/>
            </Container>
            <Container className="justify-content-end gap-2">
                <Button type="button" variant="secondary" onClick={() => searchString === 'tv'? setSearchString('') : setSearchString('tv')}>
                    Videos
                </Button>
                <Button type="button" variant="secondary" onClick={() => searchString === 'podcast'? setSearchString('') : setSearchString('podcast')}>
                    Podcasts
                </Button>
                <Form>
                    <Form.Control type="input" placeholder="filter" key="searchFilter" name="searchFilter" defaultValue={searchString} onChange={handleInputChanges}/>
                </Form>
                {/* @ts-expect-error name is needed */}
                <Nav.Link onClick={handleTheme} key="modeswitch" name={`modeswitch-${theme}`}>
                    {theme === 'darkMode' && darkMode}
                    {theme === 'lightMode' && lightMode}
                </Nav.Link>
            </Container>
        </Navbar>);
}

export default JunkNavbar;
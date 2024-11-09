import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import * as React from "react";
import {useState} from "react";
import {addIcon, darkMode, junk, lightMode} from "../../data/JunkIcons";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import AddToWatchCardForm from "./forms/AddToWatchCardForm.tsx";
import {ToWatch} from "../../contexts/WatchListContext.tsx";
import {NavDropdown} from "react-bootstrap";
import {ExportWatchesCSV, ImportWatchesCSV} from "../../services/CSVHandlers.tsx";

interface WatchListNavbarProps {
    watches: ToWatch[],
    setWatches: (ws: ToWatch[]) => void,
    searchString: string,
    setSearchString: (query: string) => void,
    setView: (view: 'junk' | 'watches') => void,
    addNewWatch: (watch: ToWatch) => void
}

type LightMode = 'darkMode' | 'lightMode';

function WatchListNavbar({watches, setWatches, searchString, setSearchString, setView, addNewWatch}: WatchListNavbarProps) {
    const [theme, setTheme] = useState<LightMode>('darkMode');
    const [addLink, setAddLink] = useState<boolean>(false);
    const toggleAddForm = () => setAddLink(!addLink);

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
                <Navbar.Brand key="brand" name="brand" style={{width: '14rem'}} href="https://github.com/janananena/react-junkaddict" target="_blank">
                    {junk}{' '}Watch List
                </Navbar.Brand>
                <NavDropdown title="WatchList" key="watchlist-nav-dropdown" style={{width: '7rem'}}>
                    <NavDropdown.Item onClick={() => setView('junk')}>to Junk Table</NavDropdown.Item>
                </NavDropdown>
                <Button type="button" variant="secondary" onClick={toggleAddForm} style={{display: "inline-flex", alignItems: "center", whiteSpace: "pre-wrap"}}>
                    {addIcon} Add new Link
                </Button>
                <AddToWatchCardForm key="addWatchFormNav" prefillCollection={''} showAddForm={addLink} toggleAddForm={toggleAddForm} addNewWatch={addNewWatch}/>
                <ExportWatchesCSV data={watches} fileName={`watchListDataExport_${new Date().toISOString().slice(0, 10)}`}/>
                <ImportWatchesCSV setWatches={setWatches}/>
            </Container>
            <Container className="justify-content-end gap-2">
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

export default WatchListNavbar;
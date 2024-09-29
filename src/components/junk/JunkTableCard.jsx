import {useState} from "react";
import JunkDay from "./JunkDay";
import AddJunkCardForm from "./cards/forms/AddJunkCardForm";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function JunkTableCard({programs, setPrograms}) {
    const [addProgram, setAddProgram] = useState(false);
    const toggleAddForm = () => setAddProgram(!addProgram);

    const dayGroups = {"mo": [], "di": [], "mi": [], "do": [], "fr": [], "sa": [], "so": []};
    const onAirPrograms = programs.filter((p) => p.currentSeason);
    const offAirPrograms = programs.filter((p) => !p.currentSeason);
    onAirPrograms.map((p) => dayGroups[p.day].push(p));

    const displayTableHeaders = (Object.keys(dayGroups))
        .map((k) => <td key={k}>{k}</td>);
    displayTableHeaders.push(<td key="currentlyOff">Off Air</td>);

    const displayTableBodyJunkDays = (Object.entries(dayGroups))
        .map(([k, v]) => <td key={k + 'Col'}>
            <JunkDay programs={v} onAir={true} setProgram={changeProgram}/>
        </td>);
    displayTableBodyJunkDays.push(<td key="offAirCol">
        <JunkDay programs={offAirPrograms} onAir={false} setProgram={changeProgram}/>
    </td>);

    function changeProgram(program) {
        setPrograms(programs.map((p) => p.id === program.id ? program : p));
    }

    function addNewProgram(program) {
        setPrograms([...programs, program]);
    }

    return (
        <Card>
            <Card.Body>
                <Table striped="columns" borderless>
                    <thead>
                    <tr>
                        {displayTableHeaders}
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        {displayTableBodyJunkDays}
                    </tr>
                    </tbody>
                </Table>
                <Button type="button" variant="secondary" onClick={toggleAddForm}>
                        <svg className="d-inline-block align-content-top bi bi-plus-square" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                        </svg>
                        {' '}
                        Add
                </Button>
                <AddJunkCardForm showAddForm={addProgram} addNewProgram={addNewProgram} toggleAddProgram={toggleAddForm}/>
            </Card.Body>
        </Card>
    );
}

export default JunkTableCard;
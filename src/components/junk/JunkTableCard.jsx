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
                <Button type="button" variant="secondary" onClick={toggleAddForm}>ADD</Button>
                <AddJunkCardForm showAddForm={addProgram} addNewProgram={addNewProgram} toggleAddProgram={toggleAddForm}/>
            </Card.Body>
        </Card>
    );
}

export default JunkTableCard;
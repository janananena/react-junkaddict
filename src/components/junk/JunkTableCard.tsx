import {useState} from "react";
import JunkDay from "./JunkDay";
import AddJunkCardForm from "./cards/forms/AddJunkCardForm";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import {addIcon} from "../../data/JunkIcons";
import {Junk} from "../../contexts/ProgramContext";

interface JunkTableCardProps {
    displayPrograms: Junk[],
    addNewProgram: (junk: Junk) => void,
    changeProgram: (junk: Junk) => void,
    removeProgram: (junk: Junk) => void
}

function JunkTableCard({displayPrograms, addNewProgram, changeProgram, removeProgram}: JunkTableCardProps) {
    const [addProgram, setAddProgram] = useState<boolean>(false);
    const toggleAddForm = () => setAddProgram(!addProgram);

    interface DayData {
        [key: string]: Junk[];
    }

    const dayGroups: DayData = {"mo": [], "di": [], "mi": [], "do": [], "fr": [], "sa": [], "so": []};
    const onAirPrograms = displayPrograms.filter((p) => p.currentSeason);
    const offAirPrograms = displayPrograms.filter((p) => !p.currentSeason);
    onAirPrograms.map((p) => dayGroups[p.day].push(p));

    const displayTableHeaders = (Object.keys(dayGroups))
        .map((k) =>
            <td key={k}>
                <h5>{k.toUpperCase()}</h5>
            </td>
        );
    displayTableHeaders.push(
        <td key="currentlyOff">
            <h5>Off Air</h5>
        </td>
    );

    const displayTableBodyJunkDays = (Object.entries(dayGroups))
        .map(([k, v]) =>
            <td key={k + 'Col'}>
                <JunkDay programs={v} setProgram={changeProgram} removeProgram={removeProgram}/>
            </td>
        );
    displayTableBodyJunkDays.push(
        <td key="offAirCol">
            <JunkDay programs={offAirPrograms} setProgram={changeProgram} removeProgram={removeProgram}/>
        </td>
    );

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
            </Card.Body>
            <Card.Body>
                <Button type="button" variant="outline-secondary" onClick={toggleAddForm}>
                    {addIcon}
                    {' '}
                    Add
                </Button>
                <AddJunkCardForm showAddForm={addProgram} addNewProgram={addNewProgram} toggleAddForm={toggleAddForm}/>{' '}
            </Card.Body>
        </Card>
    );
}

export default JunkTableCard;
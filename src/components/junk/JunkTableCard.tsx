import JunkDay from "./JunkDay";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import {Junk} from "../../contexts/ProgramContext";
import OfflineDay from "./OfflineDay.tsx";

interface JunkTableCardProps {
    displayPrograms: Junk[],
    changeProgram: (junk: Junk) => void,
    removeProgram: (junk: Junk) => void
}

function JunkTableCard({displayPrograms, changeProgram, removeProgram}: JunkTableCardProps) {

    interface DayData {
        [key: string]: Junk[];
    }

    const dayGroups: DayData = {"mo": [], "di": [], "mi": [], "do": [], "fr": [], "sa": [], "so": []};
    const onAirPrograms = displayPrograms.filter((p) => p.currentSeason);
    const offAirPrograms = displayPrograms.filter((p) => !p.currentSeason);
    onAirPrograms.map((p) => {
        p.day.map((day)=> dayGroups[day].push(p))
    });

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
            <OfflineDay programs={offAirPrograms} setProgram={changeProgram} removeProgram={removeProgram}/>
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
        </Card>
    );
}

export default JunkTableCard;
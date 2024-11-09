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
    const today = new Date().toLocaleString('de-de', {  weekday: 'short' }).toLowerCase();

    const onAirPrograms = displayPrograms.filter((p) => p.currentSeason);
    const offAirPrograms = displayPrograms.filter((p) => !p.currentSeason);
    onAirPrograms.map((p) => {
        p.day.map((day)=> dayGroups[day].push(p))
    });

    const displayTableHeaders = (Object.keys(dayGroups))
        .map((k) =>
            <td key={k} className={(k === today)? 'table-active': ''} style={{borderRight: "1px solid var(--bs-card-border-color)"}}>
                <h5 style={(k === today)?{textDecoration:'underline'}: {}}>{k.toUpperCase()}</h5>
            </td>
        );
    displayTableHeaders.push(
        <td key="currentlyOff">
            <h5>Off Air</h5>
        </td>
    );

    const displayTableBodyJunkDays = (Object.entries(dayGroups))
        .map(([k, v]) =>
            <td key={k + 'Col'} className={(k === today)? 'table-active': ''} style={{borderRight: '1px solid var(--bs-card-border-color)'}}>
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
                <Table borderless>
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
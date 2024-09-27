import {useState} from "react";
import JunkDay from "./JunkDay";
import AddJunkCardForm from "./cards/forms/AddJunkCardForm";

function JunkTable({programs, setPrograms}) {
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

    const addProgramButton = <button onClick={toggleAddForm}>ADD</button>;

    function changeProgram(program) {
        setPrograms(programs.map((p) => p.id === program.id ? program : p));
    }

    function addNewProgram(program) {
        setPrograms([...programs, program]);
    }

    return (<table>
        <caption>Reality Stundenplan</caption>
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
        <tfoot>
        <tr>
            <td colSpan="7">{addProgramButton}</td>
        </tr>
        {addProgram && <tr>
            <td colSpan="7">
                {<AddJunkCardForm addNewProgram={addNewProgram} toggleAddProgram={toggleAddForm}/>}
            </td>
        </tr>}
        </tfoot>
    </table>);
}

export default JunkTable;
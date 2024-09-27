import {changeProgram} from "../../../services/DevDataApiHandlers";
import {capitalizeFirstLetter} from "../../../utils/StringUtils";

function OnAirJunkCard({displayName, displayStation, toggleEditProgram, program, setProgram}) {

    async function handleSetOffAir(event) {
        event.preventDefault();
        const newProgram = {...program, currentSeason: false};
        const prog = await changeProgram(newProgram);
        setProgram(prog);
    }

    const displayTime = <div>{capitalizeFirstLetter(program.day)} {program.time}</div>;
    const displayCategory = <div>{capitalizeFirstLetter(program.category)}</div>;

    const editProgramButton = <button onClick={toggleEditProgram}>EDIT</button>;
    const setOffAirButton = <button onClick={handleSetOffAir}>Staffel Ende</button>;

    return (
        <table>
            <tbody>
            <tr>
                <td>{displayName}</td>
                <td>{displayStation}</td>
            </tr>
            <tr>
                <td>{displayTime}</td>
                <td>{displayCategory}</td>
            </tr>
            </tbody>
            <tfoot>
            <tr>
                <td>{editProgramButton}</td>
                <td>{setOffAirButton}</td>
            </tr>
            </tfoot>
        </table>
    );
}

export default OnAirJunkCard;
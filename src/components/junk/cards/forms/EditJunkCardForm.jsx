import _ from "lodash";
import {changeProgram} from "../../../../services/DevDataApiHandlers";
import {useContext} from "react";
import {ProgramContext} from "../../../../contexts/ProgramContext";

function EditJunkCardForm({toggleEditProgram}) {
    const [program, setProgram] = useContext(ProgramContext);

    async function handleEditProgram(event) {
        event.preventDefault();
        const input = event.currentTarget;
        const newProg = {...program};
        if (input.nick.value !== "") {
            newProg.nick = input.nick.value;
        }
        newProg.title = input.title.value;
        newProg.station = input.station.value;
        newProg.day = input.day.value;
        newProg.time = input.time.value;
        newProg.category = input.category.value;
        if (!_.isEqual(newProg, program)) {
            const prog = await changeProgram(newProg);
            setProgram(prog);
        }
        toggleEditProgram();
    }

    return (<form onSubmit={handleEditProgram}>
        <table>
            <tbody>
            <tr>
                <td>
                    <fieldset>
                        <input id="nick" type="text" name="nick" placeholder="Nick" defaultValue={program.nick}/>
                        <input id="title" type="text" name="title" defaultValue={program.title} required/>
                    </fieldset>
                </td>
                <td>
                    <select id="station" name="station" defaultValue={program.station} required>
                        <option key="rtl" value="rtl">RTL</option>
                        <option key="joyn" value="joyn">Joyn</option>
                        <option key="zdf" value="zdf">ZDF</option>
                        <option key="amazon" value="amazon">Prime</option>
                        <option key="ard" value="ard">ARD</option>
                        <option key="spotify" value="spotify">Spotify</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td>
                    <select id="day" name="day" defaultValue={program.day} required>
                        <option key="mo" value="mo">Mo</option>
                        <option key="di" value="di">Di</option>
                        <option key="mi" value="mi">Mi</option>
                        <option key="do" value="do">Do</option>
                        <option key="fr" value="fr">Fr</option>
                        <option key="sa" value="sa">Sa</option>
                        <option key="so" value="so">So</option>
                    </select>
                    <input id="time" type="time" name="time" step="any" defaultValue={program.time} required/>
                </td>
                <td>
                    <select id="category" name="category" defaultValue={program.category} required>
                        <option value="tv">Video</option>
                        <option value="podcast">Podcast</option>
                    </select>
                </td>
            </tr>
            </tbody>
            <tfoot>
            <tr>
                <td>
                    <button id="cancelChange" onClick={toggleEditProgram}>cancel</button>
                </td>
                <td>
                    <button id="submitChange" type="submit">save</button>
                </td>
            </tr>
            </tfoot>
        </table>
    </form>);
}

export default EditJunkCardForm;
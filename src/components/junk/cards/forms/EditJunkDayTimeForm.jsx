import {changeProgram} from "../../../../services/DevDataApiHandlers";
import {useContext} from "react";
import {ProgramContext} from "../../../../contexts/ProgramContext";

function EditJunkDayTimeForm({setOnAir, handleCancel}) {
    const [program, setProgram] = useContext(ProgramContext);

    async function handleSubmit(event) {
        event.preventDefault();
        const newProgram = {
            ...program,
            day: event.currentTarget.day.value,
            time: event.currentTarget.time.value,
            currentSeason: setOnAir
        };
        const prog = await changeProgram(newProgram);
        setProgram(prog);
        handleCancel();
    }

    return (
        <form onSubmit={handleSubmit}>
            <fieldset>
                <label htmlFor="day"> Tag
                    <select id="day" name="day" defaultValue={program.day} required>
                        <option key="mo" value="mo">Mo</option>
                        <option key="di" value="di">Di</option>
                        <option key="mi" value="mi">Mi</option>
                        <option key="do" value="do">Do</option>
                        <option key="fr" value="fr">Fr</option>
                        <option key="sa" value="sa">Sa</option>
                        <option key="so" value="so">So</option>
                    </select>
                </label>
                <label htmlFor="time"> Uhrzeit (hh:mm)
                    <input id="time" type="time" name="time" step="any" defaultValue={program.time} required/>
                </label>
                <button id="cancelChange" onClick={handleCancel}>cancel</button>
                <button id="submitChange" type="submit">save</button>
            </fieldset>
        </form>);
}

export default EditJunkDayTimeForm;
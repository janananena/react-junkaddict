import {addProgram} from "../../../../services/DevDataApiHandlers";

function AddJunkCardForm({addNewProgram, toggleAddProgram}) {

    async function handleAdd(event) {
        event.preventDefault();
        const program = await addProgram(event.currentTarget);
        addNewProgram(program);
        toggleAddProgram();
    }

    return (<form onSubmit={handleAdd}>
        <fieldset>
            <label htmlFor="title"> Offizieller Name
                <input id="title" type="text" name="title" required/>
            </label>
            <label htmlFor="nick"> Nick
                <input id="nick" type="text" name="nick"/>
            </label>
            <label htmlFor="station"> Sender
                <select id="station" name="station" required>
                    <option key="rtl" value="rtl">RTL</option>
                    <option key="joyn" value="joyn">Joyn</option>
                    <option key="zdf" value="zdf">ZDF</option>
                    <option key="amazon" value="amazon">Prime</option>
                    <option key="ard" value="ard">ARD</option>
                    <option key="spotify" value="spotify">Spotify</option>
                </select>
            </label>
            <label htmlFor="link"> Link
                <input id="link" type="url" name="link" required/>
            </label>
            <label htmlFor="day"> Tag
                <select id="day" name="day" required>
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
                <input id="time" type="time" name="time" step="any" required/>
            </label>
            <label htmlFor="category"> Kategorie
                <select id="category" name="category" required>
                    <option value="tv">Video</option>
                    <option value="podcast">Podcast</option>
                </select>
            </label>
            <input id="currentSeason" type="hidden" name="currentSeason" value="true"/>
            <button id="addbutton" type="submit">add</button>
        </fieldset>
    </form>);
}

export default AddJunkCardForm;
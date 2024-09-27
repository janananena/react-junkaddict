import './App.css';
import {useEffect, useState} from "react";
import {addProgram, changeProgram, getPrograms} from "./apihandler/DbApiHandlers";
import _ from "lodash";

function JunkCard({program, onAir, setProgram}) {
    const [editOnAir, setEditOnAir] = useState(false);
    const [editProgram, setEditProgram] = useState(false);

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const name = program.nick ? <div>
        <h1>
            {program.nick}
        </h1>
        <h2>
            {program.title}
        </h2></div> : <h1>
        {program.title}
    </h1>;
    const station = <a href={program.link}>
        <img src={require(`./logos/${program.station.toLowerCase()}.jpg`)} alt={program.station} width="50"/>
    </a>;
    const time = <div>{capitalizeFirstLetter(program.day)} {program.time}</div>;
    const category = <div>{capitalizeFirstLetter(program.category)}</div>;

    async function handleOffAir(event) {
        event.preventDefault();
        const prog = await changeProgram({...program, currentSeason: false});
        setProgram(prog);
    }

    async function handleOnAir(event) {
        event.preventDefault();
        const prog = await changeProgram({
            ...program,
            day: event.currentTarget.day.value,
            time: event.currentTarget.time.value,
            currentSeason: true
        });
        setProgram(prog);
        toggleEditOnAir();
    }

    async function handleEditProgram(event) {
        event.preventDefault();
        const input = event.currentTarget;
        const newProg = {...program};
        if(input.nick.value !== ""){
            newProg.nick = input.nick.value;
        }
        newProg.title = input.title.value;
        newProg.station = input.station.value;
        newProg.day = input.day.value;
        newProg.time = input.time.value;
        newProg.category = input.category.value;
        console.log(`isEqual is ${_.isEqual(newProg, program)}`);
        if (!_.isEqual(newProg, program)) {
            const prog = await changeProgram(newProg);
            setProgram(prog);
        }
        toggleEditProgram();
    }

    function toggleEditOnAir() {

        setEditOnAir(!editOnAir);
    }

    function toggleEditProgram() {

        setEditProgram(!editProgram);
    }

    const onAirButton = <button onClick={toggleEditOnAir}>Neue Staffel</button>;
    const offAirButton = <button onClick={handleOffAir}>Staffel Ende</button>;
    const editProgramButton = <button onClick={toggleEditProgram}>EDIT</button>;

    const changeDayTimeForm = <form onSubmit={handleOnAir}>
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
            <button id="cancelChange" onClick={toggleEditOnAir}>cancel</button>
            <button id="submitChange" type="submit">save</button>
        </fieldset>
    </form>;

    const editJunkCard = <form onSubmit={handleEditProgram}>
        <table>
            <tbody>
            <tr>
                <td>
                    <fieldset>
                        <input id="nick" type="text" name="nick" placeholder="Nick" defaultValue={program.nick}/>
                        <input id="title" type="text" name="title" defaultValue={program.title} required/>
                    </fieldset>
                </td>
                <td><input id="station" type="text" name="station" defaultValue={program.station} required/></td>
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
    </form>;

    const displayJunkTable = <table>
        <tbody>
        <tr>
            <td>{name}</td>
            <td>{station}</td>
        </tr>
        {onAir && <tr>
            <td>{time}</td>
            <td>{category}</td>
        </tr>}
        </tbody>
        <tfoot>
        <tr>
            {onAir && <>
                <td>{editProgramButton}</td>
                <td>{offAirButton}</td>
            </>}
            {!onAir && !editOnAir && <td colSpan="2">{onAirButton}</td>}
            {!onAir && editOnAir && <td colSpan="2">{changeDayTimeForm}</td>}
        </tr>
        </tfoot>
    </table>;

    return (<>
        {!editProgram && displayJunkTable}
        {editProgram && editJunkCard}
    </>);
}

function sortTimes(program1, program2) {
    const t1 = program1.time.split(':').map((t) => parseInt(t, 10));
    const t2 = program2.time.split(':').map((t) => parseInt(t, 10));
    return t1[0] === t2[0] ? t1[1] - t2[1] : t1[0] - t2[0];
}

function JunkDay({programs, onAir, setProgram}) {
    const cards = programs.sort(sortTimes).map((p) => <li key={p.title}><JunkCard program={p} onAir={onAir}
                                                                                  setProgram={setProgram}/></li>);
    return (<ul>
        {cards}
    </ul>);
}

function JunkTable({programs, setPrograms}) {
    const [add, setAdd] = useState(false);
    const daygroups = {"mo": [], "di": [], "mi": [], "do": [], "fr": [], "sa": [], "so": []};
    const onAirPrograms = programs.filter((p) => p.currentSeason);
    const offAirPrograms = programs.filter((p) => !p.currentSeason);
    onAirPrograms.map((p) => daygroups[p.day].push(p));

    function changeProgram(program) {
        setPrograms(programs.map((p) => p.id == program.id ? program : p));
    }

    const headers = (Object.keys(daygroups)).map((k) => <td key={k}>{k}</td>);
    headers.push(<td key="currentlyOff">Off Air</td>);
    const body = (Object.entries(daygroups)).map(([k, v]) => <td key={k + 'Col'}><JunkDay programs={v} onAir={true}
                                                                                          setProgram={changeProgram}/>
    </td>);
    body.push(<td key="offAirCol"><JunkDay programs={offAirPrograms} onAir={false} setProgram={changeProgram}/></td>);

    const toggleAddForm = () => setAdd(!add);

    async function handleAdd(event) {
        event.preventDefault();
        const program = await addProgram(event.currentTarget);
        setPrograms([...programs, program]);
        toggleAddForm();
    }

    const addForm = <form onSubmit={handleAdd}>
        <fieldset>
            <label htmlFor="title"> Offizieller Name
                <input id="title" type="text" name="title" required/>
            </label>
            <label htmlFor="nick"> Nick
                <input id="nick" type="text" name="nick"/>
            </label>
            <label htmlFor="station"> Sender
                <input id="station" type="text" name="station" required/>
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
    </form>;
    return (<table>
        <caption>Reality Stundenplan</caption>
        <thead>
        <tr>{headers}</tr>
        </thead>
        <tbody>
        <tr>
            {body}
        </tr>
        </tbody>
        <tfoot>
        <tr>
            <td colSpan="7">
                <button onClick={toggleAddForm}>ADD</button>
            </td>
        </tr>
        {add && <tr>
            <td colSpan="7">
                {addForm}
            </td>
        </tr>}
        </tfoot>
    </table>);
}

function App() {
    const [programs, setPrograms] = useState([]);

    async function getProgramList() {
        const res = await getPrograms();
        setPrograms(res);
    }

    useEffect(() => {
        getProgramList();
    }, [])

    return (<JunkTable programs={programs} setPrograms={setPrograms}/>);
}

export default App;

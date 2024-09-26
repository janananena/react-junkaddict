import './App.css';
import {useEffect, useState} from "react";
import {addProgramm, getPrograms} from "./apihandler/DbApiHandlers";

function JunkCard({program}) {

    const name = program.nick ?
        <div>
            <h1>
                {program.nick}
            </h1>
            <h2>
                {program.title}
            </h2></div>
        : <h1>
            {program.title}
        </h1>;
    const station = <a href={program.link}><img src={require(`./logos/${program.station.toLowerCase()}.jpg`)}
                                                alt={program.station} width="50"/></a>;
    const time = <div>{program.day.capitalize} {program.time}</div>;
    const category = <div>{program.category.capitalize}</div>;

    return (<table>
        <tbody>
        <tr>
            <td>{name}</td>
            <td>{station}</td>
        </tr>
        <tr>
            <td>{time}</td>
            <td>{category}</td>
        </tr>
        </tbody>
    </table>);
}

function sortTimes(program1, program2) {
    const t1 = program1.time.split(':').map((t) => parseInt(t, 10));
    const t2 = program2.time.split(':').map((t) => parseInt(t, 10));
    return t1[0] === t2[0] ? t1[1] - t2[1] : t1[0] - t2[0];
}

function JunkDay({programs}) {
    const cards = programs.sort(sortTimes).map((p) => <li key={p.title}><JunkCard program={p}/></li>);
    return (<ul>
        {cards}
    </ul>);
}

function JunkTable({programs, setPrograms}) {
    const [add, setAdd] = useState(false);
    const daygroups = {"mo": [], "di": [], "mi": [], "do": [], "fr": [], "sa": [], "so": []};
    programs.map((p) => daygroups[p.day].push(p));

    const headers = (Object.keys(daygroups)).map((k) => <td key={k}>{k}</td>);
    const body = (Object.entries(daygroups)).map(([k, v]) => <td key={k + v.title}><JunkDay programs={v}/></td>)

    const toggleAddForm = () => setAdd(!add);
    async function handleAdd(event){
        event.preventDefault();
        const program = await addProgramm(event.currentTarget);
        setPrograms([...programs, program]);
        toggleAddForm();
    }
    const addForm = <form onSubmit={handleAdd}>
        <fieldset>
            <label htmlFor="title"> Offizieller Name
                <input id="title" type="text" name="title" required/>
            </label>
            <label form="nick"> Nick
                <input id="nick" type="text" name="nick"/>
            </label>
            <label form="station"> Sender
                <input id="station" type="text" name="station" required/>
            </label>
            <label form="link"> Link
                <input id="link" type="url" name="link" required/>
            </label>
            <label form="day"> Tag
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
            <label form="time"> Uhrzeit (hh:mm)
                <input id="time" type="time" name="time" step="any" required/>
            </label>
            <label form="category"> Kategorie
                <select id="category" name="category" required>
                    <option value="tv">Video</option>
                    <option value="podcast">Podcast</option>
                </select>
            </label>
            <label form="addbutton">
                <button id="addbutton" type="submit">add</button>
            </label>
        </fieldset>
    </form>;
    return (
        <table>
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
                <td>
                    <button onClick={toggleAddForm}>ADD</button>
                </td>
            </tr>
            {add && <tr>
                <td>
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

    return (
        <JunkTable programs={programs} setPrograms={setPrograms}/>);
}

export default App;

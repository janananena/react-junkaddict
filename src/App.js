import './App.css';
import {useEffect, useState} from "react";
import {getPrograms} from "./apihandler/DbApiHandlers";

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
    const station = <div>{program.station}</div>;
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

function sortTimes(time1, time2) {
    const t1 = time1.split(':').map((t) => parseInt(t, 10));
    const t2 = time2.split(':').map((t) => parseInt(t, 10));
    return t1[0] === t2[0] ? t1[1] - t2[1] : t1[0] - t2[0];
}

function JunkDay({programs}) {
    const cards = programs.sort(sortTimes).map((p) => <li key={p.title}><JunkCard program={p}/></li>);
    return (<ul>
        {cards}
    </ul>);
}

function JunkTable({programs}) {
    const daygroups = {"mo": [], "di": [], "mi": [], "do": [], "fr": [], "sa": [], "so": []};
    programs.map((p) => daygroups[p.day].push(p));

    const headers = (Object.keys(daygroups)).map((k) => <td key={k}>{k}</td>);
    const body = (Object.entries(daygroups)).map(([k, v]) => <td key={k + v.title}><JunkDay programs={v}/></td>)
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
        <JunkTable programs={programs}/>);
}

export default App;

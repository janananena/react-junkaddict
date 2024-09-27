import JunkCard from "./cards/JunkCard";
import {ProgramContext} from "../../contexts/ProgramContext";

function sortTimes(program1, program2) {
    const t1 = program1.time.split(':').map((t) => parseInt(t, 10));
    const t2 = program2.time.split(':').map((t) => parseInt(t, 10));
    return t1[0] === t2[0] ? t1[1] - t2[1] : t1[0] - t2[0];
}

function JunkDay({programs, setProgram}) {
    const cards = programs.sort(sortTimes)
        .map((p) => <li key={p.title}>
            <ProgramContext.Provider value={[p, setProgram]}>
                <JunkCard/>
            </ProgramContext.Provider>
        </li>);
    return (<ul>
        {cards}
    </ul>);
}

export default JunkDay;
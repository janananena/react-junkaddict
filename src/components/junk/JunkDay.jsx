import JunkCard from "./cards/JunkCard";
import {ProgramContext} from "../../contexts/ProgramContext";

function sortTimes(program1, program2) {
    const t1 = program1.time.split(':').map((t) => parseInt(t, 10));
    const t2 = program2.time.split(':').map((t) => parseInt(t, 10));
    return t1[0] === t2[0] ? t1[1] - t2[1] : t1[0] - t2[0];
}

function JunkDay({programs, setProgram, removeProgram}) {
    return (
        programs.sort(sortTimes)
            .map((p) =>
                <ProgramContext.Provider key={p.id} value={[p, setProgram, removeProgram]}>
                    <JunkCard key={p.id}/>
                </ProgramContext.Provider>
            )
    );
}

export default JunkDay;
import JunkCard from "./cards/JunkCard";
import {Junk, JunkContext, JunkContextProvider} from "../../contexts/ProgramContext";

interface JunkDayProps {
    programs: Junk[],
    setProgram: (junk: Junk) => void,
    removeProgram: (junk: Junk) => void
}

function sortTimes(program1: Junk, program2: Junk): number {
    const t1 = program1.time.split(':').map((t) => parseInt(t, 10));
    const t2 = program2.time.split(':').map((t) => parseInt(t, 10));
    return t1[0] === t2[0] ? t1[1] - t2[1] : t1[0] - t2[0];
}

function JunkDay({programs, setProgram, removeProgram}: JunkDayProps) {

    return (
        <>
            {programs.sort(sortTimes)
                .map((p) => {
                        const context: JunkContext = {
                            junk: p,
                            setJunk: setProgram,
                            removeJunk: removeProgram
                        }
                        return (
                            <JunkContextProvider key={p.id} value={context}>
                                <JunkCard key={p.id}/>
                            </JunkContextProvider>);
                    }
                )
            }
        </>
    );
}

export default JunkDay;
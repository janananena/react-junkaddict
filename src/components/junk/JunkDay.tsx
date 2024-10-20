import JunkCard from "./cards/JunkCard";
import {Junk, JunkContext, JunkContextProvider} from "../../contexts/ProgramContext";

interface JunkDayProps {
    programs: Junk[],
    setProgram: (junk: Junk) => void,
    removeProgram: (junk: Junk) => void
}

function sortTime(program1:Junk,program2:Junk, time1: number, time2: number){
    const same = time1 === time2;
    return same? program1.junkname.localeCompare(program2.junkname) : time1-time2;
}

function sortTimes(program1: Junk, program2: Junk): number {
    const t1 = program1.time.split(':').map((t) => parseInt(t, 10));
    const t2 = program2.time.split(':').map((t) => parseInt(t, 10));
    const sameHour = t1[0] === t2[0];
    return sameHour ? sortTime(program1, program2, t1[1], t2[1]) : sortTime(program1, program2, t1[0], t2[0]);
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
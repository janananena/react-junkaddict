import JunkCard from "./cards/JunkCard";
import {Junk, JunkContext, JunkContextProvider} from "../../contexts/ProgramContext";

interface OfflineDayProps {
    programs: Junk[],
    setProgram: (junk: Junk) => void,
    removeProgram: (junk: Junk) => void
}

function hasAlwaysShow(program: Junk): boolean {
    return program.notes.filter((note) => note.alwaysShow).length > 0
        ? true
        : program.links.filter((link) => link.alwaysShow).length > 0;
}

function sortHasAlwaysShow(program1: Junk, program2: Junk): number {
    return hasAlwaysShow(program1)
        ? hasAlwaysShow(program2)
            ? 0
            : -1
        : hasAlwaysShow(program2)
            ? 1
            : 0;
}

function OfflineDay({programs, setProgram, removeProgram}: OfflineDayProps) {

    return (
        <>
            {programs.sort(sortHasAlwaysShow)
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

export default OfflineDay;
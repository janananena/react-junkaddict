import {useEffect, useState} from "react";
import {getPrograms} from "../services/DevDataApiHandlers";
import JunkTableCard from "../components/junk/JunkTableCard";
import JunkNavbar from "../components/junk/JunkNavbar";
import {Junk} from "../contexts/ProgramContext";

function JunkTablePage() {
    const [programs, setPrograms] = useState<Junk[]>([]);
    const [searchString, setSearchString] = useState<string>('');

    async function getProgramList(): Promise<void> {
        const res = await getPrograms();
        setPrograms(res);
    }

    useEffect(() => {
        getProgramList().then();
    }, [])

    function changeProgram(program: Junk): void {
        setPrograms(programs.map((p) => p.id === program.id ? program : p));
    }

    function addNewProgram(program: Junk): void {
        setPrograms([...programs, program]);
    }

    function removeProgram(program: Junk): void {
        setPrograms(programs.filter((p) => p.id !== program.id));
    }

    const displayPrograms = programs.filter((p) => {
        return p.junkname?.toLowerCase().includes(searchString.toLowerCase())
            || p.nick?.toLowerCase().includes(searchString.toLowerCase())
            || p.station?.toLowerCase().includes(searchString.toLowerCase());
    });

    return (
        <>
            <JunkNavbar programs={programs} setPrograms={setPrograms} searchString={searchString} setSearchString={setSearchString}/>
            <JunkTableCard displayPrograms={displayPrograms} addNewProgram={addNewProgram} changeProgram={changeProgram} removeProgram={removeProgram}/>
        </>
    );
}

export default JunkTablePage;
import {useEffect, useState} from "react";
import {getPrograms} from "../services/DevDataApiHandlers";
import JunkTableCard from "../components/junk/JunkTableCard";
import JunkNavbar from "../components/junk/JunkNavbar";

function JunkTablePage() {
    const [programs, setPrograms] = useState([]);
    const [searchString, setSearchString] = useState('');

    async function getProgramList() {
        const res = await getPrograms();
        setPrograms(res);
    }

    useEffect(() => {
        getProgramList().then();
    }, [])

    function changeProgram(program) {
        setPrograms(programs.map((p) => p.id === program.id ? program : p));
    }

    function addNewProgram(program) {
        setPrograms([...programs, program]);
    }

    function removeProgram(program) {
        setPrograms(programs.filter((p) => p.id !== program.id));
    }

    const displayPrograms = programs.filter((p) => {
        return p.title?.toLowerCase().includes(searchString.toLowerCase())
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
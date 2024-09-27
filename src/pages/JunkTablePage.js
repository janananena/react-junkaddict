import {useEffect, useState} from "react";
import {getPrograms} from "../services/DevDataApiHandlers";
import JunkTable from "../components/junk/JunkTable";

function JunkTablePage() {
    const [programs, setPrograms] = useState([]);

    async function getProgramList() {
        const res = await getPrograms();
        setPrograms(res);
    }

    useEffect(() => {
        getProgramList().then();
    }, [])

    return (
        <JunkTable programs={programs} setPrograms={setPrograms}/>
    );
}

export default JunkTablePage;
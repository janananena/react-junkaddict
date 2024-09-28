import {useEffect, useState} from "react";
import {getPrograms} from "../services/DevDataApiHandlers";
import JunkTableCard from "../components/junk/JunkTableCard";
import Navbar from "react-bootstrap/Navbar";
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
        <>
            <JunkTableCard programs={programs} setPrograms={setPrograms}/>
        </>);
}
export default JunkTablePage;
import {useState} from "react";
import JunkCardDetails from "./JunkCardDetails";
import EditJunkCardForm from "./forms/EditJunkCardForm";

function JunkCard({program, setProgram}) {
    const [editProgram, setEditProgram] = useState(false);

    function toggleEditProgram() {
        setEditProgram(!editProgram);
    }

    return (<>
        {!editProgram && <JunkCardDetails program={program} toggleEditProgram={toggleEditProgram} setProgram={setProgram}/>}
        {editProgram && <EditJunkCardForm program={program} toggleEditProgram={toggleEditProgram} setProgram={setProgram}/>}
    </>);
}

export default JunkCard;
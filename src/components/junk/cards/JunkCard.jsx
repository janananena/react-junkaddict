import {useState} from "react";
import JunkCardDetails from "./JunkCardDetails";
import EditJunkCardForm from "./forms/EditJunkCardForm";

function JunkCard() {
    const [editProgram, setEditProgram] = useState(false);

    function toggleEditProgram() {
        setEditProgram(!editProgram);
    }

    return (<>
        {!editProgram && <JunkCardDetails toggleEditProgram={toggleEditProgram} />}
        {editProgram && <EditJunkCardForm toggleEditProgram={toggleEditProgram} />}
    </>);
}

export default JunkCard;
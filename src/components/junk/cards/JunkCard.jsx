import {useState} from "react";
import JunkCardDetails from "./JunkCardDetails";
import EditJunkCardForm from "./forms/EditJunkCardForm";

function JunkCard() {
    const [editProgram, setEditProgram] = useState(false);

    function toggleEditProgram() {
        setEditProgram(!editProgram);
    }

    return (
        <>
            <JunkCardDetails toggleEditProgram={toggleEditProgram}/>
            <EditJunkCardForm showEditProgram={editProgram} toggleEditProgram={toggleEditProgram}/>
        </>);
}

export default JunkCard;
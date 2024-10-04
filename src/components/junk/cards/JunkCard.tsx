import {useState} from "react";
import JunkCardDetails from "./JunkCardDetails";
import EditJunkCardForm from "./forms/EditJunkCardForm";

function JunkCard() {
    const [editProgram, setEditProgram] = useState<boolean>(false);

    function toggleEditProgram(): void {
        setEditProgram(!editProgram);
    }

    return (
        <>
            <JunkCardDetails toggleEditProgram={toggleEditProgram}/>
            <EditJunkCardForm showEditProgram={editProgram} toggleEditProgram={toggleEditProgram}/>
        </>);
}

export default JunkCard;
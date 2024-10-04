import {useState} from "react";
import EditJunkDayTimeForm from "./forms/EditJunkDayTimeForm";
import Card from "react-bootstrap/Card";
import {onAirIcon} from "../../../data/JunkIcons";
import JunkNotesForm from "./forms/JunkNotesForm";

function OffAirJunkCardBody() {
    const [editJunkDayTime, setEditJunkDayTime] = useState<boolean>(false);

    function toggleEditJunkDayTime(): void {
        setEditJunkDayTime(!editJunkDayTime);
    }

    return (
        <>
            <br/>
            <JunkNotesForm/>
            <br/>
            <Card.Link onClick={toggleEditJunkDayTime}>
                {onAirIcon}
                {' '}
                Neue Staffel</Card.Link>
            <EditJunkDayTimeForm showNewSeason={editJunkDayTime} setOnAir={true} handleCancel={toggleEditJunkDayTime}/>
        </>
    );
}

export default OffAirJunkCardBody;
import {useState} from "react";
import EditJunkDayTimeForm from "./forms/EditJunkDayTimeForm";
import Card from "react-bootstrap/Card";

function OffAirJunkCardBody() {
    const [editJunkDayTime, setEditJunkDayTime] = useState(false);

    function toggleEditJunkDayTime() {
        setEditJunkDayTime(!editJunkDayTime);
    }

    return (
        <>
            <Card.Link onClick={toggleEditJunkDayTime}>Neue Staffel</Card.Link>
            <EditJunkDayTimeForm showNewSeason={editJunkDayTime} setOnAir={true} handleCancel={toggleEditJunkDayTime}/>
        </>
    );
}

export default OffAirJunkCardBody;
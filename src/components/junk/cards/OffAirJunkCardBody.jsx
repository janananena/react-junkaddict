import {useState} from "react";
import EditJunkDayTimeForm from "./forms/EditJunkDayTimeForm";
import Card from "react-bootstrap/Card";
import {onAirIcon} from "../../../data/JunkIcons";

function OffAirJunkCardBody() {
    const [editJunkDayTime, setEditJunkDayTime] = useState(false);

    function toggleEditJunkDayTime() {
        setEditJunkDayTime(!editJunkDayTime);
    }

    return (
        <>
            <Card.Link onClick={toggleEditJunkDayTime}>
                {onAirIcon}
                {' '}
                Neue Staffel</Card.Link>
            <EditJunkDayTimeForm showNewSeason={editJunkDayTime} setOnAir={true} handleCancel={toggleEditJunkDayTime}/>
        </>
    );
}

export default OffAirJunkCardBody;
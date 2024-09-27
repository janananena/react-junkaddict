import {useState} from "react";
import EditJunkDayTimeForm from "./forms/EditJunkDayTimeForm";

function OffAirJunkCard({displayName, displayStation}) {
    const [editJunkDayTime, setEditJunkDayTime] = useState(false);

    function toggleEditJunkDayTime() {
        setEditJunkDayTime(!editJunkDayTime);
    }

    const editJunkDayTimeButton = <button onClick={toggleEditJunkDayTime}>Neue Staffel</button>;

    return (
        <table>
            <tbody>
            <tr>
                <td>{displayName}</td>
                <td>{displayStation}</td>
            </tr>
            </tbody>
            <tfoot>
            <tr>
                {!editJunkDayTime && <td colSpan="2">{editJunkDayTimeButton}</td>}
                {editJunkDayTime && <td colSpan="2">
                    {<EditJunkDayTimeForm setOnAir={true} handleCancel={toggleEditJunkDayTime}/>}
                </td>}
            </tr>
            </tfoot>
        </table>
    );
}

export default OffAirJunkCard;
import * as React from "react";
import {useState} from "react";
import CollapseJunkCardBody from "./CollapseJunkCardBody.tsx";
import {Junk, useJunkContext} from "../../../contexts/ProgramContext";
import Card from "react-bootstrap/Card";
import DeleteJunkCardForm from "./forms/DeleteJunkCardForm";
import {editIcon, offAirIcon, onAirIcon} from "../../../data/JunkIcons.tsx";
import {changeProgram} from "../../../services/DevDataApiHandlers.tsx";
import EditJunkDayTimeForm from "./forms/EditJunkDayTimeForm.tsx";
import {capitalizeFirstLetter} from "../../../utils/StringUtils.tsx";

interface JunkCardDetailProps {
    toggleEditProgram: () => void
}

function JunkCardDetails({toggleEditProgram}: JunkCardDetailProps) {
    const {junk, setJunk} = useJunkContext();
    const [editJunkDayTime, setEditJunkDayTime] = useState<boolean>(false);

    function toggleEditJunkDayTime(): void {
        setEditJunkDayTime(!editJunkDayTime);
    }

    function getNewProgram(): Junk {
        return {
            ...junk,
            currentSeason: false
        };
    }

    const isOnAir = junk.currentSeason;

    async function handleSetOffAir(event: React.MouseEvent<HTMLButtonElement>): Promise<void> {
        event.preventDefault();
        const prog = await changeProgram(getNewProgram());
        setJunk(prog);
    }

    return (
        <Card key={junk.id}>
            <Card.Header>
                <Card.Link href={junk.link} target="_blank">
                    <img src={new URL(`/src/assets/logos/${junk.station.toLowerCase()}.jpg`, import.meta.url).href} alt={junk.station} height="50"/>
                </Card.Link>
            </Card.Header>
            <Card.Body>
                {junk.nick && <>
                    <Card.Title>{junk.nick}</Card.Title>
                    <Card.Subtitle>{junk.junkname}</Card.Subtitle>
                </>}
                {!junk.nick && <Card.Title>{junk.junkname}</Card.Title>}
                {isOnAir && <Card.Text>
                    {capitalizeFirstLetter(junk.day)} {junk.time} {capitalizeFirstLetter(junk.category)}
                </Card.Text>}
                <CollapseJunkCardBody/>
                <br/>
                {isOnAir && <Card.Link onClick={toggleEditProgram}>
                    {editIcon}
                    {' '}
                    Edit</Card.Link>}
                {isOnAir && <Card.Link onClick={handleSetOffAir}>
                    {offAirIcon}
                    {' '}
                    Staffel Ende</Card.Link>}
                {!isOnAir && <>
                    <Card.Link onClick={toggleEditJunkDayTime}>
                        {onAirIcon}
                        {' '}
                        Neue Staffel</Card.Link>
                    <EditJunkDayTimeForm showNewSeason={editJunkDayTime} setOnAir={true} handleCancel={toggleEditJunkDayTime}/>
                </>
                }
                <DeleteJunkCardForm/>
            </Card.Body>
        </Card>
    );
}

export default JunkCardDetails;
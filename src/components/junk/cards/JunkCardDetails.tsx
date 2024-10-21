import * as React from "react";
import {useState} from "react";
import CollapseJunkCardBody from "./CollapseJunkCardBody.tsx";
import {Junk, useJunkContext} from "../../../contexts/ProgramContext";
import Card from "react-bootstrap/Card";
import DeleteJunkCardForm from "./forms/DeleteJunkCardForm";
import {editIcon, offAirIcon, onAirIcon, startIcon} from "../../../data/JunkIcons.tsx";
import {changeProgram} from "../../../services/DevDataApiHandlers.tsx";
import EditJunkDayTimeForm from "./forms/EditJunkDayTimeForm.tsx";
import {capitalizeFirstLetter} from "../../../utils/StringUtils.tsx";
import {CardText, Stack} from "react-bootstrap";
import Button from "react-bootstrap/Button";

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

    const soon = junk.startDate != null;
    const isOnAir = junk.currentSeason;
    const onOnAir = isOnAir && !soon;
    const soonOnAir = isOnAir && soon;
    const startDate = new Date(Date.parse(junk.startDate!));
    const passed = new Date() > startDate;
    const displayDays = junk.day.length === 7 ? 'Daily' : junk.day.map((day) => capitalizeFirstLetter(day) + ' ');

    async function handleSetOffAir(event: React.MouseEvent<HTMLButtonElement>): Promise<void> {
        event.preventDefault();
        const prog = await changeProgram(getNewProgram());
        setJunk(prog);
    }

    async function handleStart(event: React.MouseEvent<HTMLButtonElement>): Promise<void> {
        event.preventDefault();
        const prog = await changeProgram({...junk, startDate: null});
        setJunk(prog);
    }

    return (
        <Card key={junk.id} style={{marginBottom: 4}}>
            <Card.Body>
                <Card.Link href={junk.link} target="_blank">
                    <div style={{width: '100%'}}>
                        <div style={{width: "fit-content"}}>
                            <Card.Img variant="top" src={new URL(`/src/assets/logos/${junk.station.toLowerCase()}.jpg`, import.meta.url).href} alt={junk.station} style={{maxHeight: 50, objectFit: "scale-down"}}/>
                        </div>
                    </div>
                </Card.Link>
                <br style={{display: "block"}}/>
                {junk.nick && <>
                    <Card.Title style={{marginTop: 8}}>{junk.nick}</Card.Title>
                    <Card.Subtitle>{junk.junkname}</Card.Subtitle>
                </>}
                {!junk.nick && <Card.Title style={{marginTop: 8}}>{junk.junkname}</Card.Title>}
                {onOnAir && <Card.Text style={{marginBottom: 4}}>
                    {displayDays} {junk.time} {capitalizeFirstLetter(junk.category)}
                </Card.Text>}
                {soonOnAir &&
                    <Stack direction="horizontal" gap={2} style={{marginBottom: 4}}>
                        <CardText className={passed ? 'text-danger' : 'text-info'}>
                            starts {startDate.toLocaleDateString('de-de')}
                        </CardText>
                        <Button type="button" variant="outline-secondary" size="sm" onClick={handleStart}>
                            {startIcon} start
                        </Button>
                    </Stack>}
                <CollapseJunkCardBody/>
                <br style={{lineHeight: '50%'}}/>
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
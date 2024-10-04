import {changeProgram} from "../../../services/DevDataApiHandlers";
import {capitalizeFirstLetter} from "../../../utils/StringUtils";
import {useState} from "react";
import {Junk, useJunkContext} from "../../../contexts/ProgramContext";
import Card from "react-bootstrap/Card";
import {editIcon, lessIcon, moreIcon, offAirIcon} from "../../../data/JunkIcons";
import SeasonsForm from "./forms/SeasonsForm";
import JunkLinksForm from "./forms/JunkLinksForm";
import Button from "react-bootstrap/Button";
import JunkNotesForm from "./forms/JunkNotesForm";
import * as React from "react";

interface OnAirJunkCardProps {
    toggleEditProgram: () => void
}

function OnAirJunkCardBody({toggleEditProgram}: OnAirJunkCardProps) {
    const {junk, setJunk} = useJunkContext();

    const [expanded, setExpanded] = useState<boolean>(false);

    function getNewProgram(): Junk {
        return {
            ...junk,
            currentSeason: false
        };
    }

    async function handleSetOffAir(event: React.MouseEvent<HTMLButtonElement>): Promise<void> {
        event.preventDefault();
        const prog = await changeProgram(getNewProgram());
        setJunk(prog);
    }

    return (
        <>
            <Card.Text>
                {capitalizeFirstLetter(junk.day)} {junk.time} {capitalizeFirstLetter(junk.category)}
            </Card.Text>
            {!expanded &&
                <Button type="button" variant="link" onClick={() => setExpanded(true)}>{moreIcon}{' '}more</Button>}
            {expanded &&
                <Button type="button" variant="link" onClick={() => setExpanded(false)}>{lessIcon}{' '}less</Button>}
            {expanded && <SeasonsForm/>}
            {expanded && <JunkLinksForm/>}
            <br/>
            {expanded && <JunkNotesForm/>}
            <br/>
            <Card.Link onClick={toggleEditProgram}>
                {editIcon}
                {' '}
                Edit</Card.Link>
            <Card.Link onClick={handleSetOffAir}>
                {offAirIcon}
                {' '}
                Staffel Ende</Card.Link>
        </>
    );
}

export default OnAirJunkCardBody;
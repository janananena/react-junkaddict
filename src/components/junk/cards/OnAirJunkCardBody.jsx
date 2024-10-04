import {changeProgram} from "../../../services/DevDataApiHandlers";
import {capitalizeFirstLetter} from "../../../utils/StringUtils";
import {useContext, useState} from "react";
import {ProgramContext} from "../../../contexts/ProgramContext";
import Card from "react-bootstrap/Card";
import {editIcon, lessIcon, moreIcon, offAirIcon} from "../../../data/JunkIcons";
import SeasonsForm from "./forms/SeasonsForm";
import JunkLinksForm from "./forms/JunkLinksForm";
import Button from "react-bootstrap/Button";
import JunkNotesForm from "./forms/JunkNotesForm";

function OnAirJunkCardBody({toggleEditProgram}) {
    const [program, setProgram] = useContext(ProgramContext);

    const [expanded, setExpanded] = useState(false);

    function getNewProgram() {
        return {
            ...program,
            currentSeason: false
        };
    }

    async function handleSetOffAir(event) {
        event.preventDefault();
        const prog = await changeProgram(getNewProgram());
        setProgram(prog);
    }

    return (
        <>
            <Card.Text>
                {capitalizeFirstLetter(program.day)} {program.time} {capitalizeFirstLetter(program.category)}
            </Card.Text>
            {!expanded && <Button type="button" variant="link" onClick={() => setExpanded(true)}>{moreIcon}{' '}more</Button>}
            {expanded && <Button type="button" variant="link" onClick={() => setExpanded(false)}>{lessIcon}{' '}less</Button>}
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
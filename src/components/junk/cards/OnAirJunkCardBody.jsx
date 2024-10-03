import {changeProgram} from "../../../services/DevDataApiHandlers";
import {capitalizeFirstLetter} from "../../../utils/StringUtils";
import {useContext} from "react";
import {ProgramContext} from "../../../contexts/ProgramContext";
import Card from "react-bootstrap/Card";
import {editIcon, offAirIcon} from "../../../data/JunkIcons";
import SeasonsForm from "./forms/SeasonsForm";

function OnAirJunkCardBody({toggleEditProgram}) {
    const [program, setProgram] = useContext(ProgramContext);

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
            <SeasonsForm/>
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
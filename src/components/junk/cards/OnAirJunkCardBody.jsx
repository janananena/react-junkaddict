import {changeProgram} from "../../../services/DevDataApiHandlers";
import {capitalizeFirstLetter} from "../../../utils/StringUtils";
import {useContext} from "react";
import {ProgramContext} from "../../../contexts/ProgramContext";
import Card from "react-bootstrap/Card";
import {editIcon, offAirIcon} from "../../../data/JunkIcons";

function OnAirJunkCardBody({toggleEditProgram}) {
    const [program, setProgram] = useContext(ProgramContext);

    async function handleSetOffAir(event) {
        event.preventDefault();
        const newProgram = {...program, currentSeason: false};
        const prog = await changeProgram(newProgram);
        setProgram(prog);
    }

    return (
        <>
            <Card.Text>
                {capitalizeFirstLetter(program.day)} {program.time} {capitalizeFirstLetter(program.category)}
            </Card.Text>
            {program.season && <Card.Text>Season {program.season}</Card.Text>}
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
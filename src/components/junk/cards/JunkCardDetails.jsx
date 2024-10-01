import OnAirJunkCardBody from "./OnAirJunkCardBody";
import OffAirJunkCardBody from "./OffAirJunkCardBody";
import {useContext} from "react";
import {ProgramContext} from "../../../contexts/ProgramContext";
import Card from "react-bootstrap/Card";
import DeleteJunkCardForm from "./forms/DeleteJunkCardForm";

function JunkCardDetails({toggleEditProgram}) {
    const [program] = useContext(ProgramContext);

    const isOnAir = program.currentSeason;

    return (
        <Card key={program.id}>
            <Card.Header>
                <Card.Link href={program.link} target="_blank" >
                    <img src={require(`../../../assets/logos/${program.station.toLowerCase()}.jpg`)} alt={program.station} height="50"/>
                </Card.Link>
            </Card.Header>
            <Card.Body>
                {program.nick && <>
                    <Card.Title>{program.nick}</Card.Title>
                    <Card.Subtitle>{program.title}</Card.Subtitle>
                </>}
                {!program.nick && <Card.Title>{program.title}</Card.Title>}
                {isOnAir && <OnAirJunkCardBody toggleEditProgram={toggleEditProgram}/>}
                {!isOnAir && <OffAirJunkCardBody/>}
                <DeleteJunkCardForm program={program}/>
            </Card.Body>
        </Card>
    );
}

export default JunkCardDetails;
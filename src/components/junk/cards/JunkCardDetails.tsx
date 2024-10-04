import OnAirJunkCardBody from "./OnAirJunkCardBody";
import OffAirJunkCardBody from "./OffAirJunkCardBody";
import {useJunkContext} from "../../../contexts/ProgramContext";
import Card from "react-bootstrap/Card";
import DeleteJunkCardForm from "./forms/DeleteJunkCardForm";

interface JunkCardDetailProps {
    toggleEditProgram: () => void
}

function JunkCardDetails({toggleEditProgram}: JunkCardDetailProps) {
    const {junk} = useJunkContext();

    const isOnAir = junk.currentSeason;

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
                {isOnAir && <OnAirJunkCardBody toggleEditProgram={toggleEditProgram}/>}
                {!isOnAir && <OffAirJunkCardBody/>}
                <DeleteJunkCardForm/>
            </Card.Body>
        </Card>
    );
}

export default JunkCardDetails;
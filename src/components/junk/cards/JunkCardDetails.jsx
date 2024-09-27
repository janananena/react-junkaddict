import OnAirJunkCard from "./OnAirJunkCard";
import OffAirJunkCard from "./OffAirJunkCard";

function JunkCardDetails({program, setProgram, toggleEditProgram}) {
    const isOnAir = program.currentSeason;

    const displayName =
        program.nick
            ? <div>
                <h1>
                    {program.nick}
                </h1>
                <h2>
                    {program.title}
                </h2>
            </div>
            : <h1>
                {program.title}
            </h1>;
    const displayStationLink = <a href={program.link}>
        <img src={require(`../../../assets/logos/${program.station.toLowerCase()}.jpg`)} alt={program.station} width="50"/>
    </a>;

    return (
        <>
            {isOnAir && <OnAirJunkCard displayName={displayName} displayStation={displayStationLink} toggleEditProgram={toggleEditProgram} program={program} setProgram={setProgram}/>}
            {!isOnAir && <OffAirJunkCard displayName={displayName} displayStation={displayStationLink} program={program} setProgram={setProgram}/>}
        </>);
}

export default JunkCardDetails;
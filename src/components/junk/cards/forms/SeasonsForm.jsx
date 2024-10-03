import {useContext, useState} from "react";
import {ProgramContext} from "../../../../contexts/ProgramContext";
import Form from "react-bootstrap/Form";
import {saveIcon, editIcon} from "../../../../data/JunkIcons";
import {changeProgram} from "../../../../services/DevDataApiHandlers";
import _, {random} from "lodash";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

function SeasonsForm() {
    const [program, setProgram] = useContext(ProgramContext);
    const [edit, setEdit] = useState(false);

    const [seasonState, setSeasonState] = useState({"season" : program.season, "seasonSeen": program.seen});

    function updateSeason(season){
        if(season === ''){
            setSeasonState({season: "", seasonSeen: []});
            return;
        }
        const numSeason = Number(season);
        const numOldSeason = Number(seasonState.season);
        if(numSeason < numOldSeason){
            setSeasonState({season: season, seasonSeen: seasonState.seasonSeen.slice(0, numSeason)});
            return;
        }
        if(numSeason > numOldSeason){
            const newChecks = numOldSeason > 0 ? [...seasonState.seasonSeen] : [];
            for(let i =0;i<numSeason-numOldSeason;i++){
                newChecks.push(false);
            }
            setSeasonState({season: season, seasonSeen: newChecks});
        }
    }

    function updateCheck(value, index){
        const newChecks = seasonState.seasonSeen.length > 0 ? [...seasonState.seasonSeen] : [];
        newChecks[index] = value;
        setSeasonState({season: seasonState.season, seasonSeen: newChecks});
    }

    function handleSeason(event) {
        event.preventDefault();
        updateSeason(event.currentTarget.value);
    }

    function handleCheck(event, index){
        event.preventDefault();
        updateCheck(event.currentTarget.checked, index);
    }

    function handleSubmit(event) {
        event.preventDefault();
        const newProgram = {...program, season: seasonState.season, seen: seasonState.seasonSeen};
        const prog = changeProgram(newProgram);
        setProgram(prog);
        setEdit(false);
    }

    const emptyCols = (len) => Array(len).fill(<Col key={`emptyCol-${random(99)}`}/>);

    const chunkSize = 3;
    const chunks = _.chunk(seasonState.seasonSeen, chunkSize);
    let numEmpty = -1;
    const checks = chunks.map((chunk, i) =>
        <Row key={`row-${i}`} className="justify-content-start">
            {chunk.map((isSeen, j) => {
                const num = (i * chunkSize) + j + 1;
                numEmpty = chunkSize - chunk.length;
                return (
                    <Col key={num}>
                        <Form.Check inline disabled={!edit} type="checkbox"
                                    label={`${num}`} id={`inline-checkbox-${num}`} key={`inline-checkbox-${num}`}
                                    checked={isSeen}
                                    onChange={(event) => handleCheck(event, num - 1)}/>
                    </Col>);
            })}
            {numEmpty > 0 && emptyCols()}
        </Row>);

    return (
        <Form className="mb-2">
            <Container fluid>
                <Row key="currSeasonRow">
                    <Col xs={4} key="currSeasonColLabel">
                        <Form.Label>Season</Form.Label>
                    </Col>
                    <Col xs={6} key="currSeasonCol">
                        <Form.Control type="number" value={seasonState.season} name="seasons" key="currSeason" onChange={handleSeason} disabled={!edit}/>
                    </Col>
                    <Col xs={1} key="editButtonSeasons">
                        {edit && <Button variant="link" type="submit" key="submitSeasonsButton" onClick={handleSubmit}>
                            {saveIcon}
                        </Button>}
                        {!edit && <Button variant="link" key="editSeasonsButton" onClick={() => setEdit(true)}>
                            {editIcon}
                        </Button>}
                    </Col>
                </Row>
            </Container>
            {seasonState.seasonSeen.length > 0 && <Row key="bingedRow">
                <Col key="bingedCol" className="mt-2">
                    <Form.Label>binged</Form.Label>
                </Col>
            </Row>}
            {checks}
        </Form>
    );
}

export default SeasonsForm;
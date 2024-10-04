import * as React from "react";
import {random, chunk} from "lodash-es";
import {useJunkContext} from "../../../../contexts/ProgramContext";
import Form from "react-bootstrap/Form";
import {saveIcon, editIcon} from "../../../../data/JunkIcons";
import {changeProgram} from "../../../../services/DevDataApiHandlers";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import {useState} from "react";

interface SeasonState {
    season: string,
    seasonSeen: boolean[]
}

function SeasonsForm() {
    const {junk, setJunk} = useJunkContext();
    const [edit, setEdit] = useState<boolean>(false);

    const [seasonState, setSeasonState] = useState<SeasonState>({season: junk.season, seasonSeen: junk.seen});

    function updateSeason(season: string): void {
        if (season === '') {
            setSeasonState({season: "", seasonSeen: []});
            return;
        }
        const numSeason = Number(season);
        const numOldSeason = Number(seasonState.season);
        if (numSeason < numOldSeason) {
            setSeasonState({season: season, seasonSeen: seasonState.seasonSeen.slice(0, numSeason)});
            return;
        }
        if (numSeason > numOldSeason) {
            const newChecks = numOldSeason > 0 ? [...seasonState.seasonSeen] : [];
            for (let i = 0; i < numSeason - numOldSeason; i++) {
                newChecks.push(false);
            }
            setSeasonState({season: season, seasonSeen: newChecks});
        }
    }

    function updateCheck(value: boolean, index: number): void {
        const newChecks = seasonState.seasonSeen.length > 0 ? [...seasonState.seasonSeen] : [];
        newChecks[index] = value;
        setSeasonState({season: seasonState.season, seasonSeen: newChecks});
    }

    function handleSeason(event: React.ChangeEvent<HTMLInputElement>): void {
        event.preventDefault();
        updateSeason(event.currentTarget.value);
    }

    function handleCheck(event: React.ChangeEvent<HTMLInputElement>, index: number): void {
        event.preventDefault();
        updateCheck(event.currentTarget.checked, index);
    }

    async function handleSubmit(event: React.FormEvent<HTMLButtonElement>): Promise<void> {
        event.preventDefault();
        const newProgram = {...junk, season: seasonState.season, seen: seasonState.seasonSeen};
        const prog = await changeProgram(newProgram);
        setJunk(prog);
        setEdit(false);
    }

    const emptyCols = (len: number) => Array(len).fill(<Col key={`emptyCol-${random(99)}`}/>);

    const chunkSize = 3;
    const chunks: boolean[][] = chunk(seasonState.seasonSeen, chunkSize);
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
            {numEmpty > 0 && emptyCols(numEmpty)}
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
import * as React from "react";
import {isEqual} from "lodash-es";
import {changeProgram} from "../../../../services/DevDataApiHandlers";
import {Junk, useJunkContext} from "../../../../contexts/ProgramContext";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";

interface EditJunkCardProps {
    showEditProgram: boolean,
    toggleEditProgram: () => void
}

function EditJunkCardForm({showEditProgram, toggleEditProgram}: EditJunkCardProps) {
    const {junk, setJunk} = useJunkContext();

    function getNewProgram(input: HTMLFormElement): Junk {
        const newProg = {...junk};
        if (input.nick.value !== "") {
            newProg.nick = input.nick.value;
        }
        newProg.junkname = input.junkname.value;
        newProg.station = input.station.value;
        newProg.day = input.day.value;
        newProg.time = input.time.value;
        newProg.category = input.category.value;
        return newProg;
    }

    async function handleEditProgram(event: React.FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();
        const newProg = getNewProgram(event.currentTarget);
        if (!isEqual(newProg, junk)) {
            const prog = await changeProgram(newProg);
            setJunk(prog);
        }
        toggleEditProgram();
    }

    return (
        <Modal show={showEditProgram} onHide={toggleEditProgram}>
            <Form onSubmit={handleEditProgram}>
                <Modal.Title>Edit Junk</Modal.Title>
                <Modal.Body>
                    <Row>
                        <Col>
                            <Form.Control id="nick" type="text" name="nick" placeholder="Nick" defaultValue={junk.nick ?? ''}/>
                        </Col>
                        <Col xs={8}>
                            <Form.Control id="junkname" type="text" name="junkname" defaultValue={junk.junkname} required/>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col>
                            <Form.Select id="station" name="station" defaultValue={junk.station} required>
                                <option key="rtl" value="rtl">RTL</option>
                                <option key="joyn" value="joyn">Joyn</option>
                                <option key="zdf" value="zdf">ZDF</option>
                                <option key="amazon" value="amazon">Prime</option>
                                <option key="ard" value="ard">ARD</option>
                                <option key="spotify" value="spotify">Spotify</option>
                                <option key="twitch" value="twitch">Twitch</option>
                                <option key="arte" value="arte">Arte</option>
                                <option key="disney" value="disney">Disney</option>
                                <option key="netflix" value="netflix">Netflix</option>
                                <option key="sky" value="sky">Sky</option>
                                <option key="youtube" value="youtube">Youtube</option>
                            </Form.Select>
                        </Col>
                        <Col>
                            <Form.Select id="day" name="day" defaultValue={junk.day} required>
                                <option key="mo" value="mo">Mo</option>
                                <option key="di" value="di">Di</option>
                                <option key="mi" value="mi">Mi</option>
                                <option key="do" value="do">Do</option>
                                <option key="fr" value="fr">Fr</option>
                                <option key="sa" value="sa">Sa</option>
                                <option key="so" value="so">So</option>
                            </Form.Select>
                        </Col>
                        <Col>
                            <Form.Control id="time" type="time" name="time" step="any" defaultValue={junk.time} required/>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col>
                            <Form.Control id="link" type="url" name="link" required defaultValue={junk.link}/>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col>
                            <Form.Control id="season" name="season" type="number" placeholder="Staffel" defaultValue={junk.season}/>
                        </Col>
                        <Col>
                            <Form.Select id="category" name="category" defaultValue={junk.category} required>
                                <option value="tv">Video</option>
                                <option value="podcast">Podcast</option>
                            </Form.Select>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" id="cancelChange" type="button" onClick={toggleEditProgram}>cancel</Button>
                    <Button variant="outline-primary" id="submitChange" type="submit">save</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default EditJunkCardForm;
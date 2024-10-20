import * as React from "react";
import {useState} from "react";
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
    const [currentNick, setCurrentNick] = useState(junk.nick ?? '');
    const [currentName, setCurrentName] = useState(junk.junkname);
    const [currentStation, setCurrentStation] = useState(junk.station);
    const [currentDay, setCurrentDay] = useState(junk.day);
    const [currentTime, setCurrentTime] = useState(junk.time);
    const [currentLink, setCurrentLink] = useState(junk.link);
    const [currentCategory, setCurrentCategory] = useState(junk.category);

    function getNewProgram(): Junk {
        const newProg = {...junk};
        if (currentNick !== "") {
            newProg.nick = currentNick;
        }
        newProg.junkname = currentName;
        newProg.station = currentStation;
        newProg.day = currentDay;
        newProg.time = currentTime;
        newProg.link = currentLink;
        newProg.category = currentCategory;
        return newProg;
    }

    function handleChangeNick(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setCurrentNick(event.currentTarget.value);
    }

    function handleChangeName(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setCurrentName(event.currentTarget.value);
    }

    function handleChangeStation(event: React.ChangeEvent<HTMLSelectElement>) {
        setCurrentStation(event.currentTarget.value);
    }

    function handleChangeDay(event: React.ChangeEvent<HTMLSelectElement>) {
        // @ts-expect-error intellij is wrong, this works
        setCurrentDay([].slice.call(event.target.selectedOptions).map(item => item.value));
    }

    function handleChangeTime(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setCurrentTime(event.currentTarget.value);
    }

    function handleChangeLink(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setCurrentLink(event.currentTarget.value);
    }

    function handleChangeCategory(event: React.ChangeEvent<HTMLSelectElement>) {
        setCurrentCategory(event.currentTarget.value);
    }

    async function handleEditProgram(event: React.FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();
        const newProg = getNewProgram();
        if (!isEqual(newProg, junk)) {
            const prog = await changeProgram(newProg);
            setJunk(prog);
        }
        toggleEditProgram();
    }

    return (
        <Modal show={showEditProgram} onHide={toggleEditProgram} backdropClassName="modal-bigger-bagdrop">
            <Form onSubmit={handleEditProgram}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Junk</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <Form.Control id="nick" type="text" name="nick" placeholder="Nick" value={currentNick} onChange={(event) => handleChangeNick(event)}/>
                        </Col>
                        <Col xs={8}>
                            <Form.Control id="junkname" type="text" name="junkname" value={currentName} onChange={(event) => handleChangeName(event)} required/>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col>
                            <Form.Select id="station" name="station" value={currentStation} onChange={(event) => handleChangeStation(event)} required>
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
                            <Form.Select id="day" name="day" multiple value={currentDay} onChange={(event) => handleChangeDay(event)} required>
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
                            <Form.Control id="time" type="time" name="time" step="any" value={currentTime} onChange={(event) => handleChangeTime(event)} required/>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col>
                            <Form.Control id="link" type="url" name="link" required value={currentLink} onChange={(event) => handleChangeLink(event)}/>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col>
                            <Form.Select id="category" name="category" value={currentCategory} onChange={(event) => handleChangeCategory(event)} required>
                                <option value="tv">Video</option>
                                <option value="podcast">Podcast</option>
                            </Form.Select>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" id="cancelChange" key="cancelChange" name="cancelChange" type="button" onClick={toggleEditProgram}>cancel</Button>
                    <Button variant="outline-primary" id="submitChange" key="submitChange" name="submitChange" type="submit">save</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default EditJunkCardForm;
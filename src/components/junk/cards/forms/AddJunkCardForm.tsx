import {addProgram} from "../../../../services/DevDataApiHandlers";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import {Junk, NewJunk} from "../../../../contexts/ProgramContext";
import * as React from "react";

interface AddJunkCardFormProps {
    showAddForm: boolean,
    toggleAddForm: () => void,
    addNewProgram: (junk: Junk) => void
}

function AddJunkCardForm({showAddForm, toggleAddForm, addNewProgram}: AddJunkCardFormProps) {

    function copyWithDefaults(program: HTMLFormElement): NewJunk {
        const s = program.season.value !== '' ? Number(program.season.value) : '';
        const a = s === '' ? [] : Array(s).fill(false);
        return {
            nick: program.nick.value,
            junkname: program.junkname.value,
            station: program.station.value,
            day: program.day.value,
            time: program.time.value,
            link: program.link.value,
            category: program.category.value,
            currentSeason: true,
            season: s.toString(),
            seen: a,
            links: [],
            notes: []
        };
    }

    async function handleAdd(event: React.FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();
        const program = await addProgram(copyWithDefaults(event.currentTarget));
        addNewProgram(program);
        toggleAddForm();
    }

    return (
        <Modal show={showAddForm} onHide={toggleAddForm}>
            <Form onSubmit={handleAdd}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Junk</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <Form.Control id="nick" type="text" name="nick" placeholder="Kurzname"/>
                        </Col>
                        <Col xs={8}>
                            <Form.Control id="junkname" type="text" name="junkname" required placeholder="Name*"/>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col>
                            <Form.Select id="station" name="station" required>
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
                            <Form.Select id="day" name="day" required>
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
                            <Form.Control id="time" type="time" name="time" step="any" defaultValue="20:15" required/>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col>
                            <Form.Control id="link" type="url" name="link" required placeholder="Link*"/>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col>
                            <Form.Control id="season" name="season" type="number" placeholder="Staffel"
                                          defaultValue=""/>
                        </Col>
                        <Col>
                            <Form.Select id="category" name="category" required>
                                <option value="tv">Video</option>
                                <option value="podcast">Podcast</option>
                            </Form.Select>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" id="cancelbutton" type="button" onClick={toggleAddForm}>cancel</Button>
                    <Button variant="outline-primary" id="addbutton" type="submit">add</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default AddJunkCardForm;
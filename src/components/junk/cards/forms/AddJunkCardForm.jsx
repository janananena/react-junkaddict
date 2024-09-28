import {addProgram} from "../../../../services/DevDataApiHandlers";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";

function AddJunkCardForm({showAddForm, addNewProgram, toggleAddProgram}) {

    async function handleAdd(event) {
        event.preventDefault();
        const program = await addProgram(event.currentTarget);
        addNewProgram(program);
        toggleAddProgram();
    }

    return (
        <Modal show={showAddForm} onHide={toggleAddProgram}>
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
                            <Form.Control id="title" type="text" name="title" required placeholder="Name*"/>
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
                            <Form.Control id="season" name="season" type="number" placeholder="Staffel"/>
                        </Col>
                        <Col>
                            <Form.Select id="category" name="category" required>
                                <option value="tv">Video</option>
                                <option value="podcast">Podcast</option>
                            </Form.Select>
                        </Col>
                    </Row>
                    <Form.Control id="currentSeason" type="hidden" name="currentSeason" value="true"/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" id="cancelbutton" type="button" onClick={toggleAddProgram}>cancel</Button>
                    <Button variant="outline-primary" id="addbutton" type="submit">add</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default AddJunkCardForm;
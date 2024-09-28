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
                        <Form.Group as={Col}>
                            <Form.Label>Nick</Form.Label>
                            <Form.Control id="nick" type="text" name="nick"/>
                        </Form.Group>
                        <Form.Group as={Col} xs={8}>
                            <Form.Label>Offizieller Name</Form.Label>
                            <Form.Control id="title" type="text" name="title" required/>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col}>
                            <Form.Label>Sender</Form.Label>
                            <Form.Select id="station" name="station" required>
                                <option key="rtl" value="rtl">RTL</option>
                                <option key="joyn" value="joyn">Joyn</option>
                                <option key="zdf" value="zdf">ZDF</option>
                                <option key="amazon" value="amazon">Prime</option>
                                <option key="ard" value="ard">ARD</option>
                                <option key="spotify" value="spotify">Spotify</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Tag</Form.Label>
                            <Form.Select id="day" name="day" required>
                                <option key="mo" value="mo">Mo</option>
                                <option key="di" value="di">Di</option>
                                <option key="mi" value="mi">Mi</option>
                                <option key="do" value="do">Do</option>
                                <option key="fr" value="fr">Fr</option>
                                <option key="sa" value="sa">Sa</option>
                                <option key="so" value="so">So</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Uhrzeit</Form.Label>
                            <Form.Control id="time" type="time" name="time" step="any" required/>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} xs={8}>
                            <Form.Label>Link</Form.Label>
                            <Form.Control id="link" type="url" name="link" required/>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Kategorie</Form.Label>
                            <Form.Select id="category" name="category" required>
                                <option value="tv">Video</option>
                                <option value="podcast">Podcast</option>
                            </Form.Select>
                        </Form.Group>
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
import {changeProgram} from "../../../../services/DevDataApiHandlers";
import {useContext} from "react";
import {ProgramContext} from "../../../../contexts/ProgramContext";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function EditJunkDayTimeForm({setOnAir, showNewSeason, handleCancel}) {
    const [program, setProgram] = useContext(ProgramContext);

    async function handleSubmit(event) {
        event.preventDefault();
        const newProgram = {
            ...program,
            day: event.currentTarget.day.value,
            time: event.currentTarget.time.value,
            currentSeason: setOnAir
        };
        const prog = await changeProgram(newProgram);
        setProgram(prog);
        handleCancel();
    }

    return (
        <Modal show={showNewSeason} onHide={handleCancel}>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Row>
                        <Col>
                            <Form.Select id="day" name="day" defaultValue={program.day} required>
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
                            <Form.Control id="time" type="time" name="time" step="any" defaultValue={program.time} required/>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" id="cancelChange" type="button" onClick={handleCancel}>cancel</Button>
                    <Button variant="outline-primary" id="submitChange" type="submit">save</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default EditJunkDayTimeForm;
import * as React from "react";
import {changeProgram} from "../../../../services/DevDataApiHandlers";
import {Junk, useJunkContext} from "../../../../contexts/ProgramContext";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

interface EditJunkDayTimeProps {
    setOnAir: boolean,
    showNewSeason: boolean,
    handleCancel: () => void
}

function EditJunkDayTimeForm({setOnAir, showNewSeason, handleCancel}: EditJunkDayTimeProps) {
    const {junk, setJunk} = useJunkContext();

    function getNewProgram(input: HTMLFormElement): Junk {
        const s: string = junk.season !== '' ? (parseInt(junk.season) + 1).toString() : '';
        const arr: boolean[] = [...junk.seen];
        arr.push(false);
        const a: boolean[] = s !== '' ? arr : [];
        return {
            ...junk,
            day: input.day.value,
            time: input.time.value,
            currentSeason: setOnAir,
            season: s,
            seen: a
        };
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();
        const prog = await changeProgram(getNewProgram(event.currentTarget));
        setJunk(prog);
        handleCancel();
    }

    return (
        <Modal show={showNewSeason} onHide={handleCancel}>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Row>
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
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" id="cancelChange" type="button"
                            onClick={handleCancel}>cancel</Button>
                    <Button variant="outline-primary" id="submitChange" type="submit">save</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default EditJunkDayTimeForm;
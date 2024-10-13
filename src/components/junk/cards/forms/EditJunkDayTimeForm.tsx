import * as React from "react";
import {changeProgram} from "../../../../services/DevDataApiHandlers";
import {Junk, useJunkContext} from "../../../../contexts/ProgramContext";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {useState} from "react";

interface EditJunkDayTimeProps {
    setOnAir: boolean,
    showNewSeason: boolean,
    handleCancel: () => void
}

function EditJunkDayTimeForm({setOnAir, showNewSeason, handleCancel}: EditJunkDayTimeProps) {
    const {junk, setJunk} = useJunkContext();
    const [currentDay, setCurrentDay] = useState(junk.day);
    const [currentTime, setCurrentTime] = useState(junk.time);

    function getNewProgram(): Junk {
        const s: string = junk.season !== '' ? (parseInt(junk.season) + 1).toString() : '';
        const arr: boolean[] = [...junk.seen];
        arr.push(false);
        const a: boolean[] = s !== '' ? arr : [];
        return {
            ...junk,
            day: currentDay,
            time: currentTime,
            currentSeason: setOnAir,
            season: s,
            seen: a
        };
    }

    function handleChangeDay(event: React.ChangeEvent<HTMLSelectElement>): void {
        setCurrentDay(event.currentTarget.value);
    }

    function handleChangeTime(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
        setCurrentTime(event.currentTarget.value);
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();
        const prog = await changeProgram(getNewProgram());
        setJunk(prog);
        handleCancel();
    }

    return (
        <Modal show={showNewSeason} onHide={handleCancel}>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Row>
                        <Col>
                            <Form.Select id="day" name="day" value={currentDay} onChange={(event) => handleChangeDay(event)} required>
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
                            <Form.Control id="junktime" type="time" name="junktime" step="any" value={currentTime} onChange={(event) => handleChangeTime(event)} required as="input"/>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" id="cancelChange" key="cancelChange" name="cancelChange" type="button"
                            onClick={handleCancel}>cancel</Button>
                    <Button variant="outline-primary" id="submitChange" key="submitChange" name="submitChange" type="submit">save</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default EditJunkDayTimeForm;
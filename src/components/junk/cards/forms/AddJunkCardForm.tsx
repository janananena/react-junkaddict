import {addProgram} from "../../../../services/DevDataApiHandlers";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import {Junk, NewJunk} from "../../../../contexts/ProgramContext";
import * as React from "react";
import {useState} from "react";

interface AddJunkCardFormProps {
    showAddForm: boolean,
    toggleAddForm: () => void,
    addNewProgram: (junk: Junk) => void
}

function AddJunkCardForm({showAddForm, toggleAddForm, addNewProgram}: AddJunkCardFormProps) {
    const [currentNick, setCurrentNick] = useState('');
    const [currentName, setCurrentName] = useState('');
    const [currentStation, setCurrentStation] = useState('rtl');
    const [currentDay, setCurrentDay] = useState('mo');
    const [currentTime, setCurrentTime] = useState('20:15');
    const [currentLink, setCurrentLink] = useState('');
    const [currentCategory, setCurrentCategory] = useState('tv');

    function resetFields(): void {
        setCurrentNick("");
        setCurrentName("");
        setCurrentStation("rtl");
        setCurrentDay("mo");
        setCurrentTime("20:15");
        setCurrentLink("");
        setCurrentCategory("tv");
    }

    function copyWithDefaults(): NewJunk {
        return {
            nick: currentNick,
            junkname: currentName,
            station: currentStation,
            day: currentDay,
            time: currentTime,
            link: currentLink,
            category: currentCategory,
            currentSeason: true,
            season: "",
            seen: [],
            links: [],
            notes: []
        };
    }

    function handleChangeNick(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        setCurrentNick(event.currentTarget.value);
    }
    function handleChangeName(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        setCurrentName(event.currentTarget.value);
    }
    function handleChangeStation(event: React.ChangeEvent<HTMLSelectElement>){
        setCurrentStation(event.currentTarget.value);
    }
    function handleChangeDay(event: React.ChangeEvent<HTMLSelectElement>){
        setCurrentDay(event.currentTarget.value);
    }
    function handleChangeTime(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        setCurrentTime(event.currentTarget.value);
    }
    function handleChangeLink(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        setCurrentLink(event.currentTarget.value);
    }
    function handleChangeCategory(event: React.ChangeEvent<HTMLSelectElement>){
        setCurrentCategory(event.currentTarget.value);
    }

    async function handleAdd(event: React.FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();
        const program = await addProgram(copyWithDefaults());
        addNewProgram(program);
        resetFields();
        toggleAddForm();
    }

    return (
        <Modal show={showAddForm} onHide={toggleAddForm} backdropClassName="modal-bigger-bagdrop">
            <Form onSubmit={handleAdd}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Junk</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <Form.Control id="nick" type="text" name="nick" placeholder="Kurzname" value={currentNick} onChange={(event) => handleChangeNick(event)}/>
                        </Col>
                        <Col xs={8}>
                            <Form.Control id="junkname" type="text" name="junkname" required placeholder="Name*" value={currentName} onChange={(event) => handleChangeName(event)}/>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col>
                            <Form.Select id="station" name="station" required value={currentStation} onChange={(event) => handleChangeStation(event)}>
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
                            <Form.Select id="day" name="day" required value={currentDay} onChange={(event) => handleChangeDay(event)}>
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
                            <Form.Control id="link" type="url" name="link" required placeholder="Link*" value={currentLink} onChange={(event) => handleChangeLink(event)}/>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col>
                            <Form.Select id="category" name="category" required value={currentCategory} onChange={(event) => handleChangeCategory(event)}>
                                <option value="tv">Video</option>
                                <option value="podcast">Podcast</option>
                            </Form.Select>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" id="cancelbutton" key="cancelbutton" name="cancelbutton" type="button" onClick={toggleAddForm}>cancel</Button>
                    <Button variant="outline-primary" id="addbutton" key="addbutton" name="addbutton" type="submit">add</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default AddJunkCardForm;
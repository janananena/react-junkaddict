import {useContext, useState} from "react";
import {InputGroup, ListGroup} from "react-bootstrap";
import {ProgramContext} from "../../../../contexts/ProgramContext";
import {addIcon, deleteIcon, editIcon, saveIcon} from "../../../../data/JunkIcons";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import {changeProgram} from "../../../../services/DevDataApiHandlers";

function JunkNotesForm() {
    const [program, setProgram] = useContext(ProgramContext);
    const [edit, setEdit] = useState(false);

    const [notesState, setNotesState] = useState(program.notes);

    function handleAddNote() {
        const notes = [...notesState];
        notes.push("");
        setNotesState(notes);
    }

    function handleChangeNote(event, i) {
        const notes = [...notesState];
        notes[i] = event.currentTarget.value;
        setNotesState(notes);
    }

    function handleDeleteNote(i) {
        const notes = notesState.filter((value, index) => i !== index);
        setNotesState(notes);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const newNotes = await changeProgram({...program, notes: notesState});
        setProgram(newNotes);
        setEdit(false);
    }

    const editJunkNotes =
        <Form>
            {notesState.map((note, i) =>
                <Row key={`${i}`}>
                    <Col key={`${i}`}>
                        <InputGroup key={`${i}`}>
                            <Form.Control type="input" key={`form-input-${i}`} defaultValue={notesState[i]} onChange={(event) => handleChangeNote(event, i)} required/>
                            <Button type="button" variant="outline-secondary" name={`form-delete-${i}`} key={`form-delete-${i}`} onClick={() => handleDeleteNote(i)}>{deleteIcon}</Button>
                        </InputGroup>
                    </Col>
                </Row>
            )}
            <Container className="justify-content-start m-1">
                <Row key="button-row" xs="auto">
                    <Col key="button-col-add">
                        <Button variant="outline-secondary" type="button" key="addNoteButton" onClick={handleAddNote}>
                            {addIcon}
                        </Button>
                    </Col>
                    <Col key="button-col-save">
                        <Button variant="outline-secondary" type="submit" key="submitNotesButton" onClick={handleSubmit}>
                            {saveIcon}
                        </Button>
                    </Col>
                </Row>
            </Container>
        </Form>;

    const showJunkNotes =
        <ListGroup>
            {notesState.map((note, i) =>
                <ListGroup.Item key={`notes-${i}`}>
                    {note}
                </ListGroup.Item>
            )}
            <ListGroup.Item action key="editNotesButton" onClick={() => setEdit(true)}>
                {editIcon}{' '}Edit notes
            </ListGroup.Item>
        </ListGroup>;

    return (<>
        {edit && editJunkNotes}
        {!edit && showJunkNotes}
    </>);
}

export default JunkNotesForm;
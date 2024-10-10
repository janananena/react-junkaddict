import * as React from "react";
import {InputGroup, ListGroup} from "react-bootstrap";
import {useJunkContext} from "../../../../contexts/ProgramContext";
import {addIcon, deleteIcon, editIcon, saveIcon} from "../../../../data/JunkIcons";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import {changeProgram} from "../../../../services/DevDataApiHandlers";
import {useState} from "react";

function JunkNotesForm() {
    const {junk, setJunk} = useJunkContext();
    const [edit, setEdit] = useState<boolean>(false);

    const [notesState, setNotesState] = useState<string[]>(junk.notes);

    function handleAddNote(): void {
        const notes = [...notesState];
        notes.push("");
        setNotesState(notes);
    }

    function handleChangeNote(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, i: number): void {
        const notes = [...notesState];
        notes[i] = event.currentTarget.value;
        setNotesState(notes);
    }

    function handleDeleteNote(i: number): void {
        const notes = notesState.filter((_value, index) => i !== index);
        setNotesState(notes);
    }

    async function handleSubmit(event: React.MouseEvent<HTMLButtonElement>): Promise<void> {
        event.preventDefault();
        const newNotes = await changeProgram({...junk, notes: notesState});
        setJunk(newNotes);
        setEdit(false);
    }

    const editJunkNotes =
        <Form>
            {notesState.map((_note, i) =>
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
                        <Button variant="outline-secondary" type="button" key="addNoteButton" name="addNoteButton" onClick={handleAddNote}>
                            {addIcon}
                        </Button>
                    </Col>
                    <Col key="button-col-save">
                        <Button variant="outline-secondary" type="submit" key="submitNotesButton" name="submitNotesButton" onClick={handleSubmit}>
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
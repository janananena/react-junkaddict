import * as React from "react";
import {useState} from "react";
import {InputGroup, ListGroup} from "react-bootstrap";
import {Note, useJunkContext} from "../../../../contexts/ProgramContext";
import {addIcon, deleteIcon, editIcon, saveIcon} from "../../../../data/JunkIcons";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {changeProgram} from "../../../../services/DevDataApiHandlers";

function JunkNotesForm() {
    const {junk, setJunk} = useJunkContext();
    const [edit, setEdit] = useState<boolean>(false);

    const [notesState, setNotesState] = useState<Note[]>(junk.notes);

    function handleAddNote(): void {
        const notes = [...notesState];
        notes.push({
            alwaysShow: false,
            note: ""
        });
        setNotesState(notes);
    }

    function handleToggleAlwaysShow(i: number): void {
        const notes = [...notesState];
        notes[i] = {
            alwaysShow: !notes[i].alwaysShow,
            note: notes[i].note
        };
        setNotesState(notes);
    }

    function handleChangeNote(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, i: number): void {
        const notes = [...notesState];
        notes[i] = {
            alwaysShow: notes[i].alwaysShow,
            note: event.currentTarget.value
        };
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
            <ListGroup>
                {notesState.map((_note, i) =>
                    <Row key={`${i}`}>
                        <Col key={`${i}`}>
                            <InputGroup key={`${i}`}>
                                <InputGroup.Checkbox type="checkbox" key={`form-checkbox-${i}`} defaultChecked={notesState[i].alwaysShow} onChange={() => handleToggleAlwaysShow(i)}/>
                                <Form.Control type="input" key={`form-input-${i}`} defaultValue={notesState[i].note} onChange={(event) => handleChangeNote(event, i)} required/>
                                <Button type="button" variant="outline-secondary" name={`form-delete-${i}`} key={`form-delete-${i}`} onClick={() => handleDeleteNote(i)}>{deleteIcon}</Button>
                            </InputGroup>
                        </Col>
                    </Row>
                )}
                <ListGroup horizontal={true}>
                    <ListGroup.Item as='button' action variant="outline-secondary" type="button" key="addNoteButton" name="addNoteButton" onClick={handleAddNote}>
                        {addIcon}{' '}Add Note
                    </ListGroup.Item>
                    <ListGroup.Item action as='button' variant="outline-secondary" type="submit" key="submitNotesButton" name="submitNotesButton" onClick={handleSubmit}>
                        {saveIcon}{' '}Save Notes
                    </ListGroup.Item>
                </ListGroup>
            </ListGroup>
        </Form>;

    const showJunkNotes =
        <ListGroup>
            {notesState.map((note, i) =>
                <InputGroup key={`notes-${i}`}>
                    <InputGroup.Checkbox type="checkbox" key={`form-checkbox-${i}`} name={`form-checkbox-${i}`} checked={note.alwaysShow} readOnly/>
                    <Form.Control type="input" key={`form-input-${i}`} name={`form-input-${i}`} value={note.note} readOnly/>
                </InputGroup>
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
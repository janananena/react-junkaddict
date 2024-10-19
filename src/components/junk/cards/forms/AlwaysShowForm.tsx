import {useJunkContext} from "../../../../contexts/ProgramContext.tsx";
import {ListGroup} from "react-bootstrap";
import Form from "react-bootstrap/Form";

function AlwaysShowForm() {
    const {junk} = useJunkContext();

    const notes = junk.notes.filter((note) => note.alwaysShow);

    return (
        <ListGroup>
            {notes.map((note, i) =>
                <Form.Control type="input" key={`form-input-${i}`} name={`form-input-${i}`} value={note.note} readOnly/>
            )}
        </ListGroup>
    )
}

export default AlwaysShowForm;
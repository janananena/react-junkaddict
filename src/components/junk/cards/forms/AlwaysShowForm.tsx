import {useJunkContext} from "../../../../contexts/ProgramContext.tsx";
import {ListGroup} from "react-bootstrap";
import Form from "react-bootstrap/Form";

function AlwaysShowForm() {
    const {junk} = useJunkContext();

    const notes = junk.notes.filter((note) => note.alwaysShow);
    const links = junk.links.filter((link) => link.alwaysShow);

    return (
        <>
            <ListGroup>
                {notes.map((note, i) =>
                    <Form.Control type="input" key={`form-input-${i}`} name={`form-input-${i}`} value={note.note} size="sm" readOnly/>
                )}
            </ListGroup>
            <ListGroup>
                {links.map((link, i) =>
                    <ListGroup.Item action key={`form-link-${i}`} onClick={() => window.open(link.junklink, "_blank")} style={{fontSize:'14px', padding:'4px 8px 4px 8px'}}>
                        {link.junklink}
                    </ListGroup.Item>
                )}
            </ListGroup>
        </>
    )
}

export default AlwaysShowForm;
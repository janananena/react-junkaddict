import {deleteProgram} from "../../../../services/DevDataApiHandlers";
import {useContext, useState} from "react";
import {ProgramContext} from "../../../../contexts/ProgramContext";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import {deleteIcon} from "../../../../data/JunkIcons";

function DeleteJunkCardForm() {
    const [program, _, removeProgram] = useContext(ProgramContext);
    const [confirmDeleteProgram, setConfirmDeleteProgram] = useState(false);

    function toggleDeleteProgram() {
        setConfirmDeleteProgram(!confirmDeleteProgram);
    }

    async function handleDeleteProgram(event) {
        event.preventDefault();
        await deleteProgram(program);
        removeProgram(program);
        toggleDeleteProgram();
    }

    return (
        <>
            <Modal show={confirmDeleteProgram} onHide={toggleDeleteProgram}>
                <Form onSubmit={handleDeleteProgram}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Junk?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {program.nick && program.nick + ' - '} {program.title}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-secondary" id="cancelDelete" type="button" onClick={toggleDeleteProgram}>cancel</Button>
                        <Button variant="outline-primary" id="submitDelete" type="submit">delete</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            <Card.Link onClick={toggleDeleteProgram}>{deleteIcon}</Card.Link>
        </>
    );
}

export default DeleteJunkCardForm;
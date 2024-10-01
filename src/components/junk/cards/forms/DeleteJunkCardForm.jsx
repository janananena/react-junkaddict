import {deleteProgram} from "../../../../services/DevDataApiHandlers";
import {useContext, useState} from "react";
import {ProgramContext} from "../../../../contexts/ProgramContext";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";

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

    const deleteIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
    </svg>;

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
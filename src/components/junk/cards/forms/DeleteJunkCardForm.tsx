import {deleteProgram} from "../../../../services/DevDataApiHandlers";
import {useState} from "react";
import {useJunkContext} from "../../../../contexts/ProgramContext";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import {deleteIcon} from "../../../../data/JunkIcons";
import * as React from "react";

function DeleteJunkCardForm() {
    const {junk, removeJunk} = useJunkContext();
    const [confirmDeleteProgram, setConfirmDeleteProgram] = useState<boolean>(false);

    function toggleDeleteProgram(): void {
        setConfirmDeleteProgram(!confirmDeleteProgram);
    }

    async function handleDeleteProgram(event: React.FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();
        await deleteProgram(junk);
        removeJunk(junk);
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
                        {junk.nick && junk.nick + ' - '} {junk.junkname}
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
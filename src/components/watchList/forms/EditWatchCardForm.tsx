import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import * as React from "react";
import {useState} from "react";
import {ToWatch} from "../../../contexts/WatchListContext.tsx";
import {changeWatch} from "../../../services/DevDataApiHandlers.tsx";

interface EditWatchCardFormProps {
    watch: ToWatch,
    showEditForm: boolean,
    toggleEditForm: () => void,
    editWatch: (watch: ToWatch) => void
}

function EditWatchCardForm({watch, showEditForm, toggleEditForm, editWatch}: EditWatchCardFormProps) {
    const [currentLink, setCurrentLink] = useState(watch.link);
    const [currentLabel, setCurrentLabel] = useState(watch.label === null ? '' : watch.label);
    const [currentCollection, setCurrentCollection] = useState(watch.collection === null ? '' : watch.collection);


    function handleChangeLink(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setCurrentLink(event.currentTarget.value);
    }

    function handleChangeLabel(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setCurrentLabel(event.currentTarget.value);
    }

    function handleChangeCollection(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setCurrentCollection(event.currentTarget.value);
    }

    function getEditedWatch(): ToWatch {
        return {
            ...watch,
            link: currentLink,
            label: currentLabel === '' ? null : currentLabel,
            collection: currentCollection === '' ? null : currentCollection
        }
    }

    async function handleEdit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();
        const watch = await changeWatch(getEditedWatch());
        editWatch(watch);
        toggleEditForm();
    }

    return (
        <Modal key={`edit-modal-${watch.id}`} show={showEditForm} onHide={toggleEditForm} backdropClassName="modal-bigger-bagdrop">
            <Form key={`edit-form-${watch.id}`} onSubmit={handleEdit}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Link</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control key={`watch-link-${watch.id}`} id="link" type="text" name="link" required autoFocus placeholder="Link*" value={currentLink} onChange={(event) => handleChangeLink(event)}/>
                    <br/>
                    <Form.Control key={`watch-label-${watch.id}`}  id="label" type="text" name="label" placeholder="Label" value={currentLabel} onChange={(event) => handleChangeLabel(event)}/>
                    <br/>
                    <Form.Control key={`watch-collection-${watch.id}`}  id="collection" type="text" name="collection" placeholder="Collection" value={currentCollection} onChange={(event) => handleChangeCollection(event)}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" id="cancelbutton" key={`cancelbutton-${watch.id}`} name="cancelbutton" type="button" onClick={toggleEditForm}>cancel</Button>
                    <Button variant="outline-primary" id="editbutton" key={`editbutton-${watch.id}`} name="editbutton" type="submit">save</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default EditWatchCardForm;
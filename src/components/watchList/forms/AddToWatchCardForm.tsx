import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import * as React from "react";
import {useState} from "react";
import {NewWatch, ToWatch} from "../../../contexts/WatchListContext.tsx";
import {addWatch} from "../../../services/DevDataApiHandlers.tsx";
import {InputGroup} from "react-bootstrap";

interface AddToWatchCardFormProps {
    showAddForm: boolean,
    toggleAddForm: () => void,
    addNewWatch: (watch: ToWatch) => void,
    prefillCollection: string
}

function AddToWatchCardForm({showAddForm, toggleAddForm, addNewWatch, prefillCollection}: AddToWatchCardFormProps) {
    const [currentLink, setCurrentLink] = useState('');
    const [currentLabel, setCurrentLabel] = useState('');
    const [currentCollection, setCurrentCollection] = useState(prefillCollection);
    const [currentAvailableUntil, setCurrentAvailableUntil] = useState('');

    function resetFields(): void {
        setCurrentLink("");
        setCurrentLabel("");
        setCurrentCollection("");
        setCurrentAvailableUntil("");
    }

    function copyWithDefaults(): NewWatch {
        return {
            link: currentLink,
            label: currentLabel !== '' ? currentLabel : null,
            collection: currentCollection !== '' ? currentCollection : null,
            seen: false,
            availableUntil: currentAvailableUntil !== '' ? currentAvailableUntil : null
        };
    }

    function handleChangeLink(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setCurrentLink(event.currentTarget.value);
    }

    function handleChangeLabel(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setCurrentLabel(event.currentTarget.value);
    }

    function handleChangeCollection(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setCurrentCollection(event.currentTarget.value);
    }

    function handleChangeAvailableUntil(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setCurrentAvailableUntil(event.currentTarget.value);
    }

    async function handleAdd(event: React.FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();
        const watch = await addWatch(copyWithDefaults());
        addNewWatch(watch);
        resetFields();
        toggleAddForm();
    }

    return (
        <Modal show={showAddForm} onHide={toggleAddForm} backdropClassName="modal-bigger-bagdrop">
            <Form onSubmit={handleAdd}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Link</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control id="link" type="text" name="link" required autoFocus placeholder="Link*" value={currentLink} onChange={(event) => handleChangeLink(event)}/>
                    <br/>
                    <Form.Control id="label" type="text" name="label" placeholder="Label" value={currentLabel} onChange={(event) => handleChangeLabel(event)}/>
                    <br/>
                    <Form.Control id="collection" type="text" name="collection" placeholder="Collection" value={currentCollection} onChange={(event) => handleChangeCollection(event)}/>
                    <br/>
                    <InputGroup>
                        <InputGroup.Text>Online Until</InputGroup.Text>
                    <Form.Control id="availableUntil" type="date" name="availableUntil" placeholder="" value={currentAvailableUntil} onChange={(event) => handleChangeAvailableUntil(event)}/>
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" id="cancelbutton" key="cancelbutton" name="cancelbutton" type="button" onClick={toggleAddForm}>cancel</Button>
                    <Button variant="outline-primary" id="addbutton" key="addbutton" name="addbutton" type="submit">add</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default AddToWatchCardForm;
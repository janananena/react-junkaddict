import {useState} from "react";
import {ToWatch} from "../../contexts/WatchListContext.tsx";
import Card from "react-bootstrap/Card";
import {capitalizeFirstLetter} from "../../utils/StringUtils.tsx";
import {Collapse, Form, InputGroup, ListGroup} from "react-bootstrap";
import {addIcon, deleteIcon, editIcon, lessIcon, moreIcon, onAirIcon, startIcon, watchedIcon} from "../../data/JunkIcons.tsx";
import Button from "react-bootstrap/Button";
import EditWatchCardForm from "./forms/EditWatchCardForm.tsx";
import {changeWatch, deleteWatch} from "../../services/DevDataApiHandlers.tsx";
import Col from "react-bootstrap/Col";
import {random} from "lodash-es";
import AddToWatchCardForm from "./forms/AddToWatchCardForm.tsx";

interface WatchCardProps {
    expanded: boolean,
    collection: string | undefined,
    watches: ToWatch[],
    editWatch: (watch: ToWatch) => void,
    addWatch: (watch: ToWatch) => void,
    removeWatch: (watch: ToWatch) => void
}

function WatchCard({expanded, collection, watches, editWatch, addWatch, removeWatch}: WatchCardProps) {
    const [exp, setExp] = useState<boolean>(expanded);
    const [showEdit, setShowEdit] = useState<boolean[]>(watches.map(() => false));
    const [showAdd, setShowAdd] = useState<boolean>(false);
    const title = collection?.split(' ').map((s) => capitalizeFirstLetter(s)).join(' ');

    function toggleEditForm(i: number) {
        const edits = [...showEdit];
        edits[i] = !showEdit[i];
        setShowEdit(edits);
    }

    function toggleAddForm() {
        setShowAdd(!showAdd);
    }

    function onClickWatch(watch: ToWatch): void {
        window.open(watch.link, "_blank");
    }

    async function handleWatched(watch: ToWatch): Promise<void> {
        const w = await changeWatch({...watch, seen: true});
        editWatch(w);
    }

    async function handleWatch(watch: ToWatch): Promise<void> {
        const w = await changeWatch({...watch, seen: false});
        editWatch(w);
    }

    async function handleDelete(watch: ToWatch): Promise<void> {
        await deleteWatch(watch);
        removeWatch(watch);
    }

    const key = random(0, 9999)
    return (
        <Col key={`col-${key}`} style={{marginBottom: 10}}>
            <Card style={{minWidth: expanded ? '25rem' : '18rem', minHeight: expanded ? '15rem' : '10rem'}} key={`card-${key}`}>
                <Card.Body>
                    {collection !== undefined && <Card.Title key={`title-${key}`}>{title}</Card.Title>}
                    {collection === undefined && <Card.Title key={`title-${key}`} style={{opacity: '10%'}}>No Collection</Card.Title>}
                    <ListGroup.Item key={`button-${key}`} action onClick={() => setExp(!exp)}>{exp ? lessIcon : moreIcon}{' '}{exp ? 'less' : 'more'}</ListGroup.Item>
                    <Collapse key={`collapse-${key}`} in={exp}>
                        <ListGroup key={`list-group-${key}`}>
                            {watches.map((watch, index) =>
                                <>
                                    <InputGroup key={watch.id}>
                                        <InputGroup.Text key={`start-${watch.id}`} onClick={() => onClickWatch(watch)}>{startIcon}</InputGroup.Text>
                                        <Form.Control key={`link-${watch.id}`} readOnly value={watch.label ? watch.label : watch.link} onClick={() => onClickWatch(watch)}/>
                                        <Button type="button" variant="outline-secondary" name={`form-edit-${watch.id}`} key={`form-edit-${watch.id}`} onClick={() => toggleEditForm(index)}>{editIcon}</Button>
                                        {expanded && <Button type="button" variant="outline-secondary" name={`form-watched-${watch.id}`} key={`form-watched-${watch.id}`} onClick={() => handleWatched(watch)}>{watchedIcon}</Button>}
                                        {!expanded && <Button type="button" variant="outline-secondary" name={`form-watch-${watch.id}`} key={`form-watch-${watch.id}`} onClick={() => handleWatch(watch)}>{onAirIcon}</Button>}
                                        {!expanded && <Button type="button" variant="outline-secondary" name={`form-delete-${watch.id}`} key={`form-delete-${watch.id}`} onClick={() => handleDelete(watch)}>{deleteIcon}</Button>}
                                    </InputGroup>
                                    <EditWatchCardForm key={`edit-${key}-${watch.id}`} watch={watch} showEditForm={showEdit[index]} toggleEditForm={() => toggleEditForm(index)} editWatch={editWatch}/>
                                </>
                            )}
                        </ListGroup>
                    </Collapse>
                    <br/>
                    <Button type="button" variant="outline-secondary" name={`form-add-${collection}-${key}`} key={`form-add-${collection}-${key}`} onClick={() => setShowAdd(true)}>{addIcon} Add Link</Button>
                    <AddToWatchCardForm key={`add-watch-form-collection-${collection}-${key}`} showAddForm={showAdd} toggleAddForm={toggleAddForm} addNewWatch={addWatch} prefillCollection={collection ? collection : ''}/>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default WatchCard;
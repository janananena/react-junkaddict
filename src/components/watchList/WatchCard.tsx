import {useState} from "react";
import {ToWatch} from "../../contexts/WatchListContext.tsx";
import Card from "react-bootstrap/Card";
import {capitalizeFirstLetter} from "../../utils/StringUtils.tsx";
import {Collapse, InputGroup, ListGroup} from "react-bootstrap";
import {addIcon, deleteIcon, editIcon, lessIcon, moreIcon, onAirIcon, startIcon, watchedIcon} from "../../data/JunkIcons.tsx";
import Button from "react-bootstrap/Button";
import EditWatchCardForm from "./forms/EditWatchCardForm.tsx";
import {changeWatch, deleteWatch} from "../../services/DevDataApiHandlers.tsx";
import Col from "react-bootstrap/Col";
import {random} from "lodash-es";
import AddToWatchCardForm from "./forms/AddToWatchCardForm.tsx";
import LinkWithTooltip from "./LinkWithTooltip.tsx";

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

    const stations = [
        {
            image: "amazon.jpg",
            addresses: ["amazon"]
        },
        {
            image: "ard.jpg",
            addresses: ["ardmediathek"]
        },
        {
            image: "arte.jpg",
            addresses: ["arte"]
        },
        {
            image: "disney.jpg",
            addresses: ["disneyplus"]
        },
        {
            image: "joyn.jpg",
            addresses: ["joyn"]
        },
        {
            image: "netflix.jpg",
            addresses: ["netflix"]
        },
        {
            image: "rtl.jpg",
            addresses: ["rtl"]
        },
        {
            image: "sky.jpg",
            addresses: ["sky"]
        },
        {
            image: "spotify.jpg",
            addresses: ["spotify"]
        },
        {
            image: "twitch.jpg",
            addresses: ["twitch"]
        },
        {
            image: "youtube.jpg",
            addresses: ["youtube", "youtu"]
        },
        {
            image: "zdf.jpg",
            addresses: ["zdf"]
        }
    ]

    function getImageForLink(watch: ToWatch) {
        const a = document.createElement('a');
        a.setAttribute('href', watch.link);
        const image = stations.find((station) => {
            return station.addresses.some((address) => {
                return a.hostname.includes(address);
            });
        })?.image;
        return image === undefined
            ? startIcon
            : (<img key={`image-${watch.id}`} src={new URL(`/src/assets/logos/${image}`, import.meta.url).href} style={{maxHeight: 24}}/>);
    }

    const key = random(0, 9999)
    return (
        <Col key={`col-${key}`} style={{marginBottom: 10}}>
            <Card style={{minWidth: expanded ? '25rem' : '18rem', minHeight: expanded ? '15rem' : '10rem'}} key={`card-${key}`}>
                <Card.Body key={`body-${key}`}>
                    {collection !== undefined && <Card.Title key={`title-${key}`}>{title}</Card.Title>}
                    {collection === undefined && <Card.Title key={`title-${key}`} style={{opacity: '10%'}}>No Collection</Card.Title>}
                    <ListGroup.Item key={`button-${key}`} action onClick={() => setExp(!exp)}>{exp ? lessIcon : moreIcon}{' '}{exp ? 'less' : 'more'}</ListGroup.Item>
                    <Collapse key={`collapse-${key}`} in={exp}>
                        <ListGroup key={`list-group-${key}`}>
                            {watches.map((watch, index) =>
                                <div key={index}>
                                    <InputGroup key={`group-${watch.id}-${index}`}>
                                        <InputGroup.Text key={`start-${watch.id}-${index}`} onClick={() => onClickWatch(watch)} style={{padding: 0}}>{getImageForLink(watch)}</InputGroup.Text>
                                        <LinkWithTooltip junk={watch}/>
                                        <Button type="button" variant="outline-secondary" name={`form-edit-${watch.id}`} key={`form-edit-${watch.id}-${index}`} onClick={() => toggleEditForm(index)}>{editIcon}</Button>
                                        {expanded && <Button type="button" variant="outline-secondary" name={`form-watched-${watch.id}`} key={`form-watched-${watch.id}-${index}`} onClick={() => handleWatched(watch)}>{watchedIcon}</Button>}
                                        {!expanded && <Button type="button" variant="outline-secondary" name={`form-watch-${watch.id}`} key={`form-watch-${watch.id}-${index}`} onClick={() => handleWatch(watch)}>{onAirIcon}</Button>}
                                        {!expanded && <Button type="button" variant="outline-secondary" name={`form-delete-${watch.id}`} key={`form-delete-${watch.id}-${index}`} onClick={() => handleDelete(watch)}>{deleteIcon}</Button>}
                                    </InputGroup>
                                    <EditWatchCardForm key={`edit-${key}-${watch.id}`} watch={watch} showEditForm={showEdit[index]} toggleEditForm={() => toggleEditForm(index)} editWatch={editWatch}/>
                                </div>
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
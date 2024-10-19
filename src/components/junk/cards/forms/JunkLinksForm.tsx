import * as React from "react";
import {useState} from "react";
import {InputGroup, ListGroup} from "react-bootstrap";
import {JunkLink, useJunkContext} from "../../../../contexts/ProgramContext";
import {addIcon, deleteIcon, editIcon, openIcon, saveIcon} from "../../../../data/JunkIcons";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {changeProgram} from "../../../../services/DevDataApiHandlers";

function JunkLinksForm() {
    const {junk, setJunk} = useJunkContext();
    const [edit, setEdit] = useState<boolean>(false);

    const [linksState, setLinksState] = useState<JunkLink[]>(junk.links);

    function handleAddLink(): void {
        const links = [...linksState];
        links.push({
            alwaysShow: false,
            junklink: ""
        });
        setLinksState(links);
    }

    function handleToggleAlwaysShow(i: number): void {
        const links = [...linksState];
        links[i] = {
            alwaysShow: !links[i].alwaysShow,
            junklink: links[i].junklink
        };
        setLinksState(links);
    }

    function handleChangeLink(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, i: number): void {
        const links = [...linksState];
        links[i] = {
            alwaysShow: links[i].alwaysShow,
            junklink: event.currentTarget.value
        };
        setLinksState(links);
    }

    function handleDeleteLink(i: number): void {
        const links = linksState.filter((_value, index) => i !== index);
        setLinksState(links);
    }

    async function handleSubmit(event: React.MouseEvent<HTMLButtonElement>): Promise<void> {
        event.preventDefault();
        const newLinks = await changeProgram({...junk, links: linksState});
        setJunk(newLinks);
        setEdit(false);
    }

    const editJunkLinks =
        <Form>
            <ListGroup>
                {linksState.map((link, i) =>
                    <InputGroup key={`${i}`}>
                        <InputGroup.Checkbox type="checkbox" key={`form-link-checkbox-${i}`} defaultChecked={linksState[i].alwaysShow} onChange={() => handleToggleAlwaysShow(i)}/>
                        <Form.Control type="url" key={`form-link-${i}`} defaultValue={linksState[i].junklink} onChange={(event) => handleChangeLink(event, i)} required/>
                        <Button type="button" variant="outline-secondary" name={`form-button-${i}`} key={`form-button-${i}`} href={link.junklink} onClick={() => window.open(link.junklink, "_blank")}>{openIcon}</Button>
                        <Button type="button" variant="outline-secondary" name={`form-delete-${i}`} key={`form-delete-${i}`} onClick={() => handleDeleteLink(i)}>{deleteIcon}</Button>
                    </InputGroup>
                )}
                <ListGroup horizontal>
                    <ListGroup.Item action as='button' variant="outline-secondary" type="button" key="addLinkButton" name="addLinkButton" onClick={handleAddLink}>
                        {addIcon}{' '}Add Link
                    </ListGroup.Item>
                    <ListGroup.Item action as='button' variant="outline-secondary" type="submit" key="submitLinksButton" name="submitLinksButton" onClick={handleSubmit}>
                        {saveIcon}{' '}Save Links
                    </ListGroup.Item>
                </ListGroup>
            </ListGroup>
        </Form>;

    const showJunkLinks =
        <ListGroup>
            {linksState.map((link, i) =>
                <ListGroup key={`links-${i}`}  horizontal>
                    <InputGroup.Checkbox type="checkbox" key={`form-link-checkbox-${i}`} name={`form-link-checkbox-${i}`} checked={link.alwaysShow} readOnly/>
                    <ListGroup.Item action key={`links-${i}`} onClick={() => window.open(link.junklink, "_blank")}>
                        {link.junklink}
                    </ListGroup.Item>
                </ListGroup>
            )}
            <ListGroup.Item action key="editLinksButton" onClick={() => setEdit(true)}>
                {editIcon}{' '}Edit links
            </ListGroup.Item>
        </ListGroup>;

    return (<>
        {edit && editJunkLinks}
        {!edit && showJunkLinks}
    </>);
}

export default JunkLinksForm;
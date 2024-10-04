import {useContext, useState} from "react";
import {InputGroup, ListGroup} from "react-bootstrap";
import {ProgramContext} from "../../../../contexts/ProgramContext";
import {addIcon, deleteIcon, editIcon, openIcon, saveIcon} from "../../../../data/JunkIcons";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import {changeProgram} from "../../../../services/DevDataApiHandlers";

function JunkLinksForm() {
    const [program, setProgram] = useContext(ProgramContext);
    const [edit, setEdit] = useState(false);

    const [linksState, setLinksState] = useState(program.links);

    function handleAddLink() {
        const links = [...linksState];
        links.push("");
        setLinksState(links);
    }

    function handleChangeLink(event, i) {
        const links = [...linksState];
        links[i] = event.currentTarget.value;
        setLinksState(links);
    }

    function handleDeleteLink(i) {
        const links = linksState.filter((value, index) => i !== index);
        setLinksState(links);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const newLinks = await changeProgram({...program, links: linksState});
        setProgram(newLinks);
        setEdit(false);
    }

    const editJunkLinks =
        <Form>
            {linksState.map((link, i) =>
                <Row key={`${i}`}>
                    <Col key={`${i}`}>
                        <InputGroup key={`${i}`}>
                            <Form.Control type="url" key={`form-link-${i}`} defaultValue={linksState[i]} onChange={(event) => handleChangeLink(event, i)} required/>
                            <Button type="button" variant="outline-secondary" name={`form-button-${i}`} key={`form-button-${i}`} onClick={() => window.open(link, "_blank")}>{openIcon}</Button>
                            <Button type="button" variant="outline-secondary" name={`form-delete-${i}`} key={`form-delete-${i}`} onClick={() => handleDeleteLink(i)}>{deleteIcon}</Button>
                        </InputGroup>
                    </Col>
                </Row>
            )}
            <Container className="justify-content-start m-1">
                <Row key="button-row" xs="auto">
                    <Col key="button-col-add">
                        <Button variant="outline-secondary" type="button" key="addLinkButton" onClick={handleAddLink}>
                            {addIcon}
                        </Button>
                    </Col>
                    <Col key="button-col-save">
                        <Button variant="outline-secondary" type="submit" key="submitLinksButton" onClick={handleSubmit}>
                            {saveIcon}
                        </Button>
                    </Col>
                </Row>
            </Container>
        </Form>;

    const showJunkLinks =
        <ListGroup>
            {linksState.map((link, i) =>
                <ListGroup.Item action as='button' key={`links-${i}`} onClick={() => window.open(link, "_blank")}>
                    {link}
                </ListGroup.Item>
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
import {useState} from "react";
import {lessIcon, moreIcon} from "../../../data/JunkIcons";
import SeasonsForm from "./forms/SeasonsForm";
import JunkLinksForm from "./forms/JunkLinksForm";
import Button from "react-bootstrap/Button";
import JunkNotesForm from "./forms/JunkNotesForm";
import {Collapse} from "react-bootstrap";
import AlwaysShowForm from "./forms/AlwaysShowForm.tsx";

function CollapseJunkCardBody() {
    const [expanded, setExpanded] = useState<boolean>(false);

    return (
        <>
            <Collapse in={!expanded}>
                <div id="collapse-content" key="collapse-content" data-testid="collapse-content-always">
                    <AlwaysShowForm/>
                </div>
            </Collapse>
            <Button type="button" variant="link" area-controls="collapse-content" onClick={() => setExpanded(!expanded)} style={{marginTop:2, marginBottom:2, padding: 0}}>
                {expanded ? lessIcon : moreIcon}{' '}{expanded ? 'less' : 'more'}
            </Button>
            <Collapse in={expanded}>
                <div id="collapse-content" key="collapse-content" data-testid="collapse-content">
                    <SeasonsForm/>
                    <JunkLinksForm/>
                    <br/>
                    <JunkNotesForm/>
                </div>
            </Collapse>
        </>
    );
}

export default CollapseJunkCardBody;
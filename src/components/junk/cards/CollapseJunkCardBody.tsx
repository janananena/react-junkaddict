import {useState} from "react";
import {lessIcon, moreIcon} from "../../../data/JunkIcons";
import SeasonsForm from "./forms/SeasonsForm";
import JunkLinksForm from "./forms/JunkLinksForm";
import Button from "react-bootstrap/Button";
import JunkNotesForm from "./forms/JunkNotesForm";
import {Collapse} from "react-bootstrap";

function CollapseJunkCardBody() {
    const [expanded, setExpanded] = useState<boolean>(false);

    return (
        <>
            <Button type="button" variant="link" area-controls="collapse-content" onClick={() => setExpanded(!expanded)}>
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
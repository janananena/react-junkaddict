import {Form, OverlayTrigger, Tooltip} from "react-bootstrap";
import {ToWatch} from "../../contexts/WatchListContext.tsx";

interface LinkWithTooltipProps {
    junk: ToWatch
}

function LinkWithTooltip({junk}: LinkWithTooltipProps) {

    function onClickWatch(watch: ToWatch): void {
        window.open(watch.link, "_blank");
    }

    return (
        <OverlayTrigger key={`overlay-${junk.id}`} placement="auto"
                        delay={{show: 250, hide: 400}}
                        overlay={(props) =>
                            <Tooltip {...props} key={junk.id} id={junk.id}>
                                {junk.label ? junk.label : junk.link}
                            </Tooltip>
                        }>
            <Form.Control key={`link-${junk.id}`} readOnly
                          value={junk.label ? junk.label : junk.link}
                          onClick={() => onClickWatch(junk)}/>
        </OverlayTrigger>
    );
}

export default LinkWithTooltip;
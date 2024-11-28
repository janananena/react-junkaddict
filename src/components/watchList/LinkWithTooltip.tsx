import {Form, OverlayTrigger, Tooltip} from "react-bootstrap";
import {ToWatch} from "../../contexts/WatchListContext.tsx";

interface LinkWithTooltipProps {
    junk: ToWatch,
    dangerDays: number,
    warningDays: number,
}

function LinkWithTooltip({junk, dangerDays, warningDays}: LinkWithTooltipProps) {

    function onClickWatch(watch: ToWatch): void {
        window.open(watch.link, "_blank");
    }

    function endsSoonClassName(watch: ToWatch): string | undefined {
        if (watch.seen) {
            return undefined;
        }
        if (watch.availableUntil == null) {
            return "border-info-subtle";
        }
        const endDate = new Date(Date.parse(watch.availableUntil!));
        const today = new Date();
        // @ts-expect-error works :)
        const diffTime = Math.abs(today - endDate);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        return diffDays < dangerDays
            ? "bg-danger-subtle"
            : diffDays < warningDays
                ? "bg-warning-subtle"
                : undefined;
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
                          onClick={() => onClickWatch(junk)}
                          className={endsSoonClassName(junk)}
            />
        </OverlayTrigger>
    );
}

export default LinkWithTooltip;
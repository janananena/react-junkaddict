import {ToWatch} from "../../contexts/WatchListContext.tsx";
import WatchCard from "./WatchCard.tsx";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import {random} from "lodash-es";

interface ToWatchCardsProps {
    expanded: boolean,
    watches: ToWatch[],
    addWatch: (watch: ToWatch) => void,
    editWatch: (watch: ToWatch) => void,
    removeWatch: (watch: ToWatch) => void,
    dangerDays: number,
    warningDays: number,
}

function sameCollection(collection: string | undefined, watch: ToWatch) {
    return collection === watch.collection?.toLowerCase();
}

function WatchCards({expanded, watches, addWatch, editWatch, removeWatch, dangerDays, warningDays}: ToWatchCardsProps) {

    const noCollectionWatches = watches.filter((w) => w.collection === null);
    const collections = new Set(watches.filter((w) => w.collection !== null).map((w) => w.collection?.toLowerCase()));
    const collectionMap = new Map();
    collections.forEach((value) => collectionMap.set(value, watches.filter((watch) => sameCollection(value ? value : undefined, watch))));

    const noCollectionCard = noCollectionWatches.length > 0 ? <WatchCard key="no-collection-watch" removeWatch={removeWatch} addWatch={addWatch} editWatch={editWatch} expanded={expanded} collection={undefined} watches={noCollectionWatches} dangerDays={dangerDays} warningDays={warningDays} /> : <></>;
    const cards = Array.from(collectionMap).map(([c, ws]) => {
        return ws.length > 0 ? <WatchCard key={`collection-watch-${c}`} removeWatch={removeWatch} addWatch={addWatch} editWatch={editWatch} expanded={expanded} collection={c} watches={ws} dangerDays={dangerDays} warningDays={warningDays} /> : <></>;
    });

    return (
        <Container fluid key={random(0,9999)} >
            <Row key={random(0, 9999)}>
                {noCollectionCard}
                {cards}
            </Row>
        </Container>
    );
}

export default WatchCards;
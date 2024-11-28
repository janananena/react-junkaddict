import {useEffect, useState} from "react";
import {ToWatch} from "../contexts/WatchListContext";
import {getWatchList} from "../services/DevDataApiHandlers";
import WatchCards from "../components/watchList/WatchCards";
import WatchListNavbar from "../components/watchList/WatchListNavbar";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";

interface WatchListPageProps {
    setView: (view: 'junk' | 'watches') => void
}

function WatchListPage({setView}: WatchListPageProps) {
    const [watches, setWatches] = useState<ToWatch[]>([]);
    const [searchString, setSearchString] = useState<string>('');
    const [warningDays, setWarningDays] = useState<number>(14);
    const [dangerDays, setDangerDays] = useState<number>(5);

    async function getWatches(): Promise<void> {
        const res = await getWatchList();
        setWatches(res);
    }

    useEffect(() => {
        getWatches().then();
    }, [])

    function addNewWatch(watch: ToWatch): void {
        setWatches([...watches, watch]);
    }

    function editWatch(watch: ToWatch): void {
        setWatches(watches.map((w) => w.id === watch.id ? watch : w));
    }

    function removeWatch(watch: ToWatch): void {
        setWatches(watches.filter((w) => w.id !== watch.id));
    }

    const displayWatches = watches.filter((w) => {
        return w.link?.toLowerCase().includes(searchString.toLowerCase())
            || w.label?.toLowerCase().includes(searchString.toLowerCase())
            || w.collection?.toLowerCase().includes(searchString.toLowerCase());
    })

    const toWatchList = displayWatches.filter((watch) => {
        return !watch.seen;
    });
    const watchedList = displayWatches.filter((watch) => {
        return watch.seen;
    });

    return (
        <>
            <WatchListNavbar watches={watches} setWatches={setWatches} addNewWatch={addNewWatch} setView={setView} searchString={searchString} setSearchString={setSearchString} dangerDays={dangerDays} setDangerDays={setDangerDays} warningDays={warningDays} setWarningDays={setWarningDays}/>
            <Card>
                <Card.Body>
                    <Table borderless striped="columns" style={{height: '100vh'}}>
                        <thead>
                        <tr>
                            <td style={{width: "70%"}}>
                                <h5>Watch Us</h5>
                            </td>
                            <td>
                                <h5>Watched</h5>
                            </td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>
                                <WatchCards expanded={true} watches={toWatchList} addWatch={addNewWatch} editWatch={editWatch} removeWatch={removeWatch} dangerDays={dangerDays} warningDays={warningDays} />
                            </td>
                            <td>
                                <WatchCards expanded={false} watches={watchedList} addWatch={addNewWatch} editWatch={editWatch} removeWatch={removeWatch} dangerDays={dangerDays} warningDays={warningDays} />
                            </td>
                        </tr>
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </>);
}

export default WatchListPage;
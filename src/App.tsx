import './App.css';
import JunkTablePage from "./pages/JunkTablePage";
import Container from "react-bootstrap/Container";
import {useState} from "react";
import WatchListPage from "./pages/WatchListPage.tsx";

function App() {
    const [view, setView] = useState<'junk'|'watches'>('junk');

    return (
        <Container fluid>
            {view === 'junk' && <JunkTablePage setView={setView}/>}
            {view === 'watches' && <WatchListPage setView={setView}/>}
        </Container>
    );
}

export default App;

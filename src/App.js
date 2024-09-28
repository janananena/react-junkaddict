import './App.css';
import JunkTablePage from "./pages/JunkTablePage";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

function App() {
    return (
        <Container fluid>
            <Navbar expand="md">
                <Navbar.Brand href="#home">Reality Stundenplan</Navbar.Brand>
            </Navbar>
            <JunkTablePage/>
        </Container>
    );
}

export default App;

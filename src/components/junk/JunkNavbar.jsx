import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {useState} from "react";
import {Image} from "react-bootstrap";

function JunkNavbar() {
    const [theme, setTheme] = useState('darkMode');

    const darkMode = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-moon-stars-fill" viewBox="0 0 16 16">
        <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278"/>
        <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.73 1.73 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.73 1.73 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.73 1.73 0 0 0 1.097-1.097zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z"/>
    </svg>;

    const lightMode = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-brightness-high-fill" viewBox="0 0 16 16">
        <path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/>
    </svg>;

    function handleTheme() {
        if (theme === 'lightMode') {
            document.documentElement.setAttribute('data-bs-theme', 'dark');
            setTheme('darkMode');
        } else {
            document.documentElement.setAttribute('data-bs-theme', 'light');
            setTheme('lightMode');
        }
    }

    const junk = <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 192.756 192.756">
        <g fill-rule="evenodd" clip-rule="evenodd">
            <path fill="#ef9af5" d="M7.062 166.932h177.311V25.56H7.062v141.372z"/>
            <path d="M180.145 19.747H12.876A10.037 10.037 0 0 0 2.834 29.789v133.444c0 5.549 4.492 9.777 10.042 9.777h167.268c5.285 0 9.777-4.229 9.777-9.777V29.788c.001-5.549-4.491-10.041-9.776-10.041zM13.668 30.052h165.683v132.387H13.668V30.052z" fill="#272727"/>
            <path fill="#540759"
                  d="M54.891 51.72h6.078v-6.077h-6.078v-5.814h6.607v-6.606H45.643v32.238h16.383v-6.606h-7.135V51.72zM102.721 33.223h-9.514v32.238h15.855v-6.077h-6.341V33.223zM113.025 65.461h9.514V33.223h-9.514v32.238zM126.238 39.829h5.813v25.632h9.777V39.829h5.549v-6.606h-21.139v6.606zM164.289 33.223l-2.377 13.213-2.642-13.213h-9.25l6.871 20.083v12.155h9.513V53.306l6.869-20.083h-8.984zM80.259 33.223H70.218l-4.493 32.238h9.513l.528-5.813h3.171l.528 5.813h9.513l-4.492-32.238h-4.227zm-4.228 20.876l1.321-15.326 1.321 15.326h-2.642zM34.809 33.223H18.425v32.238h9.513V50.399h1.586c1.057 0 1.85.792 1.85 1.85v13.212h8.984V52.513c0-2.114-1.85-3.964-4.228-3.964 2.378-.528 4.228-2.906 4.228-5.549v-3.436-.528c0-3.17-2.379-5.813-5.549-5.813zm-6.871 5.285h1.85c1.057 0 1.85.793 1.85 1.85v3.436c0 1.057-.792 1.85-1.85 1.85h-1.85v-7.136zM18.425 86.865h18.497v70.555h31.182V86.865h18.497V69.161H18.425v17.704zM141.828 69.161l-6.869 71.347-7.135-71.347H96.378l15.061 88.259h46.774l15.06-88.259h-31.445z"/>
        </g>
    </svg>;

    return (<Navbar expand="md">
        <Container fluid>
            <Nav>
                <Navbar.Brand href="#home">
                    {junk}{' '}
                    Reality Stundenplan</Navbar.Brand>
            </Nav>
            <Nav className="justify-content-end">
                <Nav.Link onClick={handleTheme}>
                    {theme === 'darkMode' && darkMode}
                    {theme === 'lightMode' && lightMode}
                </Nav.Link>
            </Nav>
        </Container>
    </Navbar>);
}

export default JunkNavbar;
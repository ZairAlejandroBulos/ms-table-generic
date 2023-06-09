import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

function Navigation(): JSX.Element {
    return (
        <Navbar bg="dark" variant="dark" fixed="top" className="mb-5">
            <Container>
                <Navbar.Brand>Table Generic</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Item>
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={Link} to="/provincias">Provincia</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={Link} to="/contactos">Agenda</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default Navigation;
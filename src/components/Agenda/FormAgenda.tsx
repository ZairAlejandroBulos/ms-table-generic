import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from "react-bootstrap";

import { Agenda } from "../../types/Agenda";
import { findAgendaById, saveAgenda, updateAgenda } from "../../services/AgendaService";

function FormAgenda(): JSX.Element {
    const [contacto, setContacto] = useState<Agenda | null>(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            getContacto(id);
        }
    }, [id]);

    const getContacto = async (id: string) => {
        const newContacto = await findAgendaById(id);
        if (newContacto) {
            setContacto(newContacto);
        } else {
            setContacto(
                {
                    "fotourl": "",
                    "apellido": "",
                    "nombre": "",
                    "telefono": "",
                    "email": ""
                }
            ); 
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setContacto(
            prevState => prevState 
            ? 
            {
                ...prevState,
                [name]: value
            } 
            :
            null
        );
    };

    const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (contacto) {
            if (contacto.id && contacto.id !== "0") {
                console.log("Update " + contacto);
                await updateAgenda(contacto);
            } else {
                console.log("Save " + contacto);
                await saveAgenda(contacto);
            }
            navigate("/contactos");
        }
    };

    return(
        <Container style={{ marginTop: "100px" }}>
            <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                    <Form.Label>Foto</Form.Label>
                    <Form.Control 
                        type="text"
                        name="fotourl"
                        placeholder="Apellido"
                        onChange={handleChange}
                        defaultValue={contacto?.fotourl}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control 
                        type="text"
                        name="apellido"
                        placeholder="Apellido"
                        onChange={handleChange}
                        defaultValue={contacto?.apellido}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control 
                        type="text"
                        name="nombre"
                        placeholder="Nombre" 
                        onChange={handleChange}
                        defaultValue={contacto?.nombre}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Teléfono</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="telefono"
                        placeholder="Teléfono" 
                        onChange={handleChange}
                        defaultValue={contacto?.telefono}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email" 
                        name="email"
                        placeholder="Email" 
                        onChange={handleChange} 
                        defaultValue={contacto?.email}
                    />
                </Form.Group>

                <Button type="submit" variant="primary">
                    Guardar
                </Button>
            </Form>
        </Container>
    )
}

export default FormAgenda;
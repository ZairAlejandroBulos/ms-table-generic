import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";

import { Provincia } from "../../types/Provincia";
import { findProvinciaById } from "../../services/ProvinciaService";

function DetalleProvincia(): JSX.Element {
    const { id } = useParams();
    let provinciaId: number;
    const [provincia, setProvincia] = useState<Provincia>();

    useEffect(() => {
        getProvinciaById();
    }, [id]);

    const getProvinciaById = async () => {
        if (id) {
            provinciaId = Number(id);
            const newProvincia = await findProvinciaById(provinciaId);
            setProvincia(newProvincia);
        }
    };

    return (
        <Container style={{ marginTop: "100px"}}>
            <Row>
                <Col>
                    <Row>Provincia</Row>
                    <Row>Abreviatura</Row>
                    <Row>Capital</Row>
                    <Row>Bandera</Row>
                    <Row>Población</Row>
                    <Row>Superficie</Row>
                    <Row>Nº Departamentos</Row>
                </Col>
                <Col>
                    <Row>{ provincia?.nombre }</Row>
                    <Row>{ provincia?.abreviatura }</Row>
                    <Row>{ provincia?.capital}</Row>
                    <Row>{ provincia?.bandera }</Row>
                    <Row>{ provincia?.poblacion }</Row>
                    <Row>{ provincia?.superficie }</Row>
                    <Row>{ provincia?.nroDepartamentos }</Row>
                </Col>
            </Row>
        </Container>
    );
}

export default DetalleProvincia;
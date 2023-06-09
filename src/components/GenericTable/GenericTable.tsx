import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Table, Button } from "react-bootstrap";

import { TableProps } from "../../types/Table";

function GenericTable<T>({ data, cols, actions, onView, onCreate, onUpdate, onDelete, customSearch }: TableProps<T>): JSX.Element  {
    const [search, setSearch] = useState<string>("");    
    const [filteredData , setFilteredData ] = useState<T[]>(data);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        let isMounted = true;
        
        handleSearch(isMounted);
        
        return () => {
            isMounted = false;
        };
    }, [search, data, customSearch]);

    const handleSearch = async (isMounted: boolean) => {
        if (customSearch) {
            setIsLoading(true);

            const newFilteredData = await customSearch(search);
            
            if (isMounted) {
                setFilteredData(newFilteredData);
                setIsLoading(false);
            }
        } else {
            setFilteredData(
                data.filter((item) => defaultSearch(item, search))
            );
        }
    };

    const defaultSearch = (item: T, search: string): boolean => {
        return cols.some((col) => {
            const value = item[col.field];
            return typeof value === 'string' && value.toLowerCase().includes(search.toLowerCase());
        });
    };

    const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSearch = event.target.value;
        setSearch(newSearch);
    };

    const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (customSearch) {
            setIsLoading(true);

            const newFilteredData = await customSearch(search);
            setFilteredData(newFilteredData);

            setIsLoading(false);
        }
    };

    return(
        <Container className="mt-5">
            <Row className="align-item-center">
                <Col sm={6}>
                    {
                        actions.create &&
                        <Button onClick={onCreate} variant="outline-light" >
                            <i className="bi bi-plus-square"></i>
                        </Button>
                    }
                </Col>

                <Col sm={6}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3 d-flex">
                            <Form.Control 
                                type="text"
                                placeholder="Search..." 
                                value={search}
                                onChange={handleChangeSearch}
                                style={{ backgroundColor: "ghostwhite" }}
                            />
                            <Button variant="outline-secondary">
                                <i className="bi bi-search"></i>
                            </Button>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>

            <Table responsive bordered hover variant="dark">
                <thead>
                    <tr>
                        {
                            cols.map((col, index) => (
                                <th key={index}>
                                    { col.title }
                                </th>
                            ))
                        }
                        {
                            (
                                actions.view ||
                                actions.update ||
                                actions.delete 
                            )
                            &&
                            <th>
                               Acciones
                            </th>
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredData.map((item, index) => (
                            <tr key={index}>
                                {
                                    cols.map((col, i) => (
                                        <td key={i}>
                                            {
                                                col.render 
                                                ?
                                                col.render(item)
                                                :
                                                String(item[col.field])
                                            }
                                        </td>
                                    ))
                                }
                                <td>
                                    {
                                        actions.view &&
                                        <Button onClick={() => onView!(item)} variant="outline-info" className='mx-2'>
                                            <i className="bi bi-eye"></i>
                                        </Button>
                                    }
                                    {
                                        actions.update &&
                                        <Button onClick={() => onUpdate!(item)} variant="outline-warning" className='mx-2'>
                                            <i className="bi bi-pencil-fill"></i>
                                        </Button>
                                    }
                                    {
                                        actions.delete &&
                                        <Button onClick={() => onDelete!(item)} variant="outline-danger" className='mx-2'>
                                            <i className="bi bi-trash3"></i>
                                        </Button>
                                    }
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </Container>
    );
}

export default GenericTable;
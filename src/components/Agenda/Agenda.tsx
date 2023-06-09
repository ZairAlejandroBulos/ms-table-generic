import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import { Agenda } from "../../types/Agenda";
import GenericTable from "../GenericTable/GenericTable";
import { deleteAgenda, findAllAgenda } from "../../services/AgendaService";

function TableAgenda(): JSX.Element {
    const [contactos, setContactos] = useState<Agenda[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllContactos();
    }, []);

    const getAllContactos = async () => {
        const newProvincias = await findAllAgenda();
        setContactos(newProvincias);
    };

    const handleCreate = () => {
        navigate('/contacto/-1');
    };

    const handleUpdate = (contacto: Agenda) => {
        navigate(`/contacto/${contacto.id}`);
    };

    const handleDelete = async (contacto: Agenda) => {
        if (!window.confirm("¿Está seguro que desea eliminar el contacto?")) return;
        await deleteAgenda(contacto.id);
        setContactos(contactos.filter(item => item.id !== contacto.id));
    };

    return(
        <GenericTable 
            data={contactos}
            cols={[
                { field: 'nombre', title: 'Nombre', width: 3 },
                { field: 'apellido', title: 'Apellido', width: 3 },
                { field: 'email', title: 'Email', width: 3 },
            ]}
            actions={{
                view: false,
                create: true,
                update: true,
                delete: true,
            }}
            onCreate={handleCreate}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
        />
    );
}

export default TableAgenda;
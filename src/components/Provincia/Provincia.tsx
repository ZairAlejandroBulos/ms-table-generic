import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import { Provincia } from "../../types/Provincia";
import GenericTable from "../GenericTable/GenericTable";
import { findAllProvincia, findProvinciaByTermino } from "../../services/ProvinciaService";

function TableProvincia(): JSX.Element {
    const [provincias, setProvincias] = useState<Provincia[]>([]);
    const [filteredProvincias, setFilteredProvincias] = useState<Provincia[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (provincias.length === 0) {
            getAllProvincias();
        }
    }, [provincias]);

    const getAllProvincias = async () => {
        const newProvincias = await findAllProvincia();
        setProvincias(newProvincias);
        setFilteredProvincias(newProvincias);
    };

    const getProvinciasByTermino = async (termino: string) => {
        if (termino.trim() === "") {
            return provincias;
        }
         
        const newFilteredProvincias = await findProvinciaByTermino(termino);
        return newFilteredProvincias;
    };

    const handleView = (provincia: Provincia) => {
        navigate(`/provincia/${provincia.id}`);
    };

    return(
        <GenericTable 
            data={filteredProvincias}
            cols={[
                { field: 'nombre', title: 'Nombre', width: 3 },
                { field: 'capital', title: 'Capital', width: 3 },
                { field: 'bandera', title: 'Bandera', width: 3, render: (row: Provincia) =>
                    <img src={row.bandera} alt={row.nombre} className="img-fluid w-50" /> 
                },
            ]}
            actions={{
                view: true,
                create: false,
                update: false,
                delete: false,
            }}
            onView={handleView}
            customSearch={getProvinciasByTermino}
        />
    );
}

export default TableProvincia;
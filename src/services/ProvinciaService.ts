import { API_PROVINCIA } from "../constants";
import { Provincia } from "../types/Provincia";

export async function findAllProvincia() {
    const response = await fetch(`${API_PROVINCIA}/get_provincias.php`, {
        method: "GET"
    });

    const data = await response.json() as Provincia[];
    return data;
}

export async function findProvinciaById(id: number) {
    const response = await fetch(`${API_PROVINCIA}/get_provincia.php?id=${id}`, {
        method: "GET"
    });

    const data = await response.json() as Provincia;
    return data;
}

export async function findProvinciaByTermino(termino: string) {
    const response = await fetch(`${API_PROVINCIA}/get_provincias.php?nombre=${termino}`, {
        method: "GET"
    });

    const data = await response.json() as Provincia[];
    return data;
}
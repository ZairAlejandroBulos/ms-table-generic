import { API_AGENDA } from "../constants";
import { Agenda } from "../types/Agenda";

export async function findAllAgenda() {
    const response = await fetch(`${API_AGENDA}/get_contactos.php`);
    const data = await response.json() as Agenda[];
    return data;
}

export async function findAgendaById(id: string) {
    const data = await findAllAgenda();
    return data.find(item => String(item.id) === id) || null;
}

export async function findAgendaByIndice(indice: string) {
    const response = await fetch(`${API_AGENDA}/get_contactos.php?indice=${indice}`);
    const data = await response.json() as Agenda[];
    return data;
}

export async function saveAgenda(entity: Agenda) {
    try {
        const response = await fetch(`${API_AGENDA}/post_contacto.php`, {
            method: "POST",
            body: JSON.stringify(entity)
        });
        
        const data = await response.json() as Agenda;
        return data;
    } catch (error) {
        console.log(error);
    }
}

export async function updateAgenda(entity: Agenda) {
    try {
        const response = await fetch(`${API_AGENDA}/put_contacto.php`, {
            method: "PUT",
            body: JSON.stringify(entity)
        });
        
        const data = await response.json() as Agenda[];
        return data;
    } catch (error) {
        console.log(error);
    }
}

export async function deleteAgenda(id: string) {
    try {
        await fetch(`${API_AGENDA}/delete_contacto.php?id=${id}`, {
            method: "DELETE"
        });
    } catch (error) {
        console.log(error);
    }
}
import Navigation from "../components/Navigation/Navigation";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Page404 from "../pages/404/404";
import TableProvincia from "../components/Provincia/Provincia";
import DetalleProvincia from "../components/Provincia/DetalleProvincia";
import TableAgenda from "../components/Agenda/Agenda";
import FormAgenda from "../components/Agenda/FormAgenda";

function IndexRouter(): JSX.Element {
    return(
        <>
            <BrowserRouter>
                <Navigation />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/provincias" element={<TableProvincia />} />
                    <Route path="/provincia">
                        <Route path=":id" element={<DetalleProvincia />} />
                    </Route>
                    <Route path="/contactos" element={<TableAgenda />} />
                    <Route path="/contacto">
                        <Route path=":id" element={<FormAgenda />} />
                    </Route>
                    <Route path="*" element={<Page404 />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default IndexRouter;
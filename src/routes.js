import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Filme from "./components/Filme";
import Header from "./components/Header";
import Erro from "./components/Erro";

function RoutesApp(){
    return(
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={ <Home/> }/>
                <Route path="/filme/:id" element={ <Filme/>} />
                <Route path="*" element={ <Erro/> } />
            </Routes>
        </BrowserRouter>
    );
}

export default RoutesApp;
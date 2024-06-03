import './App.css';
import React from "react";
import Dashboard from "./pages/Dashboard";
import Calendario from "./pages/Tela_Calendario"
import Erro from "./pages/Erro"
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Professores from "./pages/Tela_professores";
import Cursos from "./pages/Tela_Cursos"
import Salas from "./pages/Tela_Salas"
import Alunos from "./pages/Tela_Alunos"
import Login from "./pages/Login"
import Cadastro from "./pages/Cadastro"
import Feriados from "./pages/Feriados"
import Reposicao from "./pages/Reposicoes"
import {DadosProvider} from "./contexts/context";
function App() {
  return (
    <div className="App">
        <DadosProvider>
            <BrowserRouter>
                <Routes>
                    <Route element={<Calendario />}  path="/Calendario" exact />
                    <Route element={<Dashboard />}  path="/Dashboard" />
                    <Route element={<Professores />} path="/Professores" />
                    <Route element={<Cursos />} path="/Cursos" />
                    <Route element={<Salas />} path="/Salas" />
                    <Route element={<Alunos />} path="/Alunos" />
                    <Route element={<Login />} path="/" />
                    <Route element={<Cadastro />} path="/Cadastro" />
                    <Route element={<Feriados />} path="/Feriados" />
                    <Route element={<Reposicao />} path="/Reposicao" />
                    <Route element={<Erro />}  path="*" />
                </Routes>
            </BrowserRouter>
        </DadosProvider>
    </div>
  );
}
export default App;

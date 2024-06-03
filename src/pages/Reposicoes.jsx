import Header from "../components/Header";
import css from "./Feriados.module.css";
import Modal from "react-modal";
import {useEffect, useState} from "react";
import { HiArchiveBoxXMark } from "react-icons/hi2";

Modal.setAppElement("#root");

export default function Reposicoes() {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [reposicoes, setReposicoes] = useState([]);
    const [novaReposicao, setNovaReposicao] = useState({
        nome: "",
        data: "",
    });
    const [expandedIndex, setExpandedIndex] = useState(null);


    setReposicoes()
    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    function handleInputChange(event) {
        const { name, value } = event.target;
        setNovaReposicao({ ...novaReposicao, [name]: value });
    }

    function handleCadastrarReposicao() {
        if (novaReposicao.nome.trim() === "" || novaReposicao.data.trim() === "") {
            alert("Todos os campos precisam ser preenchidos!");
            return;
        }

        setReposicoes([...reposicoes, novaReposicao]);
        setNovaReposicao({
            nome: "",
            data: "",
        });
        closeModal();
    }

    function handleExcluirReposicao(index) {
        const updatedReposicoes = [...reposicoes];
        updatedReposicoes.splice(index, 1);
        setReposicoes(updatedReposicoes);
    }

    function toggleExpansion(index) {
        setExpandedIndex(expandedIndex === index ? null : index);
    }

    return (
        <div className={css.td}>
            <Header />
            <div className={css.lista_feriados}>
                <div className={css.container}>
                    <h3 className={css.titulo}>Dias de Reposições Cadastrados</h3>
                    <div className={css.listar_feriados}>
                        {reposicoes.response.map((reposicao, index) => (
                            <div key={index} className={css.feriado_item}>
                                <div className={css.itens} onClick={() => toggleExpansion(index)}>
                                    <p>Nome: {reposicao.curso.nome}</p>
                                    <p>Data: {reposicao.data}</p>
                                    <button
                                        onClick={() => handleExcluirReposicao(index)}
                                        className={css.excluir_btn}
                                    >
                                        <HiArchiveBoxXMark className={css.icon_lixeira} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button onClick={openModal} className={css.btn_feriados}>Adicionar</button>
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        contentLabel="Cadastrar Nova Reposição"
                        overlayClassName={css.modal_overlay}
                        className={css.modal_content}
                    >
                        <div>
                            <h2>Cadastrar Nova Reposição</h2>
                        </div>
                        <div className={css.separa_inps}>
                            <input
                                className={css.inp}
                                placeholder="Nome:"
                                name="nome"
                                value={novaReposicao.nome}
                                onChange={handleInputChange}
                            />
                            <input
                                className={css.inp}
                                placeholder="Data:"
                                name="data"
                                type="date"
                                value={novaReposicao.data}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <button className={css.cadastrar_btn} onClick={handleCadastrarReposicao}>
                                Cadastrar
                            </button>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    );
}

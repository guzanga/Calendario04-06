import Header from "../components/Header";
import css from "./Feriados.module.css";
import Modal from "react-modal";
import { useState } from "react";
import { HiArchiveBoxXMark } from "react-icons/hi2";

Modal.setAppElement("#root");

export default function Feriados() {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [feriados, setFeriados] = useState([]);
    const [novoFeriado, setNovoFeriado] = useState({
        nome: "",
        data: "",
    });
    const [expandedIndex, setExpandedIndex] = useState(null);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    function handleInputChange(event) {
        const { name, value } = event.target;
        setNovoFeriado({ ...novoFeriado, [name]: value });
    }

    function handleCadastrarFeriado() {
        if (novoFeriado.nome.trim() === "" || novoFeriado.data.trim() === "") {
            alert("Todos os campos precisam ser preenchidos!");
            return;
        }

        setFeriados([...feriados, novoFeriado]);
        setNovoFeriado({
            nome: "",
            data: "",
        });
        closeModal();
    }

    function handleExcluirFeriado(index) {
        const updatedFeriados = [...feriados];
        updatedFeriados.splice(index, 1);
        setFeriados(updatedFeriados);
    }

    function toggleExpansion(index) {
        setExpandedIndex(expandedIndex === index ? null : index);
    }

    return (
        <div className={css.td}>
            <Header />
            <div className={css.lista_feriados}>
                <div className={css.container}>
                    <h3 className={css.titulo}>Feriados Cadastrados</h3>
                    <div className={css.listar_feriados}>
                        {feriados.map((feriado, index) => (
                            <div key={index} className={css.feriado_item}>
                                <div className={css.itens} onClick={() => toggleExpansion(index)}>
                                    <p>Nome: {feriado.nome}</p>
                                    <p>Data: {feriado.data}</p>
                                    <button
                                        onClick={() => handleExcluirFeriado(index)}
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
                        contentLabel="Cadastrar Novo Feriado"
                        overlayClassName={css.modal_overlay}
                        className={css.modal_content}
                    >
                        <div>
                            <h2>Cadastrar Novo Feriado</h2>
                        </div>
                        <div className={css.separa_inps}>
                            <input
                                className={css.inp}
                                placeholder="Nome:"
                                name="nome"
                                value={novoFeriado.nome}
                                onChange={handleInputChange}
                            />
                            <input
                                className={css.inp}
                                placeholder="Data:"
                                name="data"
                                type="date"
                                value={novoFeriado.data}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <button className={css.cadastrar_btn} onClick={handleCadastrarFeriado}>
                                Cadastrar
                            </button>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    );
}

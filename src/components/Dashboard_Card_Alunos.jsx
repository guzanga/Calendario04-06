import css from "./Dashboard_Card_Profs.module.css";
import Modal from "react-modal";
import {useContext, useEffect, useState} from "react";
import { HiArchiveBoxXMark } from "react-icons/hi2";
import {Dados} from "../contexts/context";

Modal.setAppElement("#root");

export default function Dashboard_Card_Alunos() {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [nome, setNome] = useState("")
    const [senha, setSenha] = useState("")
    const [email, setEmail] = useState("")
    const [alunosCadastrados, setAlunosCadastradas] = useState([]);
    const {fetchData} = useContext(Dados)
    const [ignore, setIgnore] = useState(0)

    useEffect(() => {
        const  handlePegarAluno = async (e) => {
            let resp = await fetchData("/aluno", "GET")
            let nome = resp.response
            let email = resp.response
            let senha = resp.response
            console.log(resp)
            setAlunosCadastradas(nome,email,senha)
        };

        handlePegarAluno()
    }, [ignore]);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const  handleCadastrarUser = async (e) => {
        e.preventDefault()
        setNome('');
        setSenha('');
        setEmail('');
        let resp = await fetchData("/usuario", "POST", {"nome": nome, "senha": senha, "email": email, "cargo": "aluno"})
        console.log(resp)

        if (!("response" in resp)) {
            alert(resp.mensagem)
            return
        }
        closeModal();
        setIgnore(resp)

    };

    function handleInputChange(event) {
        setNome(event.target.value);
    }

    function handleInputChange2(event) {
        setEmail(event.target.value);
    }

    function handleInputChange3(event) {
        setSenha(event.target.value);
    }

    function toggleExpansion(index) {
        setExpandedIndex(expandedIndex === index ? null : index);
    }

    return (
        <div>
            <div className={css.card_profs}>
                <h4 className={css.titulo}>Alunos Cadastrados</h4>
                <div className={css.todos_alunos}>
                    {alunosCadastrados.map((aluno, index) => (
                        <div className={css.campo2} key={index}>
                            <div className={css.separa_nome}>
                                <p className={css.professores}>Nome: {aluno.nome}</p>
                                <button
                                    className={css.btn_lixeira}
                                    // onClick={() => handleExcluirAluno(index)}
                                >
                                    <HiArchiveBoxXMark className={css.icon_lixeira}/>
                                </button>
                            </div>

                            {expandedIndex === index && (
                                <>
                                    <p className={css.professores}>Email: {aluno.email}</p>
                                    <p className={css.professores}>Senha: {aluno.senha}</p>
                                </>
                            )}
                            <div className={css.lado}>
                                <button className={css.btn_vermais} onClick={() => toggleExpansion(index)}>
                                    {expandedIndex === index ? 'Ver menos' : 'Ver mais'}
                                </button>
                            </div>


                        </div>
                    ))}
                </div>
                <button className={css.mais} onClick={openModal}>+</button>
                <div className={css.plus}>
                <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        contentLabel="Example Modal"
                        overlayClassName="modal-overlay"
                    >
                        <div className="modal-content">
                            <div>
                                <h2>Cadastrar Novo Aluno</h2>
                            </div>
                            <div className={css.separa_inps}>
                                <input
                                    className={css.inp}
                                    placeholder={"Nome:"}
                                    name="nome"
                                    value={nome}
                                    onChange={handleInputChange}
                                    required
                                ></input>
                                <input
                                    className={css.inp}
                                    placeholder={"Email:"}
                                    name="email"
                                    value={email}
                                    onChange={handleInputChange2}
                                    required
                                ></input>
                                <input
                                    className={css.inp}
                                    placeholder={"Senha:"}
                                    name="senha"
                                    value={senha}
                                    onChange={handleInputChange3}
                                    required
                                ></input>
                            </div>
                            <div>
                                <button className={css.cadastrar_btn} onClick={handleCadastrarUser}>
                                    Cadastrar
                                </button>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    );
}

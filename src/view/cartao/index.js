import React from "react";
import { Link } from "react-router-dom";
import EstiloCartao from './cartao.module.css';

function Cartao() {
    return (
        <div>
            <div className={EstiloCartao.containerPrincipal}>
                <span>Coleção - Objetos</span>
                <div className={`${EstiloCartao.inputBusca} input-group`}>
                    <div className="input-group-prepend">
                        <button className="btn btn-default"><i className="bi bi-search"></i></button>
                    </div>
                    <input className="form-control" type="text" placeholder="Busque por um elemento" />
                </div>
            </div>

            <div className={EstiloCartao.novoCartao}>
                <Link to="/novo-cartao" className={EstiloCartao.btn}>Novo Cartão</Link>
            </div>

            <main className={EstiloCartao.containerPrincipal}>
                <div>
                    <ul className="list-group" data-idcartao="1">
                        <li className={`${EstiloCartao.listGroupItem} list-group-item`}>
                            <div className={EstiloCartao.nomeColecao}>
                                <Link to="/novo-cartao">Árvore</Link>
                            </div>
                            <div className={EstiloCartao.botao}>
                                <button className="btn btn-primary"><i className="bi bi-pencil-square"></i></button>
                                <button className="btn btn-danger mostarModal"><i className="bi bi-trash-fill"></i></button>
                            </div>
                        </li>
                    </ul>
                    <ul className="list-group" data-idcartao="2">
                        <li className={`${EstiloCartao.listGroupItem} list-group-item`}>
                            <div className={EstiloCartao.nomeColecao}>
                                <Link to="/novo-cartao">Janela</Link>
                            </div>
                            <div className={EstiloCartao.botao}>
                                <button className="btn btn-primary"><i className="bi bi-pencil-square"></i></button>
                                <button className="btn btn-danger mostarModal"><i className="bi bi-trash-fill"></i></button>
                            </div>
                        </li>
                    </ul>
                    <ul className="list-group" data-idcartao="3">
                        <li className={`${EstiloCartao.listGroupItem} list-group-item`}>
                            <div className={EstiloCartao.nomeColecao}>
                                <Link to="/novo-cartao">Cobertor</Link>
                            </div>
                            <div className={EstiloCartao.botao}>
                                <button className="btn btn-primary"><i className="bi bi-pencil-square"></i></button>
                                <button className="btn btn-danger mostarModal"><i className="bi bi-trash-fill"></i></button>
                            </div>
                        </li>
                    </ul>
                    <ul className="list-group" data-idcartao="4">
                        <li className={`${EstiloCartao.listGroupItem} list-group-item`}>
                            <div className={EstiloCartao.nomeColecao}>
                                <Link to="/novo-cartao">Telefone</Link>
                            </div>
                            <div className={EstiloCartao.botao}>
                                <button className="btn btn-primary"><i className="bi bi-pencil-square"></i></button>
                                <button className="btn btn-danger mostarModal"><i className="bi bi-trash-fill"></i></button>
                            </div>
                        </li>
                    </ul>
                    <ul className="list-group" data-idcartao="5">
                        <li className={`${EstiloCartao.listGroupItem} list-group-item`}>
                            <div className={EstiloCartao.nomeColecao}>
                                <Link to="/novo-cartao">Brinquedo</Link>
                            </div>
                            <div className={EstiloCartao.botao}>
                                <button className="btn btn-primary"><i className="bi bi-pencil-square"></i></button>
                                <button className="btn btn-danger mostarModal"><i className="bi bi-trash-fill"></i></button>
                            </div>
                        </li>
                    </ul>
                    <ul className="list-group" data-idcartao="6">
                        <li className={`${EstiloCartao.listGroupItem} list-group-item`}>
                            <div className={EstiloCartao.nomeColecao}>
                                <Link to="/novo-cartao">Teclado</Link>
                            </div>
                            <div className={EstiloCartao.botao}>
                                <button className="btn btn-primary"><i className="bi bi-pencil-square"></i></button>
                                <button className="btn btn-danger mostarModal"><i className="bi bi-trash-fill"></i></button>
                            </div>
                        </li>
                    </ul>
                    <ul className="list-group" data-idcartao="7">
                        <li className={`${EstiloCartao.listGroupItem} list-group-item`}>
                            <div className={EstiloCartao.nomeColecao}>
                                <Link to="/novo-cartao">Papel</Link>
                            </div>
                            <div className={EstiloCartao.botao}>
                                <button className="btn btn-primary"><i className="bi bi-pencil-square"></i></button>
                                <button className="btn btn-danger mostarModal"><i className="bi bi-trash-fill"></i></button>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="d-flex">
                    <button className={`${EstiloCartao.btn} btn btn-success`} id={EstiloCartao.salvar}>Jogar!</button>
                </div>
            </main>

            <div className="modal fade" id="myModal" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Exclusão</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Tem certeza que deseja remover esse registro?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" id="excluir">Sim</button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal">Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cartao;
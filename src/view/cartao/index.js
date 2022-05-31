import React from "react";
import './cartao.css';

function Cartao() {
    return (
        <div>
            <div className="container-principal">
                <span>Coleção - Objetos</span>
                <div className="input-group input-busca">
                    <div className="input-group-prepend">
                        <button className="btn btn-default"><i className="bi bi-search"></i></button>
                    </div>
                    <input className="form-control" type="text" placeholder="Busque por um elemento" />
                </div>
            </div>

            <div className="novo-cartao">
                <a href="novo-cartao.html" className="btn">Novo Cartão</a>
            </div>

            <main className="container-principal">
                <div className="listagem">
                    <ul className="list-group" data-idCartao="1">
                        <li className="list-group-item">
                            <div className="nome-colecao">
                                <a href="">Árvore</a>
                            </div>
                            <div className="botao">
                                <button className="btn btn-primary"><i className="bi bi-pencil-square"></i></button>
                                <button className="btn btn-danger mostarModal"><i className="bi bi-trash-fill"></i></button>
                            </div>
                        </li>
                    </ul>
                    <ul className="list-group" data-idCartao="2">
                        <li className="list-group-item">
                            <div className="nome-colecao">
                                <a href="">Janela</a>
                            </div>
                            <div className="botao">
                                <button className="btn btn-primary"><i className="bi bi-pencil-square"></i></button>
                                <button className="btn btn-danger mostarModal"><i className="bi bi-trash-fill"></i></button>
                            </div>
                        </li>
                    </ul>
                    <ul className="list-group" data-idCartao="3">
                        <li className="list-group-item">
                            <div className="nome-colecao">
                                <a href="">Cobertor</a>
                            </div>
                            <div className="botao">
                                <button className="btn btn-primary"><i className="bi bi-pencil-square"></i></button>
                                <button className="btn btn-danger mostarModal"><i className="bi bi-trash-fill"></i></button>
                            </div>
                        </li>
                    </ul>
                    <ul className="list-group" data-idCartao="4">
                        <li className="list-group-item">
                            <div className="nome-colecao">
                                <a href="">Telefone</a>
                            </div>
                            <div className="botao">
                                <button className="btn btn-primary"><i className="bi bi-pencil-square"></i></button>
                                <button className="btn btn-danger mostarModal"><i className="bi bi-trash-fill"></i></button>
                            </div>
                        </li>
                    </ul>
                    <ul className="list-group" data-idCartao="5">
                        <li className="list-group-item">
                            <div className="nome-colecao">
                                <a href="">Brinquedo</a>
                            </div>
                            <div className="botao">
                                <button className="btn btn-primary"><i className="bi bi-pencil-square"></i></button>
                                <button className="btn btn-danger mostarModal"><i className="bi bi-trash-fill"></i></button>
                            </div>
                        </li>
                    </ul>
                    <ul className="list-group" data-idCartao="6">
                        <li className="list-group-item">
                            <div className="nome-colecao">
                                <a href="">Teclado</a>
                            </div>
                            <div className="botao">
                                <button className="btn btn-primary"><i className="bi bi-pencil-square"></i></button>
                                <button className="btn btn-danger mostarModal"><i className="bi bi-trash-fill"></i></button>
                            </div>
                        </li>
                    </ul>
                    <ul className="list-group" data-idCartao="7">
                        <li className="list-group-item">
                            <div className="nome-colecao">
                                <a href="">Papel</a>
                            </div>
                            <div className="botao">
                                <button className="btn btn-primary"><i className="bi bi-pencil-square"></i></button>
                                <button className="btn btn-danger mostarModal"><i className="bi bi-trash-fill"></i></button>
                            </div>
                        </li>
                    </ul>
                </div>
                <button className="btn btn-success d-flex" id="salvar">Jogar!</button>
            </main>

            <div className="modal fade" id="myModal" tabindex="-1" role="dialog">
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
import React from "react";
import './cadastro.css';

function Cadastro() {
    return (
        <main>
            <div className="container-principal">
                <div className="titulo">
                    <h1>Cadastre-se</h1>
                    <p>Com a sua conta, você poderá gerenciar suas coleções de flash cards.</p>
                </div>
                <div className="input-group">
                    <div className="container-principal">
                        <form action="/cadastro" method="post">
                            <label for="nome">Nome</label>
                            <input type="text" className="form-control" id="nome" placeholder="Insira o seu nome completo" />
                            <label for="email">Email</label>
                            <input type="text" className="form-control" id="email" placeholder="Insira o seu e-mail" />
                            <label for="senha">Senha</label>
                            <input type="password" className="form-control" id="senha" />
                            <label for="repetirSenha">Repetir a senha</label>
                            <input type="password" className="form-control" id="repetirSenha" />
                            <span id="senhaErrada" className="naoMostrar">Senha não confere</span>
                            <div className="botao">
                                <button id="cadastrar" className="btn mt-3">Cadastrar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Cadastro;
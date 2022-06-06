import React from "react";
import './login.css';

function Login() {
    return (
        <main>
            <div class="container-principal">
                <div class="titulo">
                    <h1>Login</h1>
                </div>
                <div class="input-group">
                    <div class="container-principal">
                        <form action="/cadastro" method="post">
                            <label for="email">Email</label>
                            <input class="form-control" type="email" id="email" placeholder="Insira o seu e-mail" />
                            <span id="emailInvalido" class="naoMostrar">E-mail inválido</span>
                            <label for="senha">Senha</label>
                            <input class="form-control" type="password" id="senha" />
                            <div class="botao">
                                <button id="entrar" class="btn mt-3">Entrar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Login;
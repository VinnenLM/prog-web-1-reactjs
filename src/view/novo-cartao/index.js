import React from "react";
import './novo-cartao.css'

function Login() {
    return(
        <main>
        <div class="container-principal">
            <span>Coleção - Objetos</span>

            <div class="titulo">
                <h3>Preencha os dados da frente e do verso do flashcard</h3>
            </div>

            <div class="cartao">
                <span>Frente</span>
                <div class="cartao-frente">
                    <input value="Nome"></input>
                </div>
                <div class="separacao"></div>
                <span>Verso</span>
                <div class="cartao-verso">
                    <input value="Nome"></input>
                </div>
            </div>

            <button class="btn btn-default d-flex" id="salvar">Cadastrar</button>
        </div>
    </main>
    )
}

export default Login;
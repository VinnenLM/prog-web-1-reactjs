import React from "react";
import './editar-cartao.css';

function EditarCartao() {
    return(
        <main>
        <div class="container-principal">
            <span>Coleção - Objetos</span>

            <div class="titulo">
                <h3>Atualize os dados da frente e do verso do flashcard</h3>
            </div>

            <form action="cartoes.html" method="post">

            <div class="cartao">
                <span>Frente</span>
                <div class="cartao-frente">
                    <input id="frente" value="Nome"></input>
                </div>
                <div class="separacao"></div>
                <span>Verso</span>
                <div class="cartao-verso">
                    <input id="verso" value="Nome"></input>
                </div>
            </div>

            <button class="btn btn-default d-flex" id="salvar" onclick="salvarDados()">Salvar alterações</button>

            </form>
        </div>
    </main>
    )
}

export default EditarCartao;
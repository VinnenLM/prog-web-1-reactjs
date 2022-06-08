import React from "react";
import EstiloEditarCartao from './editar-cartao.module.css';

function EditarCartao() {
    return (
        <main>
            <div class={EstiloEditarCartao.containerPrincipal}>
                <span>Coleção - Objetos</span>

                <div class={EstiloEditarCartao.titulo}>
                    <h3>Atualize os dados da frente e do verso do flashcard</h3>
                </div>

                <form action="cartoes.html" method="post">

                    <div class={EstiloEditarCartao.cartao}>
                        <span>Frente</span>
                        <div class={EstiloEditarCartao.cartaoFrente}>
                            <input id="frente" value="Nome"></input>
                        </div>
                        <div class={EstiloEditarCartao.separacao}></div>
                        <span>Verso</span>
                        <div class={EstiloEditarCartao.cartaoVerso}>
                            <input id="verso" value="Nome"></input>
                        </div>
                    </div>

                    <div className="d-flex justify-content-center">
                        <button className={`${EstiloEditarCartao.btn} btn btn-default`} id={EstiloEditarCartao.salvar} onclick="salvarDados()">Salvar alterações</button>
                    </div>

                </form>
            </div>
        </main>
    )
}

export default EditarCartao;
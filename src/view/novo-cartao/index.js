import React from "react";
import EstiloNovoCartao from './novo-cartao.module.css'

function NovoCartao() {
    return (
        <main>
            <div className={EstiloNovoCartao.containerPrincipal}>
                <span>Coleção - Objetos</span>

                <div className={EstiloNovoCartao.titulo}>
                    <h3>Preencha os dados da frente e do verso do flashcard</h3>
                </div>

                <div className={EstiloNovoCartao.cartao}>
                    <span>Frente</span>
                    <div className={EstiloNovoCartao.cartaoFrente}>
                        <input value="Nome"></input>
                    </div>
                    <div className={EstiloNovoCartao.separacao}></div>
                    <span>Verso</span>
                    <div className={EstiloNovoCartao.cartaoVerso}>
                        <input value="Nome"></input>
                    </div>
                </div>

                <div className="d-flex">
                    <button className={`${EstiloNovoCartao.btn}`} id={EstiloNovoCartao.salvar}>Cadastrar</button>
                </div>
            </div>
        </main>
    )
}

export default NovoCartao;
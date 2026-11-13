import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";

function Index() {
    const [virado, setVirado] = useState(false);

    return (
        <main className="lp">
            <section className="lp-hero">
                <h1 className="lp-titulo">Mind Booster</h1>
                <p className="lp-sub">Treine a sua memória com Flash Cards!</p>
                <div className="lp-chamada">
                    <Link to="/jogo" className="lp-btn lp-jogar">Jogar sem login</Link>
                    <Link to="/home" className="lp-btn">Ver coleções</Link>
                </div>
            </section>

            <section className="lp-demo">
                <p className="lp-pergunta">Como se chama carro em inglês?</p>
                <button
                    type="button"
                    className={`lp-flip ${virado ? "virado" : ""}`}
                    onClick={() => setVirado(!virado)}
                    aria-label="Virar cartão"
                >
                    <span className="lp-face lp-frente">Carro</span>
                    <span className="lp-face lp-verso">Car</span>
                </button>
                <p className="lp-dica">{virado ? "Clique para voltar" : "Clique no cartão para descobrir"}</p>
            </section>

            <section className="lp-passos">
                <div className="lp-passo"><i className="bi bi-collection"></i><strong>Crie coleções</strong><span>Monte cartões com frente e verso sobre o que quiser estudar.</span></div>
                <div className="lp-passo"><i className="bi bi-play-circle"></i><strong>Jogue</strong><span>Responda cartão por cartão, de uma coleção ou de todas de uma vez.</span></div>
                <div className="lp-passo"><i className="bi bi-trophy"></i><strong>Veja sua pontuação</strong><span>No final, confira os acertos e revise o que errou.</span></div>
            </section>
        </main>
    );
}

export default Index;

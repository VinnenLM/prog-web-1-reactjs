import React from "react";
import { Link } from "react-router-dom";
import Colecao from "../../components/colecao";
import { useColecoes } from "../../hooks/useColecoes";
import EstiloHome from "./home.module.css";

function Home() {
    const { exemplos, minhas, carregando, erro, uid } = useColecoes();
    const logado = !!uid;

    return (
        <>
            <div className={EstiloHome.containerPrincipal}>
                <div className={EstiloHome.topo}>
                    <div>
                        <h2 className={EstiloHome.pagina}>{logado ? "Minhas Coleções" : "Coleções"}</h2>
                        {!logado && (
                            <p className={EstiloHome.aviso}>
                                Você está sem login: pode jogar as coleções de exemplo.{" "}
                                <Link to="/login">Entre</Link> ou <Link to="/cadastro">cadastre-se</Link> para criar as suas.
                            </p>
                        )}
                    </div>
                    <div className={EstiloHome.acoes}>
                        <Link to="/jogo" className={`${EstiloHome.btn} ${EstiloHome.jogar}`}>
                            <i className="bi bi-play-fill"></i> Jogar tudo
                        </Link>
                        {logado && (
                            <Link to="/nova-colecao" className={EstiloHome.btn}>
                                <i className="bi bi-plus-lg"></i> Nova Coleção
                            </Link>
                        )}
                    </div>
                </div>

                {logado && (
                    <>
                        <h4 className={EstiloHome.secao}>Suas coleções</h4>
                        {erro && <p className={EstiloHome.erro}>{erro}</p>}
                        {carregando && <p className={EstiloHome.vazio}>Carregando...</p>}
                        {!carregando && !erro && minhas.length === 0 && (
                            <p className={EstiloHome.vazio}>
                                Você ainda não criou nenhuma coleção. Clique em "Nova Coleção" para começar.
                            </p>
                        )}
                        <div className={EstiloHome.cartoes}>
                            {minhas.map((c) => (
                                <Colecao key={c.id} id={c.id} nome={c.nome} imagem={c.imagem} uid={uid} />
                            ))}
                        </div>
                    </>
                )}

                <h4 className={EstiloHome.secao}>Coleções de exemplo</h4>
                <div className={EstiloHome.cartoes}>
                    {exemplos.map((c) => (
                        <Colecao key={c.id} id={c.id} nome={c.nome} imagem={c.imagem} somenteLeitura total={c.cartoes.length} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default Home;

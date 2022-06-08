import React from "react";
import { Link } from "react-router-dom";

import EstiloHome from './home.module.css';
import Bola from '../../assets/img/bola.png';
import Cores from '../../assets/img/rainbow-circle.png';
import Urso from '../../assets/img/urso.png';
import Arvore from '../../assets/img/arvore.png';

function Home() {
    return (

        <>
            <div className={`${EstiloHome.containerPrincipal} ${EstiloHome.botao}`}>
                <Link to="/nova-colecao" className={`${EstiloHome.btn} btn-default`}>Nova Coleção</Link>
            </div>

            <div className={EstiloHome.containerPrincipal}>

                <div className={EstiloHome.cartoes}>

                    <div className={EstiloHome.cartao} data-idcartao="1">
                        <div className={EstiloHome.editarCartao}><i className="bi bi-pencil"></i></div>
                        <div className={EstiloHome.cartaoImagem}><img src={Bola} alt="" /></div>
                        <div className={EstiloHome.cartaoNome}>
                            <span>Objetos</span>
                        </div>
                        <div className={EstiloHome.excluirCartao}><i className="bi bi-trash3"></i></div>
                    </div>

                    <div className={EstiloHome.cartao} data-idcartao="2">
                        <div className={EstiloHome.editarCartao}><i className="bi bi-pencil"></i></div>
                        <div className={EstiloHome.cartaoImagem}><img src={Cores} alt="" /></div>
                        <div className={EstiloHome.cartaoNome}>
                            <span>Cores</span>
                        </div>
                        <div className={EstiloHome.excluirCartao}><i className="bi bi-trash3"></i></div>
                    </div>

                    <div className={EstiloHome.cartao} data-idcartao="3">
                        <div className={EstiloHome.editarCartao}><i className="bi bi-pencil"></i></div>
                        <div className={EstiloHome.cartaoImagem}><img src={Urso} alt="" /></div>
                        <div className={EstiloHome.cartaoNome}>
                            <span>Animais</span>
                        </div>
                        <div className={EstiloHome.excluirCartao}><i className="bi bi-trash3"></i></div>
                    </div>
                    <div className={EstiloHome.cartao} data-idcartao="4">
                        <div className={EstiloHome.editarCartao}><i className="bi bi-pencil"></i></div>
                        <div className={EstiloHome.cartaoImagem}><img src={Arvore} alt="" /></div>
                        <div className={EstiloHome.cartaoNome}>
                            <span>Adjetivos</span>
                        </div>
                        <div className={EstiloHome.excluirCartao}><i className="bi bi-trash3"></i></div>
                    </div>

                </div>

            </div>

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
                            <p>Tem certeza que deseja remover essa coleção? Isso excluirá todos os cartões contidos nela.
                            </p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" id="excluir">Sim</button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal">Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Home;
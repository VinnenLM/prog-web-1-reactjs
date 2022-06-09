import React from "react";
import EstiloIndex from './index.module.css';
import SetaClicar from '../../assets/img/seta-clicar.png';
import Seta from '../../assets/img/seta.png';

function Login() {
    return(
        <main>
        <div className={EstiloIndex.containerPrincipal}>

            <div>
                <h1 className={EstiloIndex.titulo}>Mind Booster</h1>
                <h3 className={EstiloIndex.subTitulo}>Treine a sua memória com Flash Cards!</h3>
            </div>

            <div className={EstiloIndex.containerCartoes}>

                <p className={EstiloIndex.cartaoP}>Como se chama carro em inglês?</p>
                
                <div className={EstiloIndex.cartoes}>
                   
                    <div id="cartao-clicavel" className={EstiloIndex.divCartao}>
                        <div className={EstiloIndex.clicar}>
                            <span>Clique no cartão <br/> para descobrir</span>
                            <img src={SetaClicar} alt=""/>
                        </div>
                        <div className={EstiloIndex.cartao}>
                            <div className={EstiloIndex.cartaoFrente}>
                                <span>Carro</span>
                            </div>
                        </div>
                    </div>

                    <div className={`${EstiloIndex.cartaoSeta} ${EstiloIndex.naoVisivel}`}>
                        <img className={EstiloIndex.seta} src={Seta} alt=""/>
                    </div>

                    <div id="cartao-completo" className={`${EstiloIndex.divCartao} ${EstiloIndex.naoVisivel}`}>
                        <div className={EstiloIndex.cartao}>
                            <div className={EstiloIndex.cartaoFrente}>
                                <span>Carro</span>
                            </div>
                            <div className={EstiloIndex.separacao}></div>
                            <div className={EstiloIndex.cartaoVerso}>
                                <span>Car</span>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </main>
    )
}

export default Login;
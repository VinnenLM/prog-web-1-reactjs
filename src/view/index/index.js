import React from "react";
import EstiloIndex from './index.module.css';
import SetaClicar from '../../assets/img/seta-clicar.png';
import Seta from '../../assets/img/seta.png';

function Login() {
    return(
        <main>
        <div class={EstiloIndex.containerPrincipal}>

            <div class={EstiloIndex.titulo}>
                <h1>Mind Booster</h1>
                <h3>Treine a sua memória com Flash Cards!</h3>
            </div>

            <div class={EstiloIndex.containerCartoes}>

                <p class={EstiloIndex.cartaoP}>Como se chama carro em inglês?</p>
                
                <div class={EstiloIndex.cartoes}>
                   
                    <div id="cartao-clicavel" class={EstiloIndex.divCartao}>
                        <div class={EstiloIndex.clicar}>
                            <span>Clique no cartão <br/> para descobrir</span>
                            <img src={SetaClicar} alt=""/>
                        </div>
                        <div class={EstiloIndex.cartao}>
                            <div class={EstiloIndex.cartaoFrente}>
                                <span>Carro</span>
                            </div>
                        </div>
                    </div>

                    <div class={`${EstiloIndex.cartaoSeta} ${EstiloIndex.naoVisivel}`}>
                        <img class={EstiloIndex.seta} src={Seta} alt=""/>
                    </div>

                    <div id="cartao-completo" class={`${EstiloIndex.divCartao} ${EstiloIndex.naoVisivel}`}>
                        <div class={EstiloIndex.cartao}>
                            <div class={EstiloIndex.cartaoFrente}>
                                <span>Carro</span>
                            </div>
                            <div class={EstiloIndex.separacao}></div>
                            <div class={EstiloIndex.cartaoVerso}>
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
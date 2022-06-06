import React from "react";
import './index.css';
import SetaClicar from '../../assets/img/seta-clicar.png';
import Seta from '../../assets/img/seta.png';

function Login() {
    return(
        <main>
        <div class="container-principal">

            <div class="titulo">
                <h1>Mind Booster</h1>
                <h3>Treine a sua memória com Flash Cards!</h3>
            </div>

            <div class="container-cartoes">

                <p class="cartao-p">Como se chama carro em inglês?</p>
                
                <div class="cartoes">
                   
                    <div id="cartao-clicavel" class="div-cartao">
                        <div class="clicar">
                            <span>Clique no cartão <br/> para descobrir</span>
                            <img src={SetaClicar} alt=""/>
                        </div>
                        <div class="cartao">
                            <div class="cartao-frente">
                                <span>Carro</span>
                            </div>
                        </div>
                    </div>

                    <div class="cartao-seta nao-visivel">
                        <img class="seta" src={Seta} alt=""/>
                    </div>

                    <div id="cartao-completo" class="div-cartao nao-visivel">
                        <div class="cartao">
                            <div class="cartao-frente">
                                <span>Carro</span>
                            </div>
                            <div class="separacao"></div>
                            <div class="cartao-verso">
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
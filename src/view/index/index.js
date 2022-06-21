import React, { useState } from "react";
import './index.css';
import SetaClicar from '../../assets/img/seta-clicar.png';
import Seta from '../../assets/img/seta.png';

function Login() {

    const [visivel, setVisivel] = useState('naoVisivel');
    const [naoVisivel, setNaoVisivel] = useState('');

    const mostrar = () => {
        if (visivel === 'naoVisivel') {
            setVisivel('');
            setNaoVisivel('naoVisivel');
        } else {
            setVisivel('naoVisivel');
            setNaoVisivel('');
        }
    }

    return (
        <main>
            <div className='containerPrincipal'>

                <div>
                    <h1 className='titulo'>Mind Booster</h1>
                    <h3 className='subTitulo'>Treine a sua memória com Flash Cards!</h3>
                </div>

                <div className='containerCartoes'>

                    <p className={`cartaoP ${naoVisivel}`}>Como se chama carro em inglês?</p>

                    <div className='cartoes'>

                        <div id="cartao-clicavel" className='divCartao' onClick={mostrar}>
                            <div className={`clicar ${naoVisivel}`}>
                                <span>Clique no cartão <br /> para descobrir</span>
                                <img src={SetaClicar} alt="" />
                            </div>
                            <div className='cartao'>
                                <div className='cartaoFrente'>
                                    <span>Carro</span>
                                </div>
                            </div>
                        </div>

                        <div className={`cartaoSeta ${visivel}`}>
                            <img className='seta' src={Seta} alt="" />
                        </div>

                        <div className={`divCartao ${visivel}`}>
                            <div className='cartao'>
                                <div className='cartaoFrente'>
                                    <span>Carro</span>
                                </div>
                                <div className='separacao'></div>
                                <div className='cartaoVerso'>
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
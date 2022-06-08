import React, { useState } from "react";
import EstiloLogin from './login.module.css';

import "../../config/firebase";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

function Login() {

    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [tipo, setTipo] = useState();

    function autenticar() {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, senha)
        .then((userCredential) => {
            setTipo('ok');
          })
          .catch((error) => {
            setTipo('erro')
          });
    }

    return (
        <main>
            <div className={EstiloLogin.containerPrincipal}>
                <div className={EstiloLogin.titulo}>
                    <h1>Login</h1>
                </div>
                <div className="input-group">
                    <div className={EstiloLogin.containerPrincipal}>
                        <form action="/cadastro" method="post">
                            <label htmlFor="email">Email</label>
                            <input onChange={(evt) => setEmail(evt.target.value)} className="form-control" type="email" id="email" placeholder="Insira o seu e-mail" />
                            <span id="emailInvalido" className={EstiloLogin.naoMostrar}>E-mail inválido</span>
                            <label htmlFor="senha">Senha</label>
                            <input onChange={(evt) => setSenha(evt.target.value)} className="form-control" type="password" id="senha" />
                            {tipo==='ok' && <span>Entrou</span>}
                            {tipo==='erro' && <span>Não entrou</span>}
                            <div className={EstiloLogin.botao}>
                                <button id="entrar" className="btn mt-3" type="button" onClick={autenticar}>Entrar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Login;
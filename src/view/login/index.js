import React, { useState } from "react";
import EstiloLogin from './login.module.css';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';
import { auth } from "../../config/firebase";
import { mensagemAuth } from "../../utils/erros";

function Login() {
    const logado = useSelector(state => state.usuarioLogado > 0);

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [msg, setMsg] = useState('');
    const [carregando, setCarregando] = useState(false);

    async function autenticar() {
        if (!email || !senha) {
            setMsg('Informe e-mail e senha.');
            return;
        }
        setCarregando(true);
        setMsg('');
        try {
            // O redirecionamento acontece quando o App detecta a sessão.
            await signInWithEmailAndPassword(auth, email.trim(), senha);
        } catch (error) {
            setMsg(mensagemAuth(error));
            setCarregando(false);
        }
    }

    function autenticarEnter(evt) {
        if (evt.key === 'Enter') {
            evt.preventDefault();
            autenticar();
        }
    }

    return (
        <main>
            {logado ? <Navigate to='/home' replace /> : null}

            <div className={EstiloLogin.containerPrincipal}>
                <div className={EstiloLogin.titulo}>
                    <h1>Login</h1>
                </div>
                <div className="input-group">
                    <div className={EstiloLogin.containerPrincipal}>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <label htmlFor="email">Email</label>
                            <input onChange={(evt) => setEmail(evt.target.value)} onKeyDown={autenticarEnter} className="form-control" type="email" id="email" placeholder="Insira o seu e-mail" />
                            <label htmlFor="senha">Senha</label>
                            <input onChange={(evt) => setSenha(evt.target.value)} onKeyDown={autenticarEnter} className="form-control" type="password" id="senha" />
                            {msg && <span>{msg}</span>}
                            <div className={EstiloLogin.botao}>
                                <button id="entrar" className={`${EstiloLogin.btn} btn mt-3`} type="button" onClick={autenticar} disabled={carregando}>Entrar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Login;

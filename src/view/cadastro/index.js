import React, { useState } from "react";
import EstiloCadastro from './cadastro.module.css';

import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import { mensagemAuth } from "../../utils/erros";

function Cadastro() {
    const logado = useSelector(state => state.usuarioLogado > 0);

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [repetir, setRepetir] = useState('');
    const [msg, setMsg] = useState('');
    const [carregando, setCarregando] = useState(false);

    async function cadastrar() {
        setMsg('');

        if (!email || !senha || !repetir) {
            setMsg('Preencha todos os campos!');
            return;
        }
        if (senha !== repetir) {
            setMsg('As senhas não coincidem.');
            return;
        }

        setCarregando(true);
        try {
            const cred = await createUserWithEmailAndPassword(auth, email.trim(), senha);
            if (nome.trim()) {
                await updateProfile(cred.user, { displayName: nome.trim() }).catch(() => {});
            }
            // O App detecta a nova sessão e redireciona para /home.
        } catch (error) {
            setMsg(mensagemAuth(error));
            setCarregando(false);
        }
    }

    return (
        <main>
            {logado ? <Navigate to='/home' replace /> : null}

            <div className={EstiloCadastro.containerPrincipal}>
                <div className={EstiloCadastro.titulo}>
                    <h1>Cadastre-se</h1>
                    <p>Com a sua conta, você poderá gerenciar suas coleções de flash cards.</p>
                </div>
                <div className="input-group">
                    <div className={EstiloCadastro.containerPrincipal}>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <label htmlFor="nome">Nome</label>
                            <input value={nome} onChange={(evt) => setNome(evt.target.value)} type="text" className={`${EstiloCadastro.inputsCadastro} form-control`} id="nome" placeholder="Insira o seu nome completo" />
                            <label htmlFor="email">Email</label>
                            <input value={email} onChange={(evt) => setEmail(evt.target.value)} type="email" className={`${EstiloCadastro.inputsCadastro} form-control`} id="email" placeholder="Insira o seu e-mail" />
                            <label htmlFor="senha">Senha</label>
                            <input value={senha} onChange={(evt) => setSenha(evt.target.value)} type="password" className={`${EstiloCadastro.inputsCadastro} form-control`} id="senha" />
                            <label htmlFor="repetirSenha">Repetir a senha</label>
                            <input value={repetir} onChange={(evt) => setRepetir(evt.target.value)} type="password" className={`${EstiloCadastro.inputsCadastro} form-control`} id="repetirSenha" />
                            {msg && <span>{msg}</span>}
                            <div className={EstiloCadastro.botao}>
                                <button id="cadastrar" className="btn mt-3" type="button" onClick={cadastrar} disabled={carregando}>Cadastrar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Cadastro;

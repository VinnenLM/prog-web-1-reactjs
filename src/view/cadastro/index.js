import React, { useState } from "react";
import EstiloCadastro from './cadastro.module.css';

import "../../config/firebase";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

function Cadastro() {

    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [tipo, setTipo] = useState();
    const [msg, setMsg] = useState();
    //const [carregando, setCarregando] = useState();

    function cadastrar() {
        //setCarregando(1); //caso queira usar um icone de carregar, fazer a verificação no html
        setMsg(null);

        if (!email || !senha) {
            setMsg('Preencha todos os campos!');
            setTipo('erro');
        } else {
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, email, senha)
                .then((userCredential) => {
                    //setCarregando(0);
                    setTipo('ok');
                    //senha tem q ter pelo menos 6 caracteres
                })
                .catch((error) => {
                    //setCarregando(0);
                    setTipo('erro');
                    setMsg(error.message);
                });
        }


    }

    return (
        <main>
            <div className={EstiloCadastro.containerPrincipal}>
                <div className={EstiloCadastro.titulo}>
                    <h1>Cadastre-se</h1>
                    <p>Com a sua conta, você poderá gerenciar suas coleções de flash cards.</p>
                </div>
                <div className="input-group">
                    <div className={EstiloCadastro.containerPrincipal}>
                        <form method="post">
                            <label htmlFor="nome">Nome</label>
                            <input type="text" className="form-control" id="nome" placeholder="Insira o seu nome completo" />
                            <label htmlFor="email">Email</label>
                            <input onChange={(evt) => setEmail(evt.target.value)} type="text" className="form-control" id="email" placeholder="Insira o seu e-mail" />
                            <label htmlFor="senha">Senha</label>
                            <input onChange={(evt) => setSenha(evt.target.value)} type="password" className="form-control" id="senha" />
                            <label htmlFor="repetirSenha">Repetir a senha</label>
                            <input type="password" className="form-control" id="repetirSenha" />
                            <span id="senhaErrada" className="naoMostrar">Senha não confere</span>
                            {tipo === 'ok' && <span>Deu bom</span>}
                            {tipo === 'erro' && <span>{msg}</span>}
                            <div className={EstiloCadastro.botao}>
                                <button id="cadastrar" className="btn mt-3" type="button" onClick={cadastrar}>Cadastrar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Cadastro;
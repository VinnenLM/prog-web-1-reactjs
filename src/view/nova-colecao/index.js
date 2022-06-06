import React from "react";
import './nova-colecao.css';

function Login() {
    return(
        <main>

        <div class="container-principal">

            <span>Nova Coleção</span>

            <div class="titulo">
                <h3>Preencha os dados referente à coleção a ser criada</h3>
            </div>

            <div class="input-group">

                <div class="container-input">

                    <form action="home.html" method="POST">
                        <label for="nome">Nome coleção</label>
                        <input class="form-control" type="text" id="nome" placeholder="Insira o nome da coleção"/>
                        <label for="descricao">Descrição</label>
                        <textarea class="form-control" type="text" id="descricao"
                            placeholder="Descreva os detalhes da coleção"></textarea>
                        <label for="imagem">Imagem</label>

                        <div class="input-group">
                              <input type="file" id="imagem" onchange="mudarNome(this)"/>
                              <label class="custom-file-label" for="imagem">Escolha uma imagem para a coleção criada...</label>
                        </div>

                        <div class="botao">
                            <button type="submit" class="btn mt-3" id="salvar" onclick="salvarDados()">Cadastrar</button>
                        </div>

                    </form>
                </div>

            </div>
        </div>

    </main>
    )
}

export default Login;
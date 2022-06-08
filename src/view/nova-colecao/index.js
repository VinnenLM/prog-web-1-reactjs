import React from "react";
import EstiloNovaColecao from './nova-colecao.module.css';

function NovaColecao() {
    return(
        <main>

        <div class={EstiloNovaColecao.containerPrincipal}>

            <span>Nova Coleção</span>

            <div class={EstiloNovaColecao.titulo}>
                <h3>Preencha os dados referente à coleção a ser criada</h3>
            </div>

            <div class="input-group">

                <div class={EstiloNovaColecao.containerInput}>

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

                        <div class={EstiloNovaColecao.botao}>
                            <button type="submit" class="btn mt-3" id={EstiloNovaColecao.salvar} onclick="salvarDados()">Cadastrar</button>
                        </div>

                    </form>
                </div>

            </div>
        </div>

    </main>
    )
}

export default NovaColecao;
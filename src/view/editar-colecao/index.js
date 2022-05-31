import React from "react";
import './editar-colecao.css';

function EditarColecao() {
    return(
        <div class="container-principal">

        <span>Editar Coleção</span>

        <div class="titulo">
            <h3>Atualize os dados necessários da coleção</h3>
        </div>
        
        <div class="input-group">

            <div class="container-input">

                <form action="home.html" method="PUT">
                    <label for="nome">Nome coleção</label>
                    <input class="form-control" type="text" id="nome" placeholder="Insira o nome da coleção" />
                    <label for="descricao">Descrição</label>
                    <textarea class="form-control" type="text" id="descricao"
                        placeholder="Descreva os detalhes da coleção"></textarea>
                    <label for="imagem">Imagem</label>

                    <div class="input-group">
                        <input type="file" id="imagem" onchange="mudarNome(this)" />
                        <label class="custom-file-label" for="imagem">Escolha uma imagem para a coleção criada...</label>
                    </div>

                    <div class="botao">
                        <button type="submit" class="btn mt-3" id="salvar" onclick="salvarDados()">Salvar Alterações</button>
                    </div>

                </form>

            </div>

        </div>

    </div>
    )
}

export default EditarColecao;
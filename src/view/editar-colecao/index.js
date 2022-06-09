import React from "react";
import EstiloEditarColecao from './editar-colecao.module.css';

function EditarColecao() {
    return(
        <div className={EstiloEditarColecao.containerPrincipal}>

        <span>Editar Coleção</span>

        <div className={EstiloEditarColecao.titulo}>
            <h3>Atualize os dados necessários da coleção</h3>
        </div>
        
        <div className="input-group">

            <div className={EstiloEditarColecao.containerInput}>

                <form action="home.html" method="PUT">
                    <label for="nome">Nome coleção</label>
                    <input className="form-control" type="text" id="nome" placeholder="Insira o nome da coleção" />
                    <label for="descricao">Descrição</label>
                    <textarea className="form-control" type="text" id="descricao"
                        placeholder="Descreva os detalhes da coleção"></textarea>
                    <label for="imagem">Imagem</label>

                    <div className="input-group">
                        <input hidden type="file" id="imagem" onchange="mudarNome(this)" />
                        <label className="custom-file-label" for="imagem">Escolha uma imagem para a coleção...</label>
                    </div>

                    <div className={EstiloEditarColecao.botao}>
                        <button type="submit" className={`${EstiloEditarColecao.btn} btn mt-5`} id={EstiloEditarColecao.salvar} onclick="salvarDados()">Salvar Alterações</button>
                    </div>

                </form>

            </div>

        </div>

    </div>
    )
}

export default EditarColecao;
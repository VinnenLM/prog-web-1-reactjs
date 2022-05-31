import React from "react";
import './home.css';
import Bola from '../../assets/img/bola.png';
import Cores from '../../assets/img/rainbow-circle.png';
import Urso from '../../assets/img/urso.png';
import Arvore from '../../assets/img/arvore.png';

function Home() {
    return(
        
        <main>

        <div class="container-principal botao">
            <a href="nova-colecao.html" class="btn btn-default">Nova Coleção</a>
        </div>

        <div class="container-principal">

            <div class="cartoes">

                <div class="cartao" data-idCartao="1">
                    <div class="editar-cartao"><i class="bi bi-pencil"></i></div>
                    <div class="cartao-imagem"><img src={Bola} alt="" /></div>
                    <div class="cartao-nome">
                        <span>Objetos</span>
                    </div>
                    <div class="excluir-cartao"><i class="bi bi-trash3"></i></div>
                </div>

                <div class="cartao" data-idCartao="2">
                    <div class="editar-cartao"><i class="bi bi-pencil"></i></div>
                    <div class="cartao-imagem"><img src={Cores} alt="" /></div>
                    <div class="cartao-nome">
                        <span class="teste">Cores</span>
                    </div>
                    <div class="excluir-cartao"><i class="bi bi-trash3"></i></div>
                </div>

                <div class="cartao" data-idCartao="3">
                    <div class="editar-cartao"><i class="bi bi-pencil"></i></div>
                    <div class="cartao-imagem"><img src={Urso} alt="" /></div>
                    <div class="cartao-nome">
                        <span>Animais</span>
                    </div>
                    <div class="excluir-cartao"><i class="bi bi-trash3"></i></div>
                </div>
                <div class="cartao" data-idCartao="4">
                    <div class="editar-cartao"><i class="bi bi-pencil"></i></div>
                    <div class="cartao-imagem"><img src={Arvore} alt="" /></div>
                    <div class="cartao-nome">
                        <span>Adjetivos</span>
                    </div>
                    <div class="excluir-cartao"><i class="bi bi-trash3"></i></div>
                </div>

            </div>

        </div>

        <div class="modal fade" id="myModal" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Exclusão</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>Tem certeza que deseja remover essa coleção? Isso excluirá todos os cartões contidos nela.
                        </p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" id="excluir">Sim</button>
                        <button type="button" class="btn btn-primary" data-dismiss="modal">Cancelar</button>
                    </div>
                </div>
            </div>
        </div>

    </main>

    )
}

export default Home;
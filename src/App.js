import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import Login from './view/login';
import Cadastro from './view/cadastro';
import Home from './view/home';
import Cartao from './view/cartao';
import EditarCartao from './view/editar-cartao';
import EditarColecao from './view/editar-colecao';
import Index from './view/index';
import NovaColecao from './view/nova-colecao';
import NovoCartao from './view/novo-cartao';
import NavBar from './components/navbar';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/cadastro' element={<Cadastro />} />
          <Route path='/editar-cartao/:idColecao/:idCartao' element={<EditarCartao />} />
          <Route exact path='/nova-colecao' element={<NovaColecao />} />
          <Route exact path='/novo-cartao' element={<NovoCartao />} />
          <Route exact path='/home' element={<Home />} />
          <Route path='/cartao/:idColecao' element={<Cartao />} />
          <Route exact path='/index' element={<Index />} />
          <Route path='/editar-colecao/:idColecao' element={<EditarColecao />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

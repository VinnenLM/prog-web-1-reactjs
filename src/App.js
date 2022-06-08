import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './view/login';
import Cadastro from './view/cadastro';
import Home from './view/home';
// import Cartao from './view/cartao';
// import EditarCartao from './view/editar-cartao';
// import EditarColecao from './view/editar-colecao';
// import Index from './view/index';
import NovaColecao from './view/nova-colecao';
import NovoCartao from './view/novo-cartao';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/cadastro' element={<Cadastro />} />
        {/* <Route exact path='/cartao' element={<Cartao />} />
        
        <Route exact path='/editar-cartao' element={<EditarCartao />} />
        <Route exact path='/editar-colecao' element={<EditarColecao />} />
        <Route exact path='/index' element={<Index />} />
         */}
         <Route exact path='/nova-colecao' element={<NovaColecao />} />
         <Route exact path='/novo-cartao' element={<NovoCartao />} />
         <Route exact path='/home' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

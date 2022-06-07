import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './view/login';
import Cadastro from './view/cadastro';
import Home from './view/home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/cadastro' element={<Cadastro />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

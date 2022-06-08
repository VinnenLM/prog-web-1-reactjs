import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

//react-router-dom -> utilizado para permitir rotas entre páginas
//react-redux -> utilizado para salvar o estado da aplicação numa store, utilizar junto do redux
//@reduxjs/toolkit usar ele no lugar do redux que ta mais atualizado
//importar o Redirect do router-dom para redirecionamento de paginas
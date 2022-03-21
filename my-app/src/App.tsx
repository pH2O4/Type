import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route} from 'react-router-dom'

import Cadastro from './componentes/Cadastro'
import Login from './componentes/login'
import Main from './componentes/Main'
import Users from './componentes/Users'
import ProductsRegister from './componentes/ProductsRegister'

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/Main" element={<Main firtButton="Products Register" secondButton="Shearch Products" />} />
      <Route path="/Register" element={<ProductsRegister/>} />
      <Route path="/Cadastro" element={<Cadastro/>} />
      <Route path="/Users" element={<Users/>} />
    </Routes>
    </div>

  );
}

export default App;

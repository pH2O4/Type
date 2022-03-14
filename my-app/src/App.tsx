import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route} from 'react-router-dom'

import Login from './componentes/login'
import Main from './componentes/Main'
import ProductsRegister from './componentes/ProductsRegister'

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/Main" element={<Main firtButton="Products Register" secondButton="Shearch Products" />} />
      <Route path="/Register" element={<ProductsRegister/>} />
    </Routes>
    </div>
    
  );
}

export default App;

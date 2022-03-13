import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route} from 'react-router-dom'

import Main from './componentes/Main'
import ProductsRegister from './componentes/ProductsRegister'

function App() {
  return (
    <div className="App">
      <Main firtButton="Products Register" secondButton="Shearch Products" />
      <Routes>
      <Route path="/Main" element={<Main/>} />
      <Route path="/Register" element={<ProductsRegister/>} />
    </Routes>
    </div>
    
  );
}

export default App;

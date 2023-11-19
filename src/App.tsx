import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Quiz } from './components';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Quiz/> }/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

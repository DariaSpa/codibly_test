import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ProductList from './components/ProductList';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/codibly_test' element={<ProductList />} />
      </Routes>
    </Router>
  );
};

export default App;

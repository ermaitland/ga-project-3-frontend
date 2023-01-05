import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Navbar from './components/Navbar';
import Home from './components/Home';
import ProductsIndex from './components/ProductsIndex';
import Product from './components/Product';

import './styles/App.css';
import 'react-toastify/dist/ReactToastify.css';

// window.Buffer = window.Buffer || require('buffer').Buffer;

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<ProductsIndex />} />
        <Route path='/products/:id' element={<Product />} />
      </Routes>
      <ToastContainer></ToastContainer>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Navbar from './components/Navbar';
import Home from './components/Home';
import ProductsIndex from './components/ProductsIndex';
import Product from './components/Product';
import Login from './components/Login';
import Register from './components/Register';
import GetAllBrands from './components/GetAllBrands';

import './styles/App.css';
import 'react-toastify/dist/ReactToastify.css';
import UserIndex from './components/UserIndex';
import User from './components/User';
import CreateProduct from './components/ CreateProduct';
import ReviewProduct from './components/ReviewProduct';
import CreateCategory from './components/CreateCategory';

window.Buffer = window.Buffer || require('buffer').Buffer;

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<ProductsIndex />} />
        <Route path='/products/create' element={<CreateProduct />} />
        <Route path='/products/:id' element={<Product />} />
        <Route path='/products/:id/reviews' element={<ReviewProduct />} />
        <Route path='/profile/:userId' element={<User />} />
        <Route path='/users' element={<UserIndex />} />
        <Route path='/brands' element={<GetAllBrands />} />
        <Route path='/categories/create' element={<CreateCategory />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
      <ToastContainer></ToastContainer>
    </Router>
  );
}

export default App;

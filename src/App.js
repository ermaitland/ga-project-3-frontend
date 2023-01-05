import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import GetAllBrands from './components/GetAllBrands';

import './styles/App.css';
import 'react-toastify/dist/ReactToastify.css';
import UserIndex from './components/UserIndex';
import User from './components/User';

window.Buffer = window.Buffer || require('buffer').Buffer;

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/brands' element={<GetAllBrands />} />
        <Route path='/users' element={<UserIndex />} />
        <Route path='/profile/:userId' element={<User />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
      <ToastContainer></ToastContainer>
    </Router>
  );
}

export default App;

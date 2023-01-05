import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Navbar from './components/Navbar';
import Home from './components/Home';
import GetAllBrands from './components/GetAllBrands';

import './styles/App.css';
import 'react-toastify/dist/ReactToastify.css';

// window.Buffer = window.Buffer || require('buffer').Buffer;

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/brands' element={<GetAllBrands />} />
      </Routes>
      <ToastContainer></ToastContainer>
    </Router>
  );
}

export default App;

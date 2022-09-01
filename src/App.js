import logo from './logo.svg';
import './App.css';
import Home from './Component/Home';
import Navbar from './Component/Navbar';

import { Routes, Route } from 'react-router-dom';
import Decription from './Component/Decription';
import Followers from './Component/Followers';

import Following from './Component/Followings';
function App() {
  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/followers/:login' element={<Followers />} />
        <Route path='/description/:login' element={<Decription />} />
        <Route path='/following/:login' element={<Following />} />
      </Routes>
    </div>
  );
}

export default App;

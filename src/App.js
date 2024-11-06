
import React from 'react';
import SignUp from './components/pages/Sign-up';
import Main from './components/pages/Main';
import LoginPage from './components/pages/Login';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Favourites from './components/pages/Favourites';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} /> {/* Главная страница */}
        <Route path='/favorites' element={<Favourites />} />  
        <Route path="/signup" element={<SignUp />} /> {/* Страница регистрации */}
        <Route path="/login" element={<LoginPage />} /> {/* Страница регистрации */}
      </Routes>
    </Router>

  );
}
//Todo: sign out, Hello user, onAuthStateChanged +
//Todo: favorite movies(firestore) +
//todo: sign in signout design(back option) +
//random Main(movies) +
//READY ++++++++++++++++
//debug for fun
export default App;
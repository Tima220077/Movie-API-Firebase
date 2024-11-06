import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Используем Link для навигации
import { useNavigate  } from 'react-router-dom';
import "./Sign-up.css";
import Header from '../display-components/Header';
import { auth } from '../author/firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import './Login.css'
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please enter email and password');
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log('Log in successful!', userCredential);
      console.log("Username", userCredential.user ? userCredential.user.displayName : 'No user');
      console.log('Email:', email);
      console.log('Password:', password);
      
      navigate('/');
    })
    .catch((error) => {
      console.error('Error during log in:', error);
      alert('Error during log in:\n' + error.message);
    });
  };

  return (
    <>
    <Header />
    <div className="login-page">
      <div className="login-container">
        <h1 className="login-title">Log In</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="login-button">Log In</button>
          <p className="login-text">
            Don’t have an account? <Link to="/signup" className="signup-link">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  </>
  
    
  );
}

export default Login;
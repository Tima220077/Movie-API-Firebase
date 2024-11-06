// src/SignUp.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Используем Link для навигации
import "./Sign-up.css";
import { auth } from '../author/firebase';
import { createUserWithEmailAndPassword, updateProfile  } from "firebase/auth";
import Header from '../display-components/Header';
import './Sign-up.css'
function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const name = user.displayName;
        console.log('Sign up successful!');
        console.log('Username:', username, name);
        console.log('Email:', email);
        console.log('Password:', password);
        updateProfile(user, {
          displayName: username
        }).then(() => {
          navigate('/');
          console.log('Display name updated:', user.displayName);
        }).catch((error) => {
          console.error('Error updating profile:', error);
        });
      })
      .catch((error) => {
        console.error('Error during sign up:', error);
      });
  };

  return (

    <>
      <Header />
      <div className="sign-up-page">
        <div className="sign-up-container">
          <h1>Join Us!</h1>
          <p>Create an account to start exploring movies</p>
          <form className="sign-up-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Choose a username"
              />
            </div>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
              />
            </div>
            <button type="submit" className="sign-up-button">Sign Up</button>
          </form>
          <p className="login-text">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </>    
  );
}

export default SignUp;




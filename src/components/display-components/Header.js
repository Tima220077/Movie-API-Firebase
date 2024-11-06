import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useCallback, useEffect } from 'react';
import { auth } from '../author/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import './Header.css';
export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(()=>{
    let unsubscribe = onAuthStateChanged(auth, (user)=>{
      setIsAuthenticated(!!user)
      console.log(isAuthenticated ? "logged in" : "signed out")
    })
    return()=> unsubscribe()
  },[])
// memory +

  const handleSignOut = useCallback(() => {
    signOut(auth)
      .then(() => {
        console.log('Sign out successful');
        setIsAuthenticated(false);
      })
      .catch((error) => {
        console.error('Error during sign out:', error);
      });
  }, []);
  return (
    <header className="header">
        <div className="logo">
        <h1>
          <Link to="/" className="unstyled-link">Movie API App</Link>
        </h1>
            
        </div>
        <nav>
            <ul className="nav-links">
                <li>
                    <Link to="/favorites">Favorites</Link>
                </li>
                {isAuthenticated ? (
                    <li onClick={handleSignOut}>
                    <Link to="/">Log out</Link>
                    </li>
                ) : (
                    <>
                        <li>
                            <Link to="/login">Log in</Link>
                        </li>
                        <li>
                            <Link to="/signup">Sign up</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    </header>
);

}

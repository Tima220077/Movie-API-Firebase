import React, { useCallback } from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../display-components/Header';
import { auth,db } from '../author/firebase';
import Spinner from '../display-components/Spinner';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import './Favourites.css';

const Favourites = () => {
    const [favouriteMovies, setFavouriteMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchFavouriteMovies = useCallback(async (uid) => {
        setIsLoading(true);
        const userDocRef = doc(db, "users", uid);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists() && docSnap.data().movieInfo) {
            const movieInfo = docSnap.data().movieInfo;
            setFavouriteMovies(movieInfo);
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        if (auth.currentUser) {
            fetchFavouriteMovies(auth.currentUser.uid);
        }
    }, [auth.currentUser, fetchFavouriteMovies]);

    const handleRemoveFavourite = useCallback(async (id) => {
        setIsLoading(true);
        const userDocRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
            const movies = docSnap.data().movieInfo;
            const newMovies = movies.filter((movie) => movie.imdbID !== id);
            await updateDoc(userDocRef, { movieInfo: newMovies });
            setFavouriteMovies(newMovies);
        }
        setIsLoading(false);
    }, []);
    console.log("RERENDER")
    //6 times
    //todo
    //make less rerenders
    return (
        <>
    <Header />
    {favouriteMovies.length === 0 ? (
        <div className="no-favourites">
            <div className="no-favourites-content">
                <h2>No Favourites</h2>
                <p>It looks like you haven't added any movies to your favourites yet.</p>
                <Link to="/">
                    <button className="explore-button">Explore Movies</button>
                </Link>
            </div>
        </div>
    ) : isLoading ? (
        <Spinner />
    ) : (
        <div className="favourites">
            <div className={`movie-list ${favouriteMovies.length === 1 ? 'single-movie' : ''}`}>
                {favouriteMovies.map((movie) => (
                    <div key={movie.imdbID} className="movie-card">
                        <div className="poster-container">
                            <img src={movie.Poster} alt={`${movie.Title} Poster`} />
                        </div>
                        <div className="movie-info">
                            <h3>{movie.Title}</h3>
                            <p><strong>Genre:</strong> {movie.Genre}</p>
                            <p><strong>Released:</strong> {movie.Released}</p>
                            <p><strong>Runtime:</strong> {movie.Runtime}</p>
                            <p><strong>IMDb Rating:</strong> {movie.imdbRating}</p>
                            <p className="plot"><strong>Plot:</strong> {movie.Plot}</p>
                            <button onClick={() => handleRemoveFavourite(movie.imdbID)} className="remove-button">
                                Remove from Favourites
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )}
</>

    );
};

export default Favourites;

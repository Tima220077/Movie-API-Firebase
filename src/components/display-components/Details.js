import "./Details.css";
import { auth, db } from "../author/firebase";
import { doc, getDoc, updateDoc, arrayUnion, setDoc } from "firebase/firestore";
export default function DetailsCard({ details, getBack }) {

async function addDetailsToFavourites() {
  if(!auth.currentUser) {
    return;
  }
  
  const userRef = doc(db, "users", auth.currentUser.uid);
  const userDoc = await getDoc(userRef);
  if (userDoc.exists()) {
    await updateDoc(userRef, {
      movieInfo: arrayUnion(details) //Adds when not duplicate
  });
  console.log("Added to favourites");
  }else{
    await setDoc(userRef, {
      movieInfo: [details]
    });
    console.log("Added to favourites");
  }
  
}
if (details.Poster === "N/A") {
  details.Poster = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1200px-No-Image-Placeholder.svg.png"
}
  return (
    <div id="together" className="container">
    <div className="image-button-container">
        <div className="image-overlay">
            <img className="img-d" src={details.Poster} alt={details.Title} />
            <button className="favourite-button" onClick={() => addDetailsToFavourites()}>
                ★ Add to Favourites
            </button>
        </div>
    </div>
    <div className="details-card">
        <h2 className="movie-title">{details.Title}</h2>
        <div className="movie-meta">
            <p><strong>Runtime:</strong> {details.Runtime}</p>
            <p><strong>IMDb Rating:</strong> {details.imdbRating}/10</p>
            <p><strong>Year:</strong> {details.Year} <span role="img" aria-label="calendar">📅</span></p>
            <p><strong>Genre:</strong> {details.Genre} <span role="img" aria-label="clapperboard">🎬</span></p>
            <p><strong>Director:</strong> {details.Director} <span role="img" aria-label="movie camera">🎥</span></p>
        </div>
        <div className="movie-plot">
            <p><strong>Plot:</strong> {details.Plot} <span role="img" aria-label="scroll">📜</span></p>
        </div>
        <button className="back-button" onClick={() => getBack(true)}>
            🔙 Back
        </button>
    </div>
  </div>
  );
  
  
  }
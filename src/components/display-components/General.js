import "./General.css"
const General = ({ movies, getDetails}) => {
  return (
    <div className="Main">
      {movies.map((movie, index) => (
        <div className="card" key={index}>
          <div className="poster-container">
            <img className="poster" src={movie.Poster} alt={movie.Title} />
            <div className="overlay">
              <button onClick={() => getDetails(movie.imdbID, true)} className="btn">Read More</button>
            </div>
          </div>
          <div className="card-content">
            <h2 className="name">{movie.Title}</h2>
            <p className="text">{movie.Year}</p>
          </div>
        </div>
      ))}
    </div>
  );
  
}
export default General
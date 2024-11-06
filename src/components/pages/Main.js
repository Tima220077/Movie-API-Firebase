import { useState, useEffect, useCallback, useTransition, useMemo } from "react";
import General from "../display-components/General";
import Details from "../display-components/Details";
import Header from "../display-components/Header";
import Search from "../display-components/Search";
import Spinner from "../display-components/Spinner";
export default function Main() {
  // Titles: https://omdbapi.com/?s=${name}&page=1&apikey={apikey}
  // details: http://www.omdbapi.com/?i=${id}&apikey=${apikey}
  const API_KEY = "e12b3f65"
  const API_URL = "https://www.omdbapi.com/"
  const [movies, setMovies] = useState([])
  const [name, setName] = useState(null)
  const [bool, setBool] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const [isPending, startTransition] = useTransition()
  const [isLoading, setIsLoading] = useState(false);
  

//usememo
  // const fetchMovies = useCallback(
  //   async (val) => {
  //     try {
  //       const response = await fetch(`${API_URL}?s=${val}&page=1&apikey=${API_KEY}`)
  //       const data = await response.json()
  //       console.log("DATA")
  //       if (data.Search !== undefined) {
  //         for (let val of data.Search) {
  //           if (val.Poster === "N/A") {
  //             val.Poster = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1200px-No-Image-Placeholder.svg.png"
  //           }
  //         }
  //       }
  //       setMovies(data.Search)
  //       setBool(false)
  //       console.log("MAIN")
  //     } catch (error) {
  //       console.error("Error fetching movies:", error);
  //     }
  //   },
  //   [API_KEY, API_URL]
  // )

  const fetchMovies = useCallback(
    async (val) =>  {
    try {
      setIsLoading(true)
      startTransition(() => {
        return fetch(`${API_URL}?s=${val}&page=1&apikey=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
          if(!(data.Response === "False")) {
            setMovies(data.Search)
            setBool(false)
            if (data.Search !== undefined) {
                      for (let val of data.Search) {
                        if (val.Poster === "N/A") {
                          val.Poster = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1200px-No-Image-Placeholder.svg.png"
                        }
                      }}
            console.log(data)
          }
          setIsLoading(false)
        })
        .catch(error => {
          console.error("Error fetching movies:", error);
          setIsLoading(false);
        });
      })
    } catch (error) {
      return console.error("Error fetching movies:", error);
    }
  }, [API_KEY, API_URL])

  
  
  async function getDetails(id, boolean) {
    setIsLoading(true);
    startTransition(() => {
      return fetch(`${API_URL}?i=${id}&apikey=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
          setName(data)
          setBool(true)
          setIsLoading(false);
          console.log("DETAILS", data)
        })
        .catch(error => {
          console.error("Error getting details:", error);
          setIsLoading(false);
        });
    });
  }

  function getBack(boolean) {
    setBool(false)
  }
// Search .js functionality
  function searchFunc(inp) {
    setBool(false)
    setSearchInput(inp)
  }

  useEffect(() => {
    const movieKeywords = [
      "Love", "Revenge", "War", "Death", "Lost", 
      "Girl", "Night", "Secret", "City", "Mystery", 
      "Last", "World", "Dream", "Escape", "Stranger", 
      "Fight", "King", "Hero", "Family", "Adventure", 
      "Time", "Battle", "Murder", "Life", "Man", 
      "Space", "Blood", "Ghost", "Story", "Plan",
      "Rise", "Shadow", "Island", "Nightmare", "Truth",
      "Dead", "Journey", "Warrior", "Queen", "Power",
      "Future", "Crime", "Revolution", "Soldier", "Kingdom",
      "Survival", "Rebirth", "Fate", "Legend", "Escape",
      "Friendship", "Mission", "Witch", "Angel", "Detective"
  ];
    // Pick a random movie from the moviesList only when the component mounts
    const randomMovie = movieKeywords[Math.floor(Math.random() * movieKeywords.length)];
    setSearchInput(randomMovie);
  }, []); 

  useEffect(() => {
    if (searchInput) {
      fetchMovies(searchInput);
    }
  }, [fetchMovies, searchInput]); // Fetch movies whenever searchInput changes

    return(
      <>
      <Header />
      <Search searchFunc={searchFunc} />
      {
      isLoading ? 
      <Spinner />
      :
      bool ? 
      <Details getBack={getBack} details={name} /> 
      : 
      <General getDetails={getDetails} movies={movies} />
      }      
      </>
      )
  
}


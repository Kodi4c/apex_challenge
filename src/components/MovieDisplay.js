//*********************************************** */
//
//          Movie Display JS
//
//
//*********************************************** */


import React, {useState, useEffect, useRef} from 'react'

import "./MovieDisplay.css"
import { gql, useQuery } from '@apollo/client';
import eventBus from './Eventbus';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

const OMBD_API = "5ea585f1"
const IMDB_API ="https://www.imdb.com/title/"

function MovieDisplay() {

    let day = [];
    let month = [];
    let year = "";
    let splitDate ="";
    // let specificUrl = ""
    let individualMovie = {}
    let commonMovieData = []
    
    let [movieReceiver, setMovieReceiver] = useState("");
    let specificUrl = useRef("")


    useEffect(() => {
        // console.log("RECEIVER effect: ",movieReceiver)
    }, [movieReceiver]);


    eventBus.on("newSearchTerm", (data) =>{

        setMovieReceiver(movieReceiver = data)
        // console.log("RECEIVER event: ",movieReceiver)
    });
    
    const GET_MOVIES = gql`
        query SearchMovies {
            searchMovies(query: "${movieReceiver}") {
            id
            name
            overview
            releaseDate
            cast {
                id
                person {
                name
                }
                role {
                ... on Cast {
                    character
                }
                }
            }
            }
        }
    `

    const { data, loading, error } = useQuery(GET_MOVIES);
  

    const loader = () => {
        
        if (loading) {
            return <div className="query_message"><div><CircularProgress color="secondary"/></div><div>Loading...</div></div>; 
        }    
    }

    const throwError = () =>{
        
        if (error) {
            return <div className="query_message">'Error! ${error.message}'</div>
        };
    }

    if (loading) return loader();  

    if (error) return throwError() ; 

    const dateFormatter = (input) =>{

        if (input == null){
            console.log("Input 0")
        }else{
        // console.log(input)
        // console.log(typeof (input))
        splitDate = input.split("-",3) 
        year = splitDate[0]
        month = splitDate[1]
        day = splitDate[2].split("T",1)
        // console.log(day + "/" + month + "/" +  year)
        }
 
    }

    const fetchWikipedia = (movie) => {
        let url = "https://en.wikipedia.org/w/api.php"; 

        const params = {
            action: "query",
            list: "search",
            srsearch: movie,
            format: "json"
        };

        url = url + "?origin=*";
        Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

        fetch(url)
            .then(function(response){return response.json();})
            .then(function(response) {console.log(response);})
            .catch(function(error){console.log(error);});
    }

    const fetchImdb = (movie) =>{

        let url = "http://www.omdbapi.com/?apikey=" + OMBD_API + "&"; 

        const params = {
            s: movie,
            type: "movie",
            r: "json"
        };

        url = url + "?origin=*";
        Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

        fetch(url)
            .then((response) => {return response.json();})
            .then((data) => {
                specificUrl = IMDB_API + data.Search[0].imdbID
                console.log(specificUrl)
                commonMovieData["specificUrl"] = specificUrl
                // console.log(commonMovieData)
            })
            .catch((error) => {console.log(error);});

    }
    // const handleClick = (movie) =>{
    //     // fetchWikipedia(movie)
    //     fetchImdb(movie)

    // }

    const fetchOne = () => {
        commonMovieData = []
        
        data.searchMovies.map(movie => {
            
            // individualMovie = individualMovie + String(counter)

            console.log(movie)
            individualMovie["id"] = movie.id
            individualMovie["name"] = movie.name
            individualMovie["releaseDate"] = movie.releaseDate
            individualMovie["overview"] = movie.overview
            
            let tmp = Object.assign({}, individualMovie);

            commonMovieData.push(tmp)
            fetchImdb(movie.name)
            console.log(commonMovieData)
            
        
            // movieReleaseDate = movie.releaseDate
            // movieName = movie.name
            // movieOverview = movie.overview
        });
        
        // console.log(commonMovieData)

    }

    // const fetchTwo = () => {
    //     {commonMovieData.map(movie => (
            
            
    //         fetchImdb(movie.name)
            
    //         // movieReleaseDate = movie.releaseDate
    //         // movieName = movie.name
    //         // movieOverview = movie.overview
            
            
    //         ))};

    // }


    return (

        <div id ="display_container">
            
           {fetchOne()}
           {/* {fetchTwo()} */}
            {/* {data.searchMovies.map(movie => (
                  
                  <Box id = "box">
                     # : {movie.id}<br/>
                     {dateFormatter(movie.releaseDate)}
                     Release Date : {year}/{month}/{day}<br/>
                     {fetchImdb(movie.name)}
                     <a href={specificUrl.current} 
                        // onClick={handleClick(movie.name)}  
                        target="_blank"
                        rel="noreferrer">
                            {movie.name}</a><br/>
                     {movie.overview}<br/><br/>
  
                  </Box>
  
                  ))}; */}

            
        </div>
    )
}

export default MovieDisplay
//*********************************************** */
//
//          Movie Display JS
//
//
//*********************************************** */


import React, {useState, useEffect} from 'react'

import "./MovieDisplay.css"
import { gql, useQuery } from '@apollo/client';
import eventBus from './Eventbus';

function MovieDisplay() {

    let [movieReceiver, setMovieReceiver] = useState("");

    useEffect(() => {
        console.log("RECEIVER effect: ",movieReceiver)
    }, [movieReceiver]);

    eventBus.on("newSearchTerm", (data) =>{

        setMovieReceiver(movieReceiver = data)
        console.log("RECEIVER event: ",movieReceiver)
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
  
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    let day = [];
    let month = [];
    let year = "";
    let splitDate ="";


    const dateFormatter = (input) =>{

        if (input == null){
            console.log("Input 0")
        }else{
        console.log(input)
        console.log(typeof (input))
        splitDate = input.split("-",3) 
        year = splitDate[0]
        month = splitDate[1]
        day = splitDate[2].split("T",1)
        console.log(day + "/" + month + "/" +  year)
        }
 
    }


    return (

        <div>
            

            {data.searchMovies.map(movie => (
                  
                  <div>
                     # : {movie.id}<br/>
                     {dateFormatter(movie.releaseDate)}
                     Release Date : {year}/{month}/{day}<br/>
                     {movie.name}<br/>
                     {movie.overview}<br/><br/>
  
                  </div>
  
                  ))};

            
        </div>
    )
}

export default MovieDisplay

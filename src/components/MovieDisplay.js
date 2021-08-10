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

function MovieDisplay({ onMovieSelected }) {

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
    `;

    const { data, loading, error } = useQuery(GET_MOVIES);
  
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;


    return (

        <div>
            

            {data.searchMovies.map(movie => (
                  
                  <div>
                     {movie.id}<br/>
                     {movie.releaseDate}<br/>
                     {movie.name}<br/>
                     {movie.overview}<br/><br/>
  
                  </div>
  
                  ))};

            
        </div>
    )
}

export default MovieDisplay

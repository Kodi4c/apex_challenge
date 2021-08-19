//*********************************************** */
//
//          Query Component JS
//
//
//*********************************************** */

import React, {useState, useEffect} from 'react'
import { gql, useQuery } from "@apollo/client";
import CircularProgress from '@material-ui/core/CircularProgress';
import MovieDisplay from './MovieDisplay';
import eventBus from './Eventbus';

function QueryComponent() {

    let [movieReceiver, setMovieReceiver] = useState("");

    useEffect(() => {
        
    }, [movieReceiver]);

    eventBus.on("newSearchTerm", (data) =>{
        setMovieReceiver(movieReceiver = data)
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


    if (loading) return <div className="query_message"><div><CircularProgress color="secondary"/></div><div>Loading...</div></div>;  
        
    if (error) return <div className="query_message">'Error! ${error.message}'</div> ; 

    return (
        <div>
            {/* {console.log(data)} */}
            <MovieDisplay queryData = {data.searchMovies}/>
        </div>
    )
}

export default QueryComponent

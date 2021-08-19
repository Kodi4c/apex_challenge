//*********************************************** */
//
//          Movie Display JS
//
//
//*********************************************** */


import React, {useState, useEffect} from 'react'

import "./MovieDisplay.css"
import Box from '@material-ui/core/Box';
import DetailBox from './DetailBox'; 

const OMBD_API = "5ea585f1"
const IMDB_API ="https://www.imdb.com/title/"



function MovieDisplay({queryData}) {

    let day = [];
    let month = [];
    let year = "";
    let splitDate ="";
    let individualMovie = {};
    let specificUrl = "";
    let tmp = {};

    let [commonMovieData, setCommonMovieData] = useState([]);
    
       
    useEffect(() => {
        // setCommonMovieData(commonMovieData = [])
        setCommonMovieData(commonMovieData = [])
        fetchImdbDatabase(queryData)
        
    }, [queryData]);

    
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

    const objectMaker = (movieObj, specificUrl) =>{       
        
        dateFormatter(movieObj.releaseDate)

        individualMovie["id"] = movieObj.id
        individualMovie["name"] = movieObj.name
        individualMovie["releaseDate"] = year + "/" + month + "/" + day
        individualMovie["overview"] = movieObj.overview
        individualMovie["specificUrl"] = specificUrl
        
        tmp = Object.assign({}, individualMovie);
        setCommonMovieData(commonMovieData => [...commonMovieData, tmp]);
    
    }

    const fetchImdbDatabase = (queryData) => {


        // setCommonMovieData(commonMovieData = [])
    
        queryData.map(movieObj => {
    
            // console.log("movie name fetch: ",movieObj.name)
            let url = "http://www.omdbapi.com/?apikey=" + OMBD_API + "&?origin=*"; 
            let params = {
                s: movieObj.name,
                type: "movie",
                r: "json"
            };
    
            Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});
    
            // console.log("TMDB movie: ",movieObj.name)

            fetch(url)
                .then((response) => {return response.json();})
                .then((data) => {
                    try{
                        // console.log("data from imdb: ",data.Search)
                        specificUrl = IMDB_API + data.Search[0].imdbID
                        // console.log(specificUrl)
                        objectMaker(movieObj, specificUrl)
                    }catch{
                        console.log(`Movie --> ${movieObj.name} <-- not found in IMDB database`)
                    }                    
                })
                .catch((error) => {console.log(error);});
    
            // return commonMovieData;
            return 0;
    
        });
        // console.log("imdb")
    
    }

    const handleClick = (overView, specificUrl) => {
         
        return overView
        //  <DetailBox overview = {overView} imdbLink = {specificUrl}/>
         
    }

    return (

        <div id ="display_container">

           {commonMovieData.map(movie=>{

                return(
                <Box id = "box">
                    #ID : {movie.id}<br/>
                    Release Date : {movie.releaseDate}<br/>
                    <li>
                       Title: {movie.name}
                    </li>
                    
                    <DetailBox overview = {movie.overview} imdbLink = {movie.specificUrl}/><br/><br/>
                    
                </Box>
                )
           })}

        </div>
    )
}

export default MovieDisplay
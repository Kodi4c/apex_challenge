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
    let [showDiv, setShowDiv] = useState({visibility: false, movieId: 0});  

    useEffect(() => {
        setCommonMovieData(commonMovieData = [])
        fetchImdbDatabase(queryData)
        
    }, [queryData]);

    
    const dateFormatter = (rawDate) =>{

        if (rawDate == null){
            console.log("Input 0")
        }else{
        splitDate = rawDate.split("-",3) 
        year = splitDate[0]
        month = splitDate[1]
        day = splitDate[2].split("T",1)
        }
 
    }

    const objectMaker = (movieObj, specificUrl, wikiExtract) =>{       
        
        dateFormatter(movieObj.releaseDate)

        individualMovie["id"] = movieObj.id
        individualMovie["name"] = movieObj.name
        individualMovie["releaseDate"] = year + "/" + month + "/" + day
        individualMovie["overview"] = movieObj.overview
        individualMovie["specificUrl"] = specificUrl
        individualMovie["wikiExtract"] = wikiExtract
        
        tmp = Object.assign({}, individualMovie);
        setCommonMovieData(commonMovieData => [...commonMovieData, tmp]);
    
    }

    const fetchWikipedia = (movieObj, specificUrl) => {
        let url = "https://en.wikipedia.org/api/rest_v1/page/summary/"; 

        url = url + movieObj.name;
    
        fetch(url)
            .then((response) => {return response.json();})
            .then((data) => {
                // console.log(data.extract);
                objectMaker(movieObj, specificUrl, data.extract);
            })
            .catch((error) => {console.log(error);});
    }

    const fetchImdbDatabase = (queryData) => {
    
        queryData.map(movieObj => {
    
            let url = "http://www.omdbapi.com/?apikey=" + OMBD_API + "&?origin=*"; 
            let params = {
                s: movieObj.name,
                type: "movie",
                r: "json"
            };
    
            Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

            fetch(url)
                .then((response) => {return response.json();})
                .then((data) => {
                    try{
                        specificUrl = IMDB_API + data.Search[0].imdbID
                        fetchWikipedia(movieObj, specificUrl)
                    }catch{
                        console.log(`Movie --> ${movieObj.name} <-- not found in IMDB database`)
                    }                    
                })
                .catch((error) => {console.log(error);});

            return 0;
        });
    
    }

    const handleClick = (currentVisibility, passedMovieId) => {
       setShowDiv({...showDiv, visibility : !currentVisibility , movieId: passedMovieId})
    }


    return (

        <div id ="display_container">

           {commonMovieData.map(movie=>{

                return(
                <Box id = "box" key={movie.id}>
                    #ID : {movie.id}<br/>
                    Release Date : {movie.releaseDate}<br/>
                    <li onClick = {() => handleClick(showDiv.visibility, movie.id)}>
                       Title: {movie.name}
                    </li><br/>
                    
                    {showDiv.visibility && showDiv.movieId === movie.id ? <DetailBox id = {movie.id} overview = {movie.overview} imdbLink = {movie.specificUrl} wikiDescription = {movie.wikiExtract}/> : null}
                    <br/><br/>
                    
                </Box>
                )
           })}

        </div>
    )
}

export default MovieDisplay
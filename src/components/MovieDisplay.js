//*********************************************** */
//
//          Movie Display JS
//
//
//*********************************************** */


import React, {useState, useEffect} from 'react'

import "./MovieDisplay.css"
import Box from '@material-ui/core/Box';

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
    // let commonMovieData = useRef([]);
    
    // let [movieReceiver, setMovieReceiver] = useState("");
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
        // console.log(typeof(tmp))
        // let newArray = [...commonMovieData];
        // newArray.push({tmp});
        setCommonMovieData(commonMovieData => [...commonMovieData, tmp]);
        // commonMovieData.push(tmp)
        // console.log("commonMovie Data :  ",commonMovieData)
        // setMd(mD.push(tmp))
        // return commonMovieData;
    
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
    
            console.log("TMDB movie: ",movieObj.name)

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
    
    const renderDisplay = () => {
        if (commonMovieData.length !== 0){
            
            {commonMovieData.map(movie=>{
                <Box id = "box">
                    # : {movie.id}<br/>
                    {dateFormatter(movie.releaseDate)}
                    Release Date : {year}/{month}/{day}<br/>
                    <a href={movie.specificUrl} 
                        // onClick={handleClick(movie.name)}  
                        target="_blank"
                        rel="noreferrer">
                            {movie.name}</a><br/>
                    {movie.overview}<br/><br/>

                </Box>

                return 0;
            })}
        }
    }

    
    return (

        <div id ="display_container">


           {/* {console.log("from movie display",queryData)} */}
           {/* {fetchImdbDatabase(queryData)} */}
           {commonMovieData.length}<br/>
            {typeof(commonMovieData)}<br/>
            {console.log(commonMovieData)}<br/>
           {/* {commonMovieData.map(movie=>{

                <Box id = "box">
                    # : {movie.id}<br/>
                    {dateFormatter(movie.releaseDate)}
                    Release Date : {year}/{month}/{day}<br/>
                    <a href={movie.specificUrl} 
                        // onClick={handleClick(movie.name)}  
                        target="_blank"
                        rel="noreferrer">
                            {movie.name}</a><br/>
                    {movie.overview}<br/><br/>
                </Box>
           })} */}

        </div>
    )
}

export default MovieDisplay
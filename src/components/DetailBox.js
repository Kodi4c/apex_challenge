//*********************************************** */
//
//          Detail Box JS
//
//
//*********************************************** */
import React, {useState} from 'react'
import Box from '@material-ui/core/Box';
import  './DetailBox.css';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';


function DetailBox({overview, imdbLink, wikiDescription}) {

    let [wikiShow, setWikiShow] = useState(false)

    const useStyles = makeStyles((theme) => ({
        root: {
          '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '50vw',
            minWidth: '50vw',
          },
        },
      }));

    const classes = useStyles();

    const handleClick = (triggerSource) => {
        {triggerSource === "wiki" ? setWikiShow(true) : setWikiShow(false)}
    }

    return (
        <div id ="detailBoxContainer">
            <Box id = "detailBox">

                <div className = "buttonContainer">
                    <a href= {imdbLink}
                    target = "_blank"
                    rel="noreferrer">
                        <Button 
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            endIcon={<SendIcon/>}>
                            IMDB Link
                        </Button>
                    </a>
                
                </div>

                
                <div className = "buttonContainer">
                    <Button 
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick = {() => handleClick("tmdb")}>
                        TMDB Movie Plot
                    </Button>
                    
                </div>
                
                <div className = "buttonContainer">
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick = {() => handleClick("wiki")}>
                        Wikipedia Movie Description
                    </Button>

                </div>
                               
            </Box><br/><br/>

            {wikiShow ? wikiDescription : overview}
            
        </div>
    )
}

export default DetailBox

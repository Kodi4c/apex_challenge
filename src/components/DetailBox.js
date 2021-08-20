//*********************************************** */
//
//          Detail Box JS
//
//
//*********************************************** */
import React from 'react'
import Box from '@material-ui/core/Box';
import  './DetailBox.css';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';


function DetailBox({overview, imdbLink, wikiDescription}) {


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


    return (
        <div id ="detailBoxContainer">
            <Box id = "detailBox">
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
                </a><br/><br/>
            
                <div>
                    Wikipedia Description<br/><br/>
                    {wikiDescription}<br/><br/>
                </div>

                <div>
                    TMDB Movie Plot<br/><br/>
                    {overview}<br/><br/>
                </div>
                
            </Box>
            
        </div>
    )
}

export default DetailBox

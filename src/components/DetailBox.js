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

function DetailBox({overview, imdbLink}) {


    // let [state, setstate] = useState(initialState)

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

    const handleClick = () => {

    }

    return (
        <div>
            <Box id = "detailBox">
                <a href= {imdbLink}
                   target = "_blank">
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<SendIcon/>}>
                        IMDB Link
                    </Button>
                </a>
            
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<SendIcon/>}
                    onClick = {() => handleClick}>
                    TMDB Description
                </Button>

                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<SendIcon/>}>
                    Wikipedia Description
                </Button><br/><br/>
                
                {overview}<br/>
                
            </Box>
            
        </div>
    )
}

export default DetailBox

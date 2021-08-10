//*********************************************** */
//
//          Search Field JS
//
//
//*********************************************** */

import React, {useState, useRef} from 'react'
import "./SearchField.css"
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import eventBus from './Eventbus';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';


function SearchField() {

    let [movieSender,setMovieSender] = useState('')


    const useStyles = makeStyles((theme) => ({
        root: {
          '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '50vw',
            minWidth: '50vw',
          },
        },
      }));

    const valueRef = useRef('')

    const classes = useStyles();

    const clearText = () =>{
        document.getElementById("outlined-basic").value = "";
    }

    const startSearch = () =>{

        console.log("value ref:",valueRef.current.value)
        setMovieSender(movieSender = valueRef.current.value)
        console.log("starting SEND: ",movieSender)
        eventBus.dispatch("newSearchTerm",movieSender)
        clearText()
        
    }
    

    return (
        <Box 
            display="flex" 
            flexDirection="column"
            justifyContent="center"
            alignItems="center">

            <Box 
                display="flex" 
                justifyContent="center"
                alignItems="center">

                <form className={classes.root} noValidate autoComplete="off">
                    <TextField 
                            id="outlined-basic" 
                            label="Search For Movies" 
                            variant="outlined" 
                            inputRef={valueRef}
                           />
                    
                </form>
            </Box>

            <Box 
                display="flex" 
                justifyContent="center"
                alignItems="center">
                
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    endIcon={<Icon>send</Icon>}
                    onClick={startSearch}
                >
                    Send
                </Button>
            </Box>
        </Box>
    )
}

export default SearchField

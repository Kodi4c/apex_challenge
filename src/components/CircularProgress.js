//*********************************************** */
//
//          Circular Progress JS
//
//
//*********************************************** */

import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


// CircularProgressWithLabel.propTypes = {
//   /**
//    * The value of the progress indicator for the determinate variant.
//    * Value between 0 and 100.
//    */
//   value: PropTypes.number.isRequired,
// };



function CircularProgress() {


  const [progress, setProgress] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 1));
    }, 50);
    return () => {
      clearInterval(timer);
    };
  }, []);


  return (
    <div>
     
      <Box position="relative" display="inline-flex">
        <CircularProgress variant="determinate" {...props} />
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontSize="25px"
        >
          <Typography variant="caption" component="div" color="textSecondary">
            {`${Math.round(props.value,)}%`}
          </Typography>
        </Box>
      </Box>
      
    </div>
  )
}

export default CircularProgress

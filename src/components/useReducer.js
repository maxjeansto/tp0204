import React, { useReducer } from 'react';
import { Button, Typography, Box } from '@mui/material';

function reducer(state, action) {
  switch (action.type) {
    case 'multiply':
        let newState = state * (Math.floor(Math.random() * 10) + 1);
      return newState < -11 ? 613 : newState;
    default:
      throw new Error();
  }
}

function UrApp() {
  const [state, dispatch] = useReducer(reducer, 1);

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh'}}>
      <Typography variant="h3" gutterBottom>{state}</Typography>
      <Button variant="contained" color="primary" onClick={() => dispatch({type: 'multiply'})}>
        Multiply by random number
      </Button>
    </Box>
  );
}

export default UrApp;

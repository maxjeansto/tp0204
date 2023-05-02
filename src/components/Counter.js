import React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";


const Counter = () => {
  const [count, setCount] = React.useState(0);
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);




  return (
    <Box sx={{ textAlign: "center", mt: 4 }}>
      <Typography variant="h2" gutterBottom>
        {count}
      </Typography>
      <Button variant="contained" color="primary" onClick={increment} sx={{ mx: 1 }}>
        Increment +
      </Button>
      <Button variant="contained" color="secondary" onClick={decrement} sx={{ mx: 1 }}>
        Increment -
      </Button>
      <Button variant="outlined" onClick={reset} sx={{ mx: 1 }}>
        Reset
      </Button>
    </Box>
  );
};

export default Counter;
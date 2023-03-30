import React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Toggle = () => {
  const [toggle, setToggle] = React.useState(true);

  return (
    <Box sx={{ textAlign: "center", mt: 4 }}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setToggle(!toggle)}
        sx={{ mb: 2 }}
      >
        Toggle
      </Button>
      {toggle && (
        <Typography variant="h4" gutterBottom>
          Toggle
        </Typography>
      )}
    </Box>
  );
};

export default Toggle;

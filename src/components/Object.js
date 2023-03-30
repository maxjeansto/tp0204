import React, { useState } from "react";
import { Button, Box, Typography } from "@mui/material";

const ExempleObject = () => {
  const [state, setState] = useState({
    id: 1,
    metier: "Fullstack developer",
    niveau: "en formation",
  });

  const handleClickJunior = () => {
    setState((prevState) => ({ ...prevState, niveau: "Junior" }));
  };

  const handleClickSenior = () => {
    setState((prevState) => ({ ...prevState, niveau: "Senior" }));
  };

  const handleClickIntermediaire = () => {
    setState((prevState) => ({ ...prevState, niveau: "Intermediare" }));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
       
       
      }}
    >
      <Typography variant="h4" sx={{ mb: 3 }}>
        {state.metier} {state.niveau}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "60%",
          alignItems: "center",
        }}
      >
        <Button variant="contained" color="primary" onClick={handleClickJunior}>
          Dans 3 mois je serais
        </Button>
        <Button variant="contained" color="secondary" onClick={handleClickIntermediaire}>
          Dans 1 an je serais
        </Button>
        <Button variant="contained" color="success" onClick={handleClickSenior}>
          Dans 5 ans je serais
        </Button>
      </Box>
    </Box>
  );
};

export default ExempleObject;

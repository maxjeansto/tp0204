import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import {
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import Alert from '@mui/material/Alert';
import {setAuth} from "./redux/slices/auth.slice"
import { useDispatch } from 'react-redux';



const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorAuth, setErrorAuth] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

const dispatch = useDispatch()


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }



  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
    axios.get('https://react-1604-fbde33.appdrag.site/api/checkUsers', {
      params: {
        "email": email,
        "password": password,
        "AD_PageNbr": "1",
        "AD_PageSize": "500"
      }
    }).then(function (response) {
      if (response.data.Table.length === 0) {
        setErrorAuth(true)
      } else {
        setErrorAuth(false)
        console.log('autho reussie')
        localStorage.setItem("tokenBlog", response.data.Table[0].token)
        dispatch(setAuth(response.data.Table[0]))
        navigate("/")
      }
    });
  }

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={5}>
        <Paper elevation={6} sx={{ padding: 2, marginTop: 10 }}>
          <LockOutlined sx={{ fontSize: 40, mb: 1 }} />
          <Typography component="h1" variant="h5">
            Connexion
          </Typography>
          <Box sx={{ mt: 1, width: '100%' }}>
            <form onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Adresse e-mail"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={handleEmail}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Mot de passe"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={handlePassword}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={showPassword}
                    onChange={togglePasswordVisibility}
                  />
                }
                label="Afficher le mot de passe"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}

              >
                Se connecter
              </Button>
            </form>
            {errorAuth && <Alert severity="error" sx={{ mt: 2 }}>
              L'adresse e-mail ou le mot de passe est incorrect.
            </Alert>}
          </Box>

        </Paper>
      </Grid>
    </Grid>
  );
};

export default LoginPage;

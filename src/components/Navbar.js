import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Collapse from '@mui/material/Collapse';
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import DropI18N from './dropI18N';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getToken } from './redux/slices/auth.slice';
import { ThemeContext } from './theme';
import { Brightness4 } from '@mui/icons-material';



function Navbar() {



  const { toggleTheme } = React.useContext(ThemeContext);
  const { t } = useTranslation()
  const getTokenSlice = useSelector(getToken)

  const mainLinks = [
    { path: '/portfolio', label: t("nav.portfolio"), authRequired: false },
    { path: '/useffect', label: t("nav.Blog"), authRequired: true },
    { path: '/cv', label: t("nav.Resume"), authRequired: false },
    { path: '/addarticle', label: t("nav.Add Article"), authRequired: true }

  ];

  const menuLinks = [
    { path: '/list', label: t("nav.Listing"), authRequired: true },
    { path: '/counter', label: t("nav.Counter"), authRequired: true },
    { path: '/toogle', label: t("nav.Toggle"), authRequired: true },
    { path: '/object', label: t("nav.Object"), authRequired: true },
    { path: '/usereducerapp', label: t("UseReducer"), authRequired: true },
  ];





  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [collapseOpen, setCollapseOpen] = useState(false);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleClick = () => {
    setCollapseOpen(!collapseOpen);
  };


  const drawer = (
    <List>
      <ListItem> <DropI18N /></ListItem>
      <ListItem> <IconButton
              color="inherit"
              aria-label="Toggle theme"
              onClick={toggleTheme}  // Ajoutez cette ligne
            >
              <Brightness4 /> 
            </IconButton></ListItem>
      {mainLinks
        .filter((link) => getTokenSlice || !link.authRequired)
        .map((link, index) => (
          <ListItem button key={`${link.path}-${index}`} component={Link} to={link.path} onClick={toggleDrawer(false)}>
            <ListItemText primary={link.label} />
          </ListItem>
        ))}
      {getTokenSlice ? (<ListItem button onClick={handleClick}>
        <ListItemText primary="React JS" />
        {collapseOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      ) : (''

      )}

      {getTokenSlice ? (
        <ListItem onClick={() => {
          localStorage.setItem("tokenBlog", "")
          window.location.reload()
        }}>
          <ListItemText primary={t("nav.logout")} />
        </ListItem>) : (<ListItem component={Link}
          to="/login">
          <ListItemText primary={t("nav.login")} /> </ListItem>)}


      <Collapse in={collapseOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {menuLinks
            .filter((link) => getTokenSlice || !link.authRequired)
            .map((link, index) => (
              <ListItem button key={`${link.path}-${index}`} component={Link} to={link.path} onClick={toggleDrawer(false)} sx={{ pl: 4 }}>
                <ListItemText primary={link.label} />
              </ListItem>
            ))}
        </List>

      </Collapse>

    </List>
  );

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 1 }}>
            {mainLinks
              .filter((link) => getTokenSlice || !link.authRequired)
              .map((link, index) => (
                <Button
                  key={`${link.path}-${index}`}
                  component={Link}
                  to={link.path}
                  sx={{
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  <Typography variant="body1">{link.label}</Typography>
                </Button>
              ))}


            {getTokenSlice ? (
              <Button
                aria-controls="menu"
                aria-haspopup="true"
                onClick={handleMenuClick}
                sx={{
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                <Typography variant="body1">React JS</Typography>
              </Button>) : ("")}



            <Menu
              id="menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {menuLinks
                .filter((link) => getTokenSlice || !link.authRequired)
                .map((link, index) => (
                  <MenuItem
                    key={`${link.path}-${index}`}
                    component={Link}
                    to={link.path}
                    onClick={handleMenuClose}
                  >
                    <Typography variant="body1">{link.label}</Typography>
                  </MenuItem>
                ))}
            </Menu>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <IconButton
              color="inherit"
              aria-label="Toggle theme"
              onClick={toggleTheme}  // Ajoutez cette ligne
            >
              <Brightness4 /> 
            </IconButton>
            <DropI18N />
            {getTokenSlice ? (<Button
              onClick={() => {
                localStorage.setItem("tokenBlog", "")
                window.location.reload()
              }}
              sx={{
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              <Typography variant="body1">{t("nav.logout")}</Typography>
            </Button>) : (

              <Button
                component={Link}
                to="/login"
                sx={{
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                <Typography variant="body1">{t("nav.login")}</Typography>
              </Button>)}

          </Box>

          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
}

export default Navbar;
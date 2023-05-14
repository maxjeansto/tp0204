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
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import DropI18N from './dropI18N';
import { useTranslation } from 'react-i18next';



function Navbar() {
  const [isAuth, setisAuth] = useState(false);

  const { t } = useTranslation()

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
  ];


  useEffect(() => {
    if (localStorage.getItem("tokenBlog")) {
      console.log("localstorage plein je suis auth")
      setisAuth(true)

    } else {
      console.log("je suis pa auth")
      setisAuth(false)
    }
  }, []);



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
      {mainLinks
        .filter((link) => isAuth || !link.authRequired)
        .map((link, index) => (
          <ListItem button key={`${link.path}-${index}`} component={Link} to={link.path} onClick={toggleDrawer(false)}>
            <ListItemText primary={link.label} />
          </ListItem>
        ))}
      {isAuth ? (<ListItem button onClick={handleClick}>
        <ListItemText primary="React JS" />
        {collapseOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      ) : (''

      )}

      {isAuth ? (
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
            .filter((link) => isAuth || !link.authRequired)
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
              .filter((link) => isAuth || !link.authRequired)
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


            {isAuth ? (
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
                .filter((link) => isAuth || !link.authRequired)
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
            <DropI18N />
            {isAuth ? (<Button
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
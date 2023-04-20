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

const mainLinks = [
  { path: '/portfolio', label: 'Portfolio' },
  { path: '/useffect', label: 'Blog' },
  { path: '/cv', label: 'CV' },
];

const menuLinks = [
  { path: '/list', label: 'Listing' },
  { path: '/counter', label: 'Counter' },
  { path: '/toogle', label: 'Toggle' },
  { path: '/object', label: 'Object' },
];

function Navbar() {
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
      {mainLinks.map((link, index) => (
        <ListItem button key={`${link.path}-${index}`} component={Link} to={link.path} onClick={toggleDrawer(false)}>
          <ListItemText primary={link.label} />
        </ListItem>
      ))}
      <ListItem button onClick={handleClick}>
        <ListItemText primary="React JS" />
        {collapseOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={collapseOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {menuLinks.map((link, index) => (
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
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {mainLinks.map((link, index) => (
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
            </Button>
            <Menu
              id="menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {menuLinks.map((link, index) => (
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
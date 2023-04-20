import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import React, { useState } from "react";
import { Link } from 'react-router-dom';



const links = [
    { path: '/list', label: 'Listing' },
    { path: '/counter', label: 'Counter' },
    { path: '/toogle', label: 'Toggle' },
    { path: '/object', label: 'Object' },
];

const menu = [
    { path: '/portfolio', label: 'portfolio' },
    { path: '/useffect', label: 'blog' },
    { path: '/cv', label: 'cv' },

];

function Navbar() {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Button
                        color="inherit"
                        aria-label="menu"
                        size='small'
                        onClick={handleClick}
                        sx={{
                            color: 'white', display: 'block',
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.1)'
                            }
                        }}
                    >
                     <Typography variant="body1">REACT JS</Typography>  
                    </Button>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        {links.map((link, index) => (
                            <MenuItem
                                key={`${link.path}-${index}`}
                                component={Link}
                                to={link.path}
                                onClick={handleClose}
                            >
                                <Typography variant="body1">{link.label}</Typography>
                            </MenuItem>
                        ))}

                    </Menu>
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        {menu.map((menu, index) => (

                            <Button
                                key={`${menu.path}-${index}`}
                                component={Link}
                                to={menu.path}
                                onClick={handleClose}
                                sx={{
                                    textAlign: 'center',color: 'white', display: 'block',
                                '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)'
                                    }
                                }}
                            >
                                <Typography variant="body1">{menu.label}</Typography>
                            </Button>
                        ))}</Box>




                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Navbar;

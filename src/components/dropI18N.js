import React from 'react';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import flagEnglish from '../assets/flags/flagEnglish.png'
import logoFr from '../assets/flags/drapeauFr.png'
import { Menu, MenuItem, IconButton } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import logoIsrael from '../assets/flags/israel.png'

const DropI18N = () => {

    useTranslation();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClickMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    function handleClick(lang) {
        i18next.changeLanguage(lang);
        console.log('lang', lang)
        handleClose();
    }

    return (
        <>
            <IconButton onClick={handleClickMenu}>
                <LanguageIcon sx={{color: 'white'}} />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={() => handleClick('fr')}>
                    <img width="35px" style={{ marginRight: '5px' }} src={logoFr} alt="logo France" />Français
                </MenuItem>
                <MenuItem onClick={() => handleClick('en')}>
                    <img width="36px" style={{ marginRight: '5px' }} src={flagEnglish} alt="logo Angleterre" />English
                </MenuItem>
                <MenuItem onClick={() => handleClick('he')}>
                    <img width="36px" style={{ marginRight: '5px' }} src={logoIsrael} alt="logo Israel" />עִברִית
                </MenuItem>
            </Menu>
        </>
    )
}

export default DropI18N

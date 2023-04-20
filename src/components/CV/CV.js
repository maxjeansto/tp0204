import React, { useEffect, useState } from "react";
import {
    Container,
    Grid,
    Typography,
    Box,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Avatar,
    ListItem,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import { Email, Phone, LocationOn, ExpandMore } from "@mui/icons-material";
import { deepOrange } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';


const Curriculum = () => {
    const theme = useTheme();
    const [userInfo, setUserInfo] = useState();
    const [workInfo, setWorkInfo] = useState();

    useEffect(() => {
        axios.post('https://react-1604-fbde33.appdrag.site/api/getInfo', {
            "AD_PageNbr": "1",
            "AD_PageSize": "500"
        }).then(function (response) {
            console.log(response.data);
            setUserInfo(response.data.Table);
        });

    }, [])

    useEffect(() => {
        axios.get('https://react-1604-fbde33.appdrag.site/api/getWork', {
            params: {
                "AD_PageNbr": "1",
                "AD_PageSize": "500"
            }
        }).then(function (response) {
            console.log(response.data);
            setWorkInfo(response.data.Table)
        });

    }, [])



    return (
        <Container maxWidth="md">
            <Box mt={4} p={2} style={{ backgroundColor: theme.palette.secondary.main, borderRadius: theme.shape.borderRadius }}>
                {userInfo?.map((userInfo, index) => (
                    <Grid container alignItems="center" key={index}>
                        <Grid item>
                            <Avatar src={userInfo.avatar} sx={{ bgcolor: deepOrange[500], width: 130, height: 130, }}>MS</Avatar>
                        </Grid>
                        <Grid maxHeight={70} ml={5}>
                            <Typography variant="h5" component="h5" gutterBottom style={{ color: "white", margin: 0 }}>
                                Maxime Elie Saada
                            </Typography>
                            <Typography variant="subtitle1" component="h2" gutterBottom style={{ color: "white" }}>
                                Développeur Full Stack
                            </Typography>
                        </Grid>

                    </Grid>))}

            </Box>


            <Box style={{ backgroundColor: '#f5f5f5', padding: theme.spacing(2), borderRadius: theme.shape.borderRadius }}>
                {userInfo?.map((userInfo, index) => (
                    <Box my={2} key={index}>
                        <Typography variant="h6" component="h3">
                            Informations de contact
                        </Typography>
                        <ListItem disableGutters>
                            <ListItemIcon>
                                <Email />
                            </ListItemIcon>
                            <ListItemText primary={userInfo.mail} />
                        </ListItem>
                        <ListItem disableGutters>
                            <ListItemIcon>
                                <Phone />
                            </ListItemIcon>
                            <ListItemText primary={userInfo.number} />
                        </ListItem>
                        <ListItem disableGutters>
                            <ListItemIcon>
                                <LocationOn />
                            </ListItemIcon>
                            <ListItemText primary={userInfo.adress} />
                        </ListItem>
                    </Box>))}
                    
                <Box my={2} >
                    <Typography mb={1} variant="h6" component="h3" style={{ color: theme.palette.secondary.main }}>
                        Expérience professionnelle
                    </Typography>
                    {workInfo?.map((workInfo) => (
                    <Box key={workInfo.id} mb={1}>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                            <Typography sx={{ mr: 3, fontWeight: "bold" }} variant="subtitle1">{workInfo.title}</Typography>
                            <Typography variant="subtitle2" color="text.secondary">
                                {workInfo.date}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant="body1">
                               {workInfo.resume}
                            </Typography>
                        </AccordionDetails>
                    </Accordion></Box>))}
                </Box>
                <Box my={2}>
                    <Typography variant="h6" component="h3" style={{ color: theme.palette.secondary.main }}>
                        Formation
                    </Typography>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                            <Typography  sx={{ mr: 3, fontWeight: "bold" }} variant="subtitle1">BAC - Ecole Moria </Typography>
                            <Typography variant="subtitle2" color="text.secondary">
                                1999
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant="body1">
                               Bac S
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                            <Typography  sx={{ mr: 3, fontWeight: "bold" }} variant="subtitle1">Formation D'InfoGraphie -  Ecole MJM Graphic Design</Typography>
                            <Typography variant="subtitle2" color="text.secondary">
                                2000 - 2001
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant="body1">
                                Maitrise de photoshop, Illustrator et apprentissage a l'integration Web
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                            <Typography  sx={{ mr: 3, fontWeight: "bold" }} variant="subtitle1">Formation D'Etat -  MySql et Html</Typography>
                            <Typography variant="subtitle2" color="text.secondary">
                                2006
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant="body1">
                               Formation de HTML 5 et Mysql.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                            <Typography  sx={{ mr: 3, fontWeight: "bold" }} variant="subtitle1">Formatio Full Stack</Typography>
                            <Typography variant="subtitle2" color="text.secondary">
                                2006
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant="body1">
                               Aprrentissage de JS, React, NodeJS, MongoDB. Perfectionnement dans CSS/HTML 5 et Mysql
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </Box>
                <Box my={2}>
                    <Typography variant="h6" component="h3" style={{ color: theme.palette.secondary.main }}>
                        Compétences techniques
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1">HTML/CSS</Typography>
                            <Typography variant="body1">JavaScript</Typography>
                            <Typography variant="body1">React</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1">Node.js</Typography>
                            <Typography variant="body1">PHP</Typography>
                            <Typography variant="body1">MySQL</Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default Curriculum;
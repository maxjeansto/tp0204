import { Typography, Container, Box, Grid, Card, CardActionArea, CardContent, CardMedia } from '@mui/material';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from 'react-i18next';
import i18n from '../i18n/config';
import { Button } from '@mui/material';


function Portfolio() {
    const [language, setLanguage] = useState();
    const { t } = useTranslation();
    const [projects, setProjects] = useState();
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        axios.get('https://react-1604-fbde33.appdrag.site/api/getPorfolio', {
            params: {
                "AD_PageNbr": "1",
                "AD_PageSize": "500"
            }
        }).then(function (response) {
            console.log(response.data);
            setProjects(response.data.Table)
        });

    }, [])
    useEffect(() => {
        const handleChangeLanguage = () => {
          // La langue a changé, faites quelque chose ici...
          console.log('La langue a changé ! Nouvelle langue :', i18n.language);
          setLanguage(i18n.language)
        };
        
        i18n.on('languageChanged', handleChangeLanguage);
    
        // Nettoyage : supprime l'écouteur d'événement lorsque le composant est démonté
        return () => {
          i18n.off('languageChanged', handleChangeLanguage);
        };
      }, []);
      const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
    };

    const filteredProjects = filter === 'all' ? projects : projects?.filter(project => project.tag === filter);


  

    return (
        <div>
            <Container maxWidth="lg">
                <Box mt={4} mb={4}>
                    <Typography variant="h4" align="center">
                        {t("main.portfolio")}
                    </Typography>
                </Box>
                <Box sx={{ marginBottom: 2 }}>
                    <Button onClick={() => handleFilterChange('all')}>Tous</Button>
                    <Button onClick={() => handleFilterChange('HTML')}>HTML</Button>
                    <Button onClick={() => handleFilterChange('React')}>React</Button>
                    <Button onClick={() => handleFilterChange('JS')}>JS</Button>
                    <Button onClick={() => handleFilterChange('Design')}>Design</Button>
                </Box>

                <Grid container spacing={4}>
                {filteredProjects?.map((project, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card>
                                <CardActionArea>
                                    <CardMedia component="img" height="200" image={project.image} alt={project.title} />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {project.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            { (() => {
                                                switch (language) {
                                                    case 'fr' : 
                                                        return projects.resume;
                                                    case 'en' :
                                                        return projects.resume_en;
                                                    case 'he' :
                                                        return projects.resume_he;
                                                    default: 
                                                        return projects.resume; }})()}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

            </Container>
        </div>
    );
}

export default Portfolio;
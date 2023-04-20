import { Typography, Container, Box, Grid, Card, CardActionArea, CardContent, CardMedia } from '@mui/material';
import React, { useEffect, useState } from "react";
import axios from "axios";


function Portfolio() {

    const [projects, setProjects] = useState();

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
    return (
        <div>
            <Container maxWidth="lg">
                <Box mt={4} mb={4}>
                    <Typography variant="h4" align="center">
                        Projets
                    </Typography>
                </Box>

                <Grid container spacing={4}>
                    {projects?.map((projects, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card>
                                <CardActionArea>
                                    <CardMedia component="img" height="200" image={projects.image} alt={projects.title} />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {projects.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {projects.resume}
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
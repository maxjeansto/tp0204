import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Grid, Card, CardContent, Typography, CardMedia } from "@mui/material";
import {Link} from "react-router-dom"
import { Link as MuiLink } from '@mui/material';


const UseEffectCompo = () => {

    const [data, setdata] = useState();

    useEffect(() => {
        console.log("Mon composant est monté")
        axios.get('https://react-1604-fbde33.appdrag.site/api/getAllArticles', {
            params: {
                "AD_PageNbr": "1",
                "AD_PageSize": "500"
            } 

        }).then(function (response) {
            console.log(response.data);
            setdata(response.data.Table)
        });

    }, [])

    return (
        <Box maxWidth="sm" sx={{ textAlign: "center", mt: 8, margin: '0 auto' }}>
      <Grid container spacing={4} justifyContent="center" sx={{mt: 3, mb: 2}}>
        {data?.map((data, index) => (
         <MuiLink
         key={data.id}
         component={Link}
         to={`/article/${data.id}`}
         sx={{
           textDecoration: 'none',
           '&:hover': {
             textDecoration: 'underline',
           },
         }}
       >
          <Grid item xs={12} sm={12} md={12} >
            <Card sx={{ maxWidth: 600 }}>
              <CardMedia
                sx={{ height: 240 }}
                image={data.urlimage}
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {data.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {data.article}
                </Typography>
              </CardContent>
              <Typography variant="subtitle2" color="text.secondary">
                  {data.author}
                </Typography>
            </Card>
          </Grid>
          </MuiLink>
        ))}
      </Grid>
    </Box>


    )

}
export default UseEffectCompo;
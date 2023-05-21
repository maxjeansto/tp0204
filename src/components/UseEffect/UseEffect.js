import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Grid, Card, CardContent, Typography, CardMedia, TextField } from "@mui/material";
import {Link} from "react-router-dom"
import { Link as MuiLink } from '@mui/material';
import i18n from "../../i18n/config";


const UseEffectCompo = () => {

    const [data, setdata] = useState();
    const [language, setLanguage] = useState('fr');
    const [search, setSearch] = useState("");

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

    const filteredData = data?.filter(item => 
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.article.toLowerCase().includes(search.toLowerCase())
  );

    

    return (
        <Box maxWidth="sm" sx={{ textAlign: "center", mt: 8, margin: '0 auto' }}>
           <Box sx={{ marginBottom: '20px', marginTop: '30px', width: '100%' }}>
                <TextField
                    label="Rechercher"
                    variant="outlined"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    fullWidth
                    sx={{ width: '100%' }}
                />
            </Box>
      <Grid container spacing={4} justifyContent="center" sx={{mt: 3, mb: 2}}>
      {filteredData?.map((item, index) => (
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
                image={item.urlimage}
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                {(() => { 
                    if (language === 'fr') {
                      return item.title;
                    } else if (language === 'en') {
                      return item.title_en;
                    } else if (language === 'he') {
                      return item.title_he;
                    }
    
                      })()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                {(() => { 
                    if (language === 'fr') {
                      return item.article;
                    } else if (language === 'en') {
                      return item.article_en;
                    } else if (language === 'he') {
                      return item.article_he;
                    }
    
                      })()}
                </Typography>
              </CardContent>
              <Typography variant="subtitle2" color="text.secondary">
                  {item.author}
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
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Grid, Card, CardContent, Typography, CardMedia, TextField } from "@mui/material";
import {Link} from "react-router-dom"
import { Link as MuiLink } from '@mui/material';
import i18n from "../../i18n/config";
import { useDispatch, useSelector } from "react-redux";
import { setArticle } from "../redux/slices/article.slice";
import { getArticle } from "../redux/slices/article.slice";


const UseEffectCompo = () => {
  const dispatch = useDispatch();
    const [data, setdata] = useState();
    const [language, setLanguage] = useState('fr');
    const [search, setSearch] = useState("");
    const getArticleSlice = useSelector(getArticle)

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
            dispatch(setArticle(response.data.Table[0]))
          });
        }, [dispatch]);
      

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
      getArticleSlice.title.toLowerCase().includes(search.toLowerCase()) ||
      getArticleSlice.article.toLowerCase().includes(search.toLowerCase())
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
      {filteredData?.map((getArticleSlice, index) => (
         <MuiLink
         key={getArticleSlice.id}
         component={Link}
         to={`/article/${getArticleSlice.id}`}
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
                image={getArticleSlice.urlimage}
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                {(() => { 
                    if (language === 'fr') {
                      return getArticleSlice.title;
                    } else if (language === 'en') {
                      return getArticleSlice.title_en;
                    } else if (language === 'he') {
                      return getArticleSlice.title_he;
                    }
    
                      })()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                {(() => { 
                    if (language === 'fr') {
                      return getArticleSlice.article;
                    } else if (language === 'en') {
                      return getArticleSlice.article_en;
                    } else if (language === 'he') {
                      return getArticleSlice.article_he;
                    }
    
                      })()}
                </Typography>
              </CardContent>
              <Typography variant="subtitle2" color="text.secondary">
                  {getArticleSlice.author}
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
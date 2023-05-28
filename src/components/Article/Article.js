import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Box, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { useLocation } from "react-router-dom";
import i18n from "../../i18n/config";
import { useDispatch } from "react-redux";
import { setArticle } from "../redux/slices/article.slice";

const BlogArticle = () => {
  const dispatch = useDispatch();
const [language, setLanguage] = useState();
  const [data, setdata] = useState();
  let location = useLocation()
  console.log("location", location.pathname.slice(9))
  
  
  useEffect(() => {
    axios.get('https://react-1604-fbde33.appdrag.site/api/getAllArticlesbyid', {
      params: {
        "id": location?.pathname?.slice(9),
        "AD_PageNbr": "1",
        "AD_PageSize": "500"
      }
    }).then(function (response) {
      console.log(response.data);
      setdata(response.data.Table[0])
      console.log("Dispatching setArticle with payload: ", response.data.Table[0]); // Ajout du console log ici
      dispatch(setArticle(response.data.Table[0]))
    });
  }, [dispatch, location]);



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

  

  return (

    <Box maxWidth="sm" sx={{ textAlign: "center", mt: 8, margin: '0 auto' }}>
      <Grid container spacing={4} justifyContent="center" sx={{ mt: 3, mb: 2 }}>
        {data &&

          <Grid item xs={12} sm={12} md={12} key={data.id} >
            <Card sx={{ maxWidth: 600 }}>
              <CardMedia
                sx={{ height: 240 }}
                image={data.urlimage}
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {(() => { 
                    if (language === 'fr') {
                      return data.title;
                    } else if (language === 'en') {
                      return data.title_en;
                    } else if (language === 'he') {
                      return data.title_he;
                    }
    
                      })()}
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
        }
      </Grid>
    </Box>


  );
}

export default BlogArticle;
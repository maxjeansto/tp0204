import React, { useState } from 'react';
import axios from 'axios';
import {
    Grid,
    Box,
    Typography,
    TextField,
    Button,
    Paper,
    Alert,
} from '@mui/material';

const BlogForm = () => {
    const [stateForm, setStateForm] = useState({
        title: "",
        article: "",
        author: "",
        image: ""
    });

    const [messageSuccess, setMessageSuccess] = useState(false);
    const [messageError, setMessageError] = useState(false);
    const [errorAuth, seterrorAuth] = useState(false);
    // useEffect(() => {
    //     console.log('stateform', stateForm)
    // }, [stateForm]);


    const handleSubmit = () => {
        console.log('stateform', stateForm)

        axios.get('https://react-1604-fbde33.appdrag.site/api/checkToken', {
            params: {
                "token": localStorage.getItem("tokenBlog"),
                "AD_PageNbr": "1",
                "AD_PageSize": "500"
            }
        }).then(function (response) {
            console.log(response.data);
            if (response.data.Table && response.data.Table.length > 0){
                axios.get('https://react-1604-fbde33.appdrag.site/api/PostArticle', {
                    params: {
                        "article": stateForm.title,
                        "author": stateForm.author,
                        "image": stateForm.image,
                        "title": stateForm.title
                    }
                }).then(function (response) {
                    console.log(response.data);
                    if (response.data.affectedRows > 0) {
                        setMessageSuccess(true)
                        setMessageError(false)
                    } else {
                        setMessageSuccess(false)
                        setMessageError(true)
                    }
                });
            } else {
                seterrorAuth(true)
            }
        });





    };

    return (
        <Grid container justifyContent="center">
            <Grid item xs={12} sm={8} md={6}>
                <Paper elevation={6} sx={{ padding: 2, marginTop: 10 }}>
                    <Typography component="h1" variant="h5">
                        Ajouter un article
                    </Typography>
                    <Box>
                        <form>
                            <TextField
                                sx={{ mt: 1 }}
                                variant="outlined"
                                fullWidth
                                required
                                label="Titre"
                                value={stateForm.title}
                                onChange={(e) => setStateForm((prevState) => ({ ...prevState, title: e.target.value }))}
                            />
                            <TextField
                                sx={{ mt: 1 }}
                                variant="outlined"
                                fullWidth
                                required
                                label="Article"
                                multiline
                                minRows={5}
                                value={stateForm.article}
                                onChange={(e) => setStateForm((prevState) => ({ ...prevState, article: e.target.value }))}
                            />
                            <TextField
                                sx={{ mt: 1 }}
                                variant="outlined"
                                fullWidth
                                required
                                label="Image (URL)"
                                value={stateForm.image}
                                onChange={(e) => setStateForm((prevState) => ({ ...prevState, image: e.target.value }))}
                            />
                            <TextField
                                sx={{ mt: 1 }}
                                variant="outlined"
                                fullWidth
                                required
                                label="Auteur"
                                value={stateForm.author}
                                onChange={(e) => setStateForm((prevState) => ({ ...prevState, author: e.target.value }))}
                            />
                            <Button
                                onClick={() => handleSubmit()}
                                type="button"
                                fullWidth
                                variant="contained"
                                color="primary"
                                sx={{ mt: 1 }}
                            >
                                Ajouter l'article
                            </Button>
                            {messageError && <Alert severity="error" sx={{ mt: 2 }}>
                                L'article n'a pas été ajouter
                            </Alert>}
                            {messageSuccess && <Alert severity="success" sx={{ mt: 2 }}>
                                L'article n'a pas été ajouter
                            </Alert>}
                            {errorAuth && <Alert severity="error" sx={{ mt: 2 }}>
                                Erreur d autorisation
                            </Alert>}
                        </form>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default BlogForm;

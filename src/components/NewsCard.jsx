import React from 'react'
import titleFormat from "../../utils/titleFormat"
import {
    Grid,
    Card,
    CardContent,
    CardMedia,
    Typography,
    CardActionArea  
}from '@mui/material/'
import { setCurrentArticle } from "../reduxStore/newsSlice";
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const NewsCard = (props) => {

    //Initalize the dispatch object for redux
    const dispatch = useDispatch()

    //Format the article title. 
    let articleTitle = titleFormat(props.title)

    //Set the currentArticle state in the redux newsSlice to the article the user selected.
    const setArticle = () => {
        console.log(props.title)
        dispatch(setCurrentArticle({
            title:props.title,
            author:props.author,
            publishedAt: props.publishedAt,
            image: props.image,
            content: props.content,
            url: props.url, 
            source: props.source
        }))
    }

    return(
        <>
            <Grid item xs={props.smallResponsivevalue} md={props.mediumResponsivedValue}>
            <Card>
                <CardActionArea
                    component={Link}
                    // component={'a'}
                    to={`/${props.category}/${props.id}`}
                    // href={`/${props.category}/${props.id}`}
                    sx={{display: `${props.display}`}}
                    onClick={setArticle}
                >
                    <CardMedia
                    component="img"
                    height='auto'
                    image={`${props.image}`}
                    alt="news Image"
                    errorIcon={null}
                    sx={{width: `${props.width}`, }}
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        {articleTitle}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{marginTop: 2, marginBottom: 2}}>
                        {props.descrp}
                    </Typography>
                    <Typography variant="caption text" color="text.secondary" sx={{marginTop: 20}}>
                        {props.source}
                    </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>  
            </Grid>
        </>
    )
}

export default NewsCard
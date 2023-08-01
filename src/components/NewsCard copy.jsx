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

//Safe news card copy.

const NewsCard = (props) => {
    let mediumResponsivedValue
    let smallResponsivevalue

    if(props.featuredArticle == true){
        mediumResponsivedValue = 8
        smallResponsivevalue = 12

    } else {
        mediumResponsivedValue = 4
        smallResponsivevalue = 6
    }

    //Format the article title. 
    let articleTitle = titleFormat(props.title)

    return(
        <>
            <Grid item sm={smallResponsivevalue} md={mediumResponsivedValue}>
            <Card >
                <CardActionArea
                    component='a'
                    href={`/${props.category}/${props.id}`}
                >
                    <CardMedia
                    component="img"
                    height='auto'
                    image={`${props.image}`}
                    alt="news Image"
                    errorIcon={null}
                    sx={{width: '100%', objectFit: 'cover'}}
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
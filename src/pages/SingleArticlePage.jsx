import RelatedArticles from "../components/RelatedArticles"
import SocialMediaIcons from "../components/SocialMediaIcons"
import { useParams } from "react-router-dom"
import titleFormat from "../../utils/titleFormat"
import { useTheme } from '@mui/material/styles'
import { useSelector } from 'react-redux'

import {
    Typography, 
    Container,
    Box, 
    Grid,
    Card,
    CardMedia
  } from '@mui/material/'


    
function SingleArticle () {
    //Destructure url params.
    let {id: currentArticleID} = useParams()

    //Get current Current Article info from redux store.
    const currentArticle = useSelector((state) => state.news.currentArticle)
    console.log(currentArticle)

    //Import the theme from the global theme provider.
    const theme = useTheme();

    //Format the article title.
    let newTitle = titleFormat(currentArticle.title)

    return(
        <>
            <Container maxWidth='lg'>
                <Box sx={{flexGrow: 1}}>
                    <Grid container >
                        <Grid container item md={8} sx={{marginBottom: 4}} >
                            <Grid item md={12}>
                                <Typography variant='h4' sx={{marginBottom: 2}}>
                                    {newTitle}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6} sx={{color: 'grey', paddingBottom: 1}}>
                                <Typography variant='body1'>
                                    {!currentArticle.author ? `Written by ${currentArticle.source.name}` : `Written by ${currentArticle.author}, ${currentArticle.source}`}
                                </Typography>
                                <Typography variant='body2'>
                                    Published on {currentArticle.publishedAt.slice(0,10)}
                                </Typography>
                            </Grid>
                            <Grid container item xs={12} md={6} sx={{paddingBottom: 1 }}>
                                <SocialMediaIcons/>
                            </Grid>
                            <Grid item sm={12} sx={{ }}>
                                <Card sx={{ width: '20vp', height: '60vh', }}>
                                    <CardMedia
                                        component="img"
                                        alt="article image"
                                        image={currentArticle.image}
                                        sx={{objectFit: 'contain', }}
                                    />
                                </Card>
                            </Grid>
                            <Grid item sm={12} sx={{marginTop: 3}}>
                                <Typography variant='body1'>
                                    {currentArticle.content}
                                </Typography>
                            </Grid>
                            <Grid item sm={12} sx={{marginTop: 3,}}>
                                <Typography variant='content'>
                                    <span style={{fontWeight: 'bold'}}>Original Article:</span> <a href={`${currentArticle.url}`}>{currentArticle.url}</a>
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container item md={3} rowSpacing={2} sx={{marginLeft: {md: 5, xs: 0}, marginBottom: {xs: 4}, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <Grid item xs={12} md={12} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <Typography variant='h6' sx={{textTransform: 'capitalize', color: theme.palette.primary.light, borderTop: {xs: 'solid', md: 'none'}, padding: {xs: 2, md: 0} , borderColor: '#2196f3'}}>
                                    Featured {category} Stories
                                </Typography>
                            </Grid>
                            <RelatedArticles />
                            {/* {randomArticles.map((article) => 
                                <RelatedArticles title={article.title} source={article.source} category={category} id={article.index}/>
                            )} */}
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    )

}

export default SingleArticle
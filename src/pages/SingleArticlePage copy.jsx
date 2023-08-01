import RelatedArticles from "../components/RelatedArticles"
import SocialMediaIcons from "../components/SocialMediaIcons"
import { useParams } from "react-router-dom"
import { useGetTopHeadlinesQuery } from "../reduxStore/apiSlice"
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

//This function returns an array of random article titles and article sources.
const randomArticleSelector = (currentArticleID , articlesData) => {
    const articlesIndex = new Set();
    while(articlesIndex.size < 4){
        let randomArtcileIndex = Math.floor(Math.random() * (articlesData.length -1))
        //If the random article is not the article being currently viewed add it to the set.
        if(randomArtcileIndex != currentArticleID){
            //If the random article already exists in the set it will not be added, if it is not then it will be added.
            articlesIndex.add(randomArtcileIndex)
        } else {
            continue
        }
    }
    let randomArticles = []
    //Add each of the random articles and their content to a new array.
    articlesIndex.forEach(index => {
        let {title, source: {name: source}, index: id} = articlesData[index]
        randomArticles.push({title, source, index})

    })
    return randomArticles
}
    
function SingleArticle () {
    //Destructure url params.
    let {category, id: currentArticleID} = useParams()

    //Pull cached articles from apiSlice for the specified category.
    const {
        data,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetTopHeadlinesQuery(category)

    //Get current Current Article info from redux store.
    const currentArticle = useSelector((state) => state.news.currentArticle)
    console.log(currentArticle)

    //Import the theme from the global theme provider.
    const theme = useTheme();

    //If the api call successfully returned data.
    if(isSuccess){
        //Get the current article from the articles data.
        let article = data.articles[currentArticleID]
        //Generate random articles for the RelatedArticles component.
        let randomArticles = randomArticleSelector(currentArticleID, data.articles)
        //Format the article title.
        let newTitle = titleFormat(article.title)

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
                                        {!article.author ? `Written by ${article.source.name}` : `Written by ${article.author}, ${article.source.name}`}
                                    </Typography>
                                    <Typography variant='body2'>
                                        Published on {article.publishedAt.slice(0,10)}
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
                                            image={article.urlToImage}
                                            sx={{objectFit: 'contain', }}
                                        />
                                    </Card>
                                </Grid>
                                <Grid item sm={12} sx={{marginTop: 3}}>
                                    <Typography variant='body1'>
                                        {article.content}
                                    </Typography>
                                </Grid>
                                <Grid item sm={12} sx={{marginTop: 3,}}>
                                    <Typography variant='content'>
                                        <span style={{fontWeight: 'bold'}}>Original Article:</span> <a href={`${article.url}`}>{article.url}</a>
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container item md={3} rowSpacing={2} sx={{marginLeft: {md: 5, xs: 0}, marginBottom: {xs: 4}, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <Grid item xs={12} md={12} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                    <Typography variant='h6' sx={{textTransform: 'capitalize', color: theme.palette.primary.light, borderTop: {xs: 'solid', md: 'none'}, padding: {xs: 2, md: 0} , borderColor: '#2196f3'}}>
                                        Featured {category} Stories
                                    </Typography>
                                </Grid>
                                {randomArticles.map((article) => 
                                    <RelatedArticles title={article.title} source={article.source} category={category} id={article.index}/>
                                )}
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </>
        )
    } else if(isError){
        console.log(error)
        return(
            <p>There was an error. Please try again later.</p>
            
        )

    }

}

export default SingleArticle
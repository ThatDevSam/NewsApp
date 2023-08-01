import React, {useEffect, useState} from "react";
import titleFormat from "../../utils/titleFormat"
import { useTheme } from '@mui/material/styles';
import {
    Typography,  
    Grid,
    Button,
    Backdrop,
    CircularProgress
  } from '@mui/material/'

function RelatedArticles (props) {

    //open/close state of the loading icon.
    const [openLoading, setOpenLoading] = useState(false);

    //Import the theme from the global theme provider.
    const theme = useTheme();

    //Functions that handle the open and close of the loading icon.
    const handleCloseLoading = () => {
        setOpenLoading(false);
    };
    const handleOpenLoading = () => {
        setOpenLoading(true);
    };

    //Pull cached articles from apiSlice for the specified category.
    const {
        data,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetTopHeadlinesQuery('us')

    useEffect(() =>{
        //If the loading state of the api is true, open the loading icon.
        if(isLoading){
          handleOpenLoading()
        } else if (isSuccess) { //If the data has been returned from the api close the loading icon.
          handleCloseLoading()
        }
      }, [isLoading, isSuccess])

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

//WHAT I NEED TODO IS GENERATE A SET OF RANDOM ARTICLE IDS, GET THAT DATA, THEN ITERATE OVER THEM AND RETURN A GRID ITEM WITH THE DATA INSIDE.
//THE READ MORE LINK USES THE CATEGORY AND THE ARTICLE ID TO NAVIGATE. THAT IS GOING TO BE A PROBLEM FOR THE CATEGORY SIDE AND THE SEARCH SIDE OF THINGS. 

if(isSuccess){
    //Generate random articles for the RelatedArticles component.
    let randomArticles = randomArticleSelector(currentArticleID, data.articles)
    return (
        <>
        {/* <Grid item xs={12} md={12} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <Typography variant='h6' sx={{textTransform: 'capitalize', color: theme.palette.primary.light, borderTop: {xs: 'solid', md: 'none'}, padding: {xs: 2, md: 0} , borderColor: '#2196f3'}}>
                                    Featured {category} Stories
                                </Typography>
                            </Grid>
                            {randomArticles.map((article) => 
                                <RelatedArticles title={article.title} source={article.source} category={category} id={article.index}/>
                            )} */}
            <Grid item md={12} xs={5} sx={{bgcolor: 'lightgrey', borderRadius: '15px', margin: 1, paddingBottom: 2, '&:hover':{bgcolor: theme.palette.primary.light, color:'white'}}}>
                <Typography variant='body2' sx={{paddingLeft: 2, paddingRight: 2, paddingBottom: 1, fontWeight: 'bold'}}>
                    {articleTitle}
                </Typography>
                <Typography variant='caption text' sx={{paddingLeft: 2, paddingRight: 2}}>
                    {`- ${props.source}`}
                </Typography>
                <Button variant='text' size='small' href={`/${props.category}/${props.id}`} sx={{padding:2, color: 'inherit'}}>
                    <Typography variant='inherit' sx={{'&:hover': {textDecoration: 'underline'}}}>
                        Read more
                    </Typography> 
                </Button>
            </Grid>

            {/* Loading backdrop */}
            <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={openLoading}
            >
            <CircularProgress color="inherit" />
            </Backdrop>
        </>  
    )
} else if(isError){
    console.log(error)
    return(
        <Typography variant={'h5'}>
            There was an error. Please try again later.
        </Typography>
    ) 
}

    
}

export default RelatedArticles
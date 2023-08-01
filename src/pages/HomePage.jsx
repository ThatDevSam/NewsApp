import { useEffect, useState } from "react"
import { useGetEverythingQuery, useGetTopHeadlinesQuery } from "../reduxStore/apiSlice"
import {useSelector} from 'react-redux'
import { useParams } from "react-router-dom"
import DateFormat from '../../utils/Date'
import NewsCard from "../components/NewsCard"
import ContinueReading from "../components/CallToAction"
import {
  Backdrop,
  CircularProgress,
  Button,
  Typography, 
  Container,
  Box, 
  Grid,
} from '@mui/material/'
import { useTheme } from '@mui/material/styles';


function Home() {
  const [navCategory, setNavCategory] = useState('US');
  //Retrieve the category parameter from the url.
  let {category} = useParams();
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

  //Update the category state whenever the value changes.
  useEffect(() => {
    if(!category){
      category = 'US'
    }
    setNavCategory(category)
  }, [category])
  console.log(navCategory)
  
  //Make an api call and pass in the value of navCategory.
  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetTopHeadlinesQuery(navCategory)

  useEffect(() =>{
    //If the loading state of the api is true, open the loading icon.
    if(isLoading){
      handleOpenLoading()
    } else if (isSuccess) { //If the data has been returned from the api close the loading icon.
      handleCloseLoading()
    }
  }, [isLoading, isSuccess])

  //This function takes an article's data and its index in the array and returns a NewsCard component.
  const newsCard = (article, index) => {
    //Set the first article in the articles array to be the featured article.
    let smallResponsivevalue
    let mediumResponsivedValue 

    //If the article is the first article in the array, make the NewsCard visually larger.
    if(index == 0){
      mediumResponsivedValue = 8
      smallResponsivevalue = 12
    } else {
      mediumResponsivedValue = 4
      smallResponsivevalue = 6
    }
    
    return(
      <NewsCard 
        author={article.author} 
        descrp={article.description}
        publishedAt={article.publishedAt}
        source={article.source.name}
        title={article.title}
        url={article.url}
        image={article.urlToImage}
        content={article.content}
        category={category}
        id={index}
        display={'block'}
        width={'100%'}
        smallResponsivevalue={smallResponsivevalue}
        mediumResponsivedValue={mediumResponsivedValue}      
      />
    )
    
  }

  if(isSuccess){
    return (
      <>
        <Container maxWidth='lg'>
          <Box sx={{flexGrow: 1}}>
            <Grid container rowSpacing={{xs: 4, md: 2}} columnSpacing={{ xs: 1, sm: 2, md: 10 }}>
              <Grid item xs={12} md={8} sx ={{ display: 'flex', justifyContent: {xs: 'center', md: 'start'} , alignItems: 'start', marginBottom: 3 }}>
                <Typography variant='h4' sx={{textTransform: 'uppercase', fontWeight: 'bold'}}>
                  {!navCategory ? 'Top Headlines in the U.S' : `Top Headlines in ${navCategory}`}
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}  sx={{display: 'flex', justifyContent: {xs: 'center', md: 'end'}, alignItems: 'end', marginBottom: 3 }}>
                <Typography variant='h6' sx={{textTransform: 'uppercase', fontWeight: 'bold', color: theme.palette.info.light}}>
                  <DateFormat />
                </Typography>
              </Grid>
              <Grid container item spacing={2}>
                {data.articles.map((article, index) => 
                  newsCard(article, index)                  
                )}
              </Grid>
            </Grid>
          </Box>
        </Container>

        {/* Loading backdrop */}
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        <ContinueReading />
      </>


    )
  } else if (isError){
    console.log(error)
    return(
      <>
        <p>There was an error. Please try again later.</p>
      </>
    )
  }

  
    
}
  
export default Home

  
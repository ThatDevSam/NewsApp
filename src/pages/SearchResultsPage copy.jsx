import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useGetEverythingQuery } from '../reduxStore/apiSlice'

import {
    Backdrop,
    CircularProgress,
    Button,
    Typography, 
    Container,
    Box, 
    Grid,
    CardContent,
    CardMedia,
    CardActionArea,
    Card
  } from '@mui/material/'
import { useTheme } from '@mui/material/styles';

const SearchResult = () => {

    //Get current search info from redux store.
    const searchInfo = useSelector((state) => state.news.searchInfo)
    //open/close state of the loading icon.
    const [openLoading, setOpenLoading] = useState(false);
    //Make an API call with the search info.
    const {
        data,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetEverythingQuery(searchInfo)

    //Functions that handle the open and close of the loading icon.
    const handleCloseLoading = () => {
        setOpenLoading(false);
    };
    const handleOpenLoading = () => {
        setOpenLoading(true);
    };

    //Need to use a useEffect to manage these api states to prevent a to many re-renders error.
    useEffect(() =>{
        if(isLoading){
            //If the data is loading, show the loading icon.
            handleOpenLoading()
        } else if(isSuccess){
            //If the api returned successfully, close the loading icon.
            handleCloseLoading()
            console.log(data)
        } else if(isError){
            //If ther api returned an error do the following.
            return(<p>There was an error</p>)
            console.log(error)
        }
    }, [isLoading, isSuccess, isError])

    //Return this if there was more than one article for the search, return something else if there wasn't.
    if(isSuccess && data.totalResults > 1){
        return(
            <>
                <Container maxWidth='md'>
                    <Box sx={{flexGrow: 1}}>
                        <Typography variant='h6' sx={{borderTop: "solid", borderWidth: '1px', borderColor: 'lightgray', paddingTop: 2,}}>
                            {/* Make the search term bold and capitalize? */}
                            {`There are ${data.totalResults} results for ${searchInfo.keyTerm} `}
                        </Typography>

                        <Grid container direction={'column'} sx={{display:'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <Grid item xs={12} sx={{}}>
                                <CardActionArea sx={{display: 'flex'}}>
                                <CardMedia
                                    component="img"
                                    sx={{ width: 151 }}
                                    image={data.articles[0]?.urlToImage}
                                    alt="Live from space album cover"
                                />
                                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                                    <CardContent sx={{flex: "1  auto"}}>
                                        <Typography>{data.articles[0]?.title}</Typography>
                                    </CardContent>
                                </Box>
                                
                                </CardActionArea>
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
            </>
        )
    }
    
}

export default SearchResult
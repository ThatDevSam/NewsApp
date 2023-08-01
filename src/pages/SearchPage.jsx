import React, {useState} from "react";
import { toast } from 'react-toastify';
import SearchResult from "./SearchResultsPage";
import { updateSearchInfo } from "../reduxStore/newsSlice";


//Mui imports
import {
    TextField,
    Container,
    Box,
    Grid,
    Button,
    FormControl,
    Typography,
    RadioGroup,
    FormLabel,
    FormControlLabel,
    Radio,
} from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useTheme } from '@mui/material/styles';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";



function Search () {

    //Initalize the dispatch object for redux.
    const dispatch = useDispatch()
    const navigate = useNavigate()

    //Import the theme from the global theme provider.
    const theme = useTheme();

    //Get the current date, yesterday's day, and the date a month ago.
    let today = dayjs()
    let yesterday = dayjs().subtract(1, 'day')
    let oneMonthAgo = dayjs().subtract(1, 'month')

    const [searchInfo, setSearchInfo] = useState({
        keyTerm: '',
        fromDate: oneMonthAgo,
        toDate: today,
        sortBy: 'publishedAt',
      })

      //Update the search info state with the current form value.
      const handleChange = (e) => {
        setSearchInfo({...searchInfo, [e.target.name]: e.target.value})
      }

      //Validate the form input.
      const handleInputValidation = (e) => {
        e.preventDefault()
        //Check that there is a search term and that the toDate comes after the fromDate.
        if(!searchInfo.keyTerm){
          toast.error("Please provide all fields.", {position: 'top-center'})
          handleClear(e)
        } else if((searchInfo.fromDate.diff(searchInfo.toDate, 'month') == 1) || (searchInfo.fromDate.diff(searchInfo.toDate, 'day') >= 1)){
          toast.error("The end date can not come after the start date, please try again.", {position: 'top-center'})
          handleClear(e)
        } else {
          handleSubmit(e)
        }
      }
    
      const handleSubmit = (e) => {
        e.preventDefault()

        //Format these date object so they are consumable by the api.
        let startDate = searchInfo.toDate.format('YYYY/MM/DD')
        let endDate = searchInfo.fromDate.format('YYYY/MM/DD')

        //update the global state.
        dispatch(updateSearchInfo({startDate, endDate, sortBy:searchInfo.sortBy, keyTerm: searchInfo.keyTerm }))

        //navigate to the search results page.
        navigate(`/search/${searchInfo.keyTerm}`)

        handleClear(e)
      }

      //Reset the form values.
      const handleClear = (e) => {
        e.preventDefault()
        setSearchInfo({
          keyTerm: '',
          fromDate: oneMonthAgo,
          toDate: today,
          sortBy: 'publishedAt',
        })
      }

    return(
        <>
        <Container maxWidth='lg'>
            <Box sx={{flexGrow: 1,}}>
            <Grid container rowSpacing={3} columnSpacing={1} display="flex" justifyContent="center"
                  alignItems="center">

                <Grid item md={12} xs={12} display="flex" justifyContent="center"
                  alignItems="center" sx={{color: theme.palette.primary.light}}>
                    <Typography variant={'h3'}>Keyword search</Typography>
                </Grid>

                {/* Key term field */}
                <Grid item md={9} xs={12} display="flex" justifyContent="center"
                  alignItems="center">
                    <TextField 
                        id="keyTerm" 
                        label="Key Term" 
                        name="keyTerm"
                        variant="outlined" 
                        helperText="Required" 
                        placeholder="Crypto"
                        value={searchInfo.keyTerm}
                        onChange={handleChange}
                        required={true}
                        sx={{width: '50%'}}                        
                      />
                </Grid>

                <Grid item md={12} xs={12} display="flex" justifyContent="center"
                  alignItems="center" sx={{color: theme.palette.primary.light, marginTop: 2}}>
                    <Typography variant={'body1'}>Select a publication range for your search, up to one month ago.</Typography>
                </Grid>

                {/* Date range selector */}
                <Grid item md={6} sm={9} xs={12} display="flex" justifyContent="center"
                  alignItems="start">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Start Date"
                        value={searchInfo.fromDate}
                        onChange={(newValue) => setSearchInfo({...searchInfo, fromDate: newValue})}
                        minDate={oneMonthAgo}
                        maxDate={yesterday}
                        slotProps={{
                          textField: {
                            helperText: 'Select a start date.',
                          },
                        }}
                        sx={{marginRight: 3}}
                      />

                      <DatePicker
                        label="End Date"
                        value={searchInfo.toDate}
                        onChange={(newValue) => setSearchInfo({...searchInfo, toDate: newValue})}
                        minDate={oneMonthAgo.add(1, 'day')}
                        maxDate={today}
                        slotProps={{
                          textField: {
                            helperText: 'Selecting an end date.',
                          },
                        }}
                      />
                    </LocalizationProvider>
                </Grid>

                {/* Sort articles radio button group */}
                <Grid item md={12} xs={12} display="flex" justifyContent="center"
                  alignItems="center" sx={{marginTop: 2, marginBottom: 2}}>
                    <FormControl>
                      <FormLabel id="sort-articles-by">Sort Articles By:</FormLabel>
                      <RadioGroup
                        aria-labelledby="sort-articles-by"
                        defaultValue="publishedAt"
                        name="sortBy"
                      >
                        <FormControlLabel value="publishedAt" control={<Radio />} label="Newest to Oldest." />
                        <FormControlLabel value="popularity" control={<Radio />} label="Popularity of the article." />
                        <FormControlLabel value="relevancy" control={<Radio />} label="Articles most relevant to your search." />
                      </RadioGroup> 
                    </FormControl>
                </Grid>

                {/* Buttons */}
                <Grid item xs={12} display="flex" justifyContent="center"
                  alignItems="center">
                    {/* Submit Button */}
                    <Button 
                      onClick={handleInputValidation} 
                      variant="contained" 
                      size={"large"} 
                      aria-label="Submit" 
                      sx={{marginRight: 3, fontSize: 23, fontWeight: 'bold', bgcolor: theme.palette.primary.light, borderRadius: '15px', ":hover":{bgcolor: "white", color: '#2196f3',borderColor: '2196f3', border: 'solid'}}}
                    >
                      Submit
                    </Button>
                    
                    {/* Clear Button */}
                    <Button 
                      onClick={handleClear} 
                      variant="contained" 
                      size={"large"} 
                      aria-label="Clear" 
                      sx={{bgcolor: 'grey', color: 'white', borderColor: "grey", fontWeight: 'bold', borderRadius: '15px', ":hover":{bgcolor: "white", color: '#2196f3',borderColor: '2196f3', border: 'solid'}}}
                    >
                      Clear
                    </Button>
                </Grid>
            </Grid>

            </Box>
        </Container>
        </>

    )
}

export default Search
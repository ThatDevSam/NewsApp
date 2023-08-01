
import {
    Typography, 
    Container,
    Box, 
    Grid,
    Button,
} from '@mui/material/'
import { useTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import {Link} from 'react-router-dom'


const ContinueReading = () => {
    const theme = useTheme();
    return(
        <>
            <Container maxWidth='100%' sx={{bgcolor: theme.palette.primary.light, marginTop: 5, marginBottom: 3}}>
                <Box sx={{}}>
                    <Grid container sm={12} direction='column' sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                        <Grid item sx ={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 3}}>
                            <Typography variant='h4' sx={{fontWeight: 'bold', color: 'white'}}>
                                Still looking for an article to read?
                            </Typography>
                        </Grid>
                        <Grid item sx ={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 1, marginBottom:1 }}>
                            <Typography variant='h6' sx={{fontWeight: 'bold', color: 'white'}}>
                                Search for a topic that interests you! 
                            </Typography>
                        </Grid>
                        <Grid item sx ={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 1, }}>
                            <Typography variant='subtitle1' sx={{fontWeight: 'bold', color: 'white'}}>
                                 Our database includes thousands of news sources and supports complex searches. So you'll be sure to find an article worth reading.
                            </Typography>
                        </Grid>
                        <Grid item sx ={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 3, marginBottom: 3}}>
                            <Link to={'/search'}>
                                <Button  
                                    variant="contained" 
                                    size={"large"} 
                                    aria-label="Seach"
                                    endIcon={<SearchIcon/>}
                                    sx={{ fontSize: 19, fontWeight: 'bold', color: 'white', bgcolor: theme.palette.primary.light, border: 'solid', borderColor: 'white', borderRadius: '15px', ":hover":{bgcolor: "white", color: theme.palette.primary.light}}}
                                >
                                    Search
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>
                    
                </Box>
            </Container>
        </>
        
    )
}

export default ContinueReading
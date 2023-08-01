import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import {
    Typography,
    Grid,
  } from '@mui/material/'

function SocialMediaIcons () {
    return(
        <>
        <Grid item sm={12} md={12} sx={{ paddingRight: {xs: 1, md: 0}, display: 'flex', justifyContent: {md:'end', xs: 'start' } , alignItems:{md:'center', xs: 'center' }}}>
            <Typography variant='body2'>
                Share This Story
            </Typography>
        </Grid>
        <Grid item sm={12} md={12} sx={{ display: 'flex', justifyContent: {md:'end', xs: 'start' } , alignItems:{md:'center', xs: 'center'}}}>
            <InstagramIcon 
                color="primary"
                sx={{'&:hover': {bgcolor: '#2196f3', color: 'white', borderRadius: '5px'}}}
             />
            <TwitterIcon 
                color='primary' 
                sx={{'&:hover': {bgcolor: '#2196f3', color: 'white', borderRadius: '5px'}}}
            />
            <FacebookIcon 
                color='primary' 
                sx={{'&:hover': {bgcolor: '#2196f3', color: 'white', borderRadius: '5px'}}}
            />
        </Grid>
        
        </>
    )
}

export default SocialMediaIcons
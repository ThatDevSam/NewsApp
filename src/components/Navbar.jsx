import {useState} from 'react';
import {
    styled,
    alpha,
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    InputBase,
    Badge,
    MenuItem,
    Menu,
    Button,
} from '@mui/material'

import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';

import {Link} from 'react-router-dom'
import { useGetTopHeadlinesQuery } from "../reduxStore/apiSlice"
import { skipToken } from '@reduxjs/toolkit/dist/query';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));


export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

//   Do I need to keep this?
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  //Mobile Hamberger Menu
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
            <Link to='/' style={{textDecoration: 'none'}}>
                <Typography variant='subtitle1' sx={{color: 'blue', textTransform: 'uppercase', margin: 1, ':hover': {textDecoration: 'underline'}}}>
                    Home
                </Typography>
            </Link>
      </MenuItem>
      <MenuItem>
            <Link to='/' style={{textDecoration: 'none'}}>
                <Typography variant='subtitle1' sx={{color: 'blue', textTransform: 'uppercase', margin: 1, ':hover': {textDecoration: 'underline'}}}>
                    Advanced Search
                </Typography>
            </Link>
      </MenuItem>
    </Menu>
  );

  const categories = [
    'technology',
    'world',
    'health',
    'business',
    'entertainment',
    'science',
    'sports'
  ]

  return (
    <Box sx={{ flexGrow: 1, marginBottom: 4 }} >
      <AppBar position="static">
        <Toolbar>
        {/* Logo */}
        <Box sx={{flexGrow: 2}}>
            <Link to={'/us'} style={{textDecoration: 'none'}}>
                <Button variant='text' sx={{ display: { xs: 'none', sm: 'block' }, marginRight: 5, color: 'white', textTransform: 'uppercase', margin: 1, ':hover': {textDecoration: 'underline'}  }}>
                    <Typography variant='h5'>
                    News App
                    </Typography>
                </Button>
            </Link>
        </Box>
          {/* Navbar menu Links */}
          <Box sx={{flexGrow: 1, flexShrink: 2 ,display: { xs: 'none', sm: 'flex' }, flexWrap: 'wrap' }}>
            {categories.map((category) => (
            <Link to={`${category}`}>
                <Button variant='text' sx={{color: 'white', textTransform: 'uppercase', margin: 1, ':hover': {textDecoration: 'underline'}}}>
                {category}
                </Button>
            </Link>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0.25}}>
            <Link to={'/search'}>
              <Button variant='outlined' startIcon={<SearchIcon />} sx={{bgcolor: '#eeeeee', color: 'black', opacity: 0.75, '&:hover': {bgcolor: '#eeeeee', opacity: 1}  }}>
                <Typography variant='button' sx={{color: 'black', textTransform: 'capitalize', '&:hover': {bgcolor: '#eeeeee'}}}>
                  Search...
                </Typography>
              </Button>
            </Link>
            
            {/* <Search > */}
                {/* <SearchIconWrapper>
                <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                />
            </Search>  */}
          </Box>
          {/* Mobile menu */}
          <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
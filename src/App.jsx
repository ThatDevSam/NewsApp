
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

//Page imports
import SearchResult from './pages/SearchResultsPage.jsx';
import SharedLayout from './pages/SharedLayout.jsx'
import Home from './pages/HomePage.jsx'
import SingleArticle from './pages/SingleArticlePage.jsx';
import Search from './pages/SearchPage.jsx';

function App() {
  let newsAppTheme = createTheme({
    typography: {

    },
  });

  newsAppTheme = responsiveFontSizes(newsAppTheme)
  return (
    <>
    <ThemeProvider theme={newsAppTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<SharedLayout />}>
              <Route index element={<Home />}/>
              <Route path='/:category' element={<Home />}/>
              <Route path='/:category/:id' element={<SingleArticle />}/>
              <Route path='/search' element={<Search/>}/>
              <Route path='/search/:searchTerm' element={<SearchResult/>}/>


            </Route>
          </Routes>
          <ToastContainer/>
        </BrowserRouter>
      </LocalizationProvider>
    </ThemeProvider>
      
    </>
  )
}

export default App

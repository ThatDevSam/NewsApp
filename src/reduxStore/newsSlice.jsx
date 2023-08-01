import { createSlice } from '@reduxjs/toolkit'

export const newsSlice = createSlice({
  name: 'news',
  initialState: {},
  reducers: {
    updateSearchInfo: (state, action) => {
      state.searchInfo = {...action.payload}
    },
    setCurrentArticle: (state, action) => {
      state.currentArticle = {...action.payload}
      console.log(state.currentArticle)
    },
  }
})

//names of state actions
export const { updateSearchInfo, setCurrentArticle} = newsSlice.actions

export default newsSlice.reducer
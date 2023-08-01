import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://newsapi.org/v2',
    headers: {'X-Api-Key': import.meta.env.VITE_NEWS_API_KEY}
    
 }),
  endpoints: builder => ({
    getEverything: builder.query({
      query: (searchInfo) => '/everything?q=bitcoin'
    }),
    getTopHeadlines: builder.query({
        query: (category) => {
            let url
            //If the category is us, don't specifiy a category field in the url.
            (category === 'us' ? url = `/top-headlines?country=us` : url = `/top-headlines?country=us&category=${category}`)
            return url
        }
      })
  })
})

export const { useGetEverythingQuery, useGetTopHeadlinesQuery } = apiSlice
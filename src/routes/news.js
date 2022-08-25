const express = require('express');
const newsRouter = express.Router();
const axios = require('axios')
const redis = require('redis')


newsRouter.get('', async(req, res) => {
  // res.render('news');
  // const client = redis.createClient()
  // client.on('error', (err) => console.log('Redis Client Error', err));
  // await client.connect();
  // console.log('Redis connected!')
  

  try {
    // const cacheNews = await client.get('news')
    // if (cacheNews){
      // res.render('news', {articles: cacheNews})
    // }

    // else {
      const newsAPI = await axios.get(`https://gnews.io/api/v4/search?q=example&token=29790cf991de1069b917b1cffe9dbde6&lang=en`)
    // console.log(newsAPI.data.articles)
    res.render('news', { articles: newsAPI.data.articles })
    // }
    // console.log(articles);
  } catch (error) {
    if (error.response){
      res.render('news', { articles: null})
      console.log(error.response.data)
      console.log(error.response.status)
      console.log(error.response.headers)
    }
    else if (error.request){
      res.render('news', { articles: null})
      console.log(error.request)
    }
    else {
      res.render('news', { articles: null})
      console.error('Error', error.message)
    }
  }

});

newsRouter.post('', async(req, res) => {
  let search = req.body.search
  console.log(search)
  try {

    // const cacheNews = await client.get('news')
    // if (cacheNews){
    //   const uploadSearch = [];
    //   // console.log(newsAPI.data.articles[0])
    //   for (let i = 0; i < cacheNews.length; i++){

    //     // console.log('this is articles title: ', newsAPI.data.articles[i].title)
    //     // console.log('this is articles description: ', newsAPI.data.articles[i].description)
    //     // console.log('this is articles content: ', newsAPI.data.articles[i].content)

    //     if (cacheNews[i].title.toLowerCase().includes(search.toLowerCase()) || cacheNews[i].description.toLowerCase().includes(search.toLowerCase()) || cacheNews[i].content.toLowerCase().includes(search.toLowerCase())){
    //       uploadSearch.push(cacheNews[i])
    //     }
    //   }
    //   console.log('this is after the upload search: ', uploadSearch)
    //   res.render('newsSearch', { articles: uploadSearch})
    // }

    // will have to change the end of this fetch request?
    const newsAPI = await axios.get(`https://gnews.io/api/v4/search?q=example&token=29790cf991de1069b917b1cffe9dbde6&lang=en`)
    // console.log('this is the data getting fetched: ', newsAPI.data.articles)
    const uploadSearch = [];
    // console.log(newsAPI.data.articles[0])
    for (let i = 0; i < newsAPI.data.articles.length; i++){

      // console.log('this is articles title: ', newsAPI.data.articles[i].title)
      // console.log('this is articles description: ', newsAPI.data.articles[i].description)
      // console.log('this is articles content: ', newsAPI.data.articles[i].content)
      
      if (newsAPI.data.articles[i].title.toLowerCase().includes(search.toLowerCase()) || newsAPI.data.articles[i].description.toLowerCase().includes(search.toLowerCase()) || newsAPI.data.articles[i].content.toLowerCase().includes(search.toLowerCase())){
        uploadSearch.push(newsAPI.data.articles[i])
      }
    }
    console.log('this is after the upload search: ', uploadSearch)
    res.render('newsSearch', { articles: uploadSearch})
    // console.log(articles);
  } catch (error) {
    if (error.response){
      res.render('newsSearch', { articles: null})
      console.log(error.response.data)
      console.log(error.response.status)
      console.log(error.response.headers)
    }
    else if (error.request){
      res.render('newsSearch', { articles: null})
      console.log(error.request)
    }
    else {
      res.render('newsSearch', { articles: null})
      console.error('Error', error.message)
    }
  }
});


module.exports = newsRouter
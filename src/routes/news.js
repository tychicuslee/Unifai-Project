const express = require('express');
const newsRouter = express.Router();
const axios = require('axios')

newsRouter.get('', async(req, res) => {
  // res.render('news');

  try {
    const newsAPI = await axios.get(`https://gnews.io/api/v4/search?q=example&token=29790cf991de1069b917b1cffe9dbde6&lang=en`)
    // console.log(newsAPI.data.articles)
    res.render('news', { articles: newsAPI.data.articles })
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

module.exports = newsRouter
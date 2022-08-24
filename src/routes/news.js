const express = require('express');
const newsRouter = express.Router();
const axios = require('axios')

newsRouter.get('', async(req, res) => {
  // res.render('news');

  try {
    const newsAPI = await axios.get(`https://gnews.io/api/v4/search?q=example&token=29790cf991de1069b917b1cffe9dbde6&lang=en`)
    // console.log(newsAPI.data)
    res.render('news', { articles: newsAPI.data })
  } catch (error) {
    if (error.response){
      console.log(error.response.data)
      console.log(error.response.status)
      console.log(error.response.headers)
    }
    else if (error.request){
      console.log(error.request)
    }
    else {
      console.error('Error', error.message)
    }
  }

});

module.exports = newsRouter
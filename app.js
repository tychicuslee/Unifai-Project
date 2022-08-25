const express = require('express');
const bodyParser = require('body-parser')

const app = express();
const port = 3000;



//Static Files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/img', express.static(__dirname + 'public/img'))
app.use('/js', express.static(__dirname + 'public/js'))

//Templating Engine
app.set('views', './src/views/partials')
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended : true }))

// const client = redis.createClient()
// client.on('error', (err) => console.log('Redis Client Error', err));
// await client.connect();
// console.log('Redis connected!')


//Routes
const newsRouter = require('./src/routes/news')

app.use('/', newsRouter)



//Listen on port 3000
app.listen(port, () => console.log(`listening on port ${port}`));

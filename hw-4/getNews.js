const express = require ('express')
const path = require ('path')
const consolidate  = require ('consolidate')
const request = require('request')
const cheerio = require('cheerio')

const app = express()

// middleware
app.use(express.urlencoded({extended: true}));

// Настройка handlebars
app.engine('hbs', consolidate.handlebars)
app.set('view engine', 'hbs')
app.set('views', path.resolve(__dirname, 'views'))

// Роутинг
app.all('/', (req, res, next) => {
   next();
});

app.get('/', (req, res) => {
   res.sendFile(path.resolve(__dirname, 'index.html'))
})

app.post('/news', (req, res) => {
   let userChoice = Object.keys(req.body)
   // getNews(userChoice)
   // res.send('ok')
   res.render('news', getNews(userChoice))
})

app.listen(8000, () => {
   console.log('Server has been started')
})




function getNews (cat) {
   let allNews = []
   cat.forEach(el => {
      let url = `https://yandex.ru/news/rubric/${el}?from=rubric`
      request(url, (err, response, body) => {
         if (!err && response.statusCode === 200) {
               const $ = cheerio.load(body)
               const news = $('.link.link_theme_black.i-bem')
               let newsList = {cat: el, news: []}
               for (i = 0; i < news.length; i++) {
                  let newsItem = news.eq(i).text()
                  newsList.news.push(newsItem)
               }
               // console.log(newsList)
               allNews.push(newsList)
               console.log(allNews)
         } else console.log(err)
      })
   })
  
}





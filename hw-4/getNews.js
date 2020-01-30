const express = require ('express')
const path = require ('path')
const consolidate  = require ('consolidate')
const request = require('request')
const cheerio = require('cheerio')

const app = express()

// middleware
app.use(express.urlencoded({extended: true}));
app.use('/styles', express.static(path.resolve(__dirname, 'assets/css')));

// Настройка handlebars
app.engine('hbs', consolidate.handlebars)
app.set('view engine', 'hbs')
app.set('views', path.resolve(__dirname, 'views'))

// Роутинг
app.all('/', (req, res, next) => {
   next();
});

app.get('/', (req, res) => {
   res.render('news', template)
})

app.post('/news', (req, res) => {
   let userChoice = Object.keys(req.body)
   let promises = []
   userChoice.forEach(el => {
      promises.push(getNews(el))
   })
   Promise.all(promises).then((data) => {
      // res.send(data)
      res.render('news', Object.assign(template, {allNews: data}))
   },
   (err) => {
      res.send(err)
   })
})

app.listen(8000, () => {
   console.log('Server has been started')
})

// Функционал
class Category {
   constructor () {
      this.values = {
         politics: 'Политика', 
         society: 'Общество', 
         business: 'Экономика', 
         world: 'В мире', 
         incident: 'Происшествия', 
         culture: 'Культура', 
         computers: 'Технологии', 
         science: 'Наука', 
         auto: 'Авто'
      }
      this.list = []
      this.getList()
   }
   _InRus (cat){
      return this.values[cat]
   }
   getList(){
      Object.keys(this.values).forEach(val => {
         this.list.push({categoryClass: val, categoryName: this.values[val]});
      });
   }
}

let categories = new Category()
let template = {category: categories.list}

function getNews (cat) {
   let url = `https://yandex.ru/news/rubric/${cat}?from=rubric`
   return new Promise( (resolve, reject) => {
      request(url, (err, response, body) => {
         if (!err && response.statusCode === 200) {
               const $ = cheerio.load(body)
               const news = $('.link.link_theme_black.i-bem')
               const newsByCat = {block: []}
               for (i = 0; i < news.length; i++) {
                  let newsItem = news.eq(i).text()
                  newsByCat.block.push({title: newsItem, categoryClass: cat, categoryName: categories._InRus(cat)})
               }
               resolve(newsByCat)
         } else reject(err);
      })
   })
}
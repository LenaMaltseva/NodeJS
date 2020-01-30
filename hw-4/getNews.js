const express = require ('express')
const path = require ('path')
const consolidate  = require ('consolidate')
const request = require('request')
const cheerio = require('cheerio')

const app = express()

// middleware
app.use(express.urlencoded({extended: true}));
app.use('/styles', express.static(path.resolve(__dirname, 'assets/css')));
app.use('/img', express.static(path.resolve(__dirname, 'assets/img')));

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
   let userChoice = category.getUserChoice(req.body)
   let promises = []
   userChoice.forEach(el => {
      promises.push(getNews(el))
   })
   Promise.all(promises).then((data) => {
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
class Categories {
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
      this._getCatList()
   }
   _getCatList (){
      Object.keys(this.values).forEach(val => {
         this.list.push({categoryClass: val, categoryName: this.values[val]});
      });
   }
   getUserChoice (obj) {
      let userChoice = []
      Object.keys(obj).forEach(el => {
         if (el !== 'quantity') {
            userChoice.push({cat: el, quantity: obj.quantity})
         }
      })
      return userChoice
   }
   inRus (cat) {
      return this.values[cat]
   }
}

let category = new Categories()
let template = {category: category.list}

function getNews (userChoice) {
   let url = `https://yandex.ru/news/rubric/${userChoice.cat}?from=rubric`
   return new Promise( (resolve, reject) => {
      request(url, (err, response, body) => {
         if (!err && response.statusCode === 200) {
               const $ = cheerio.load(body)
               const news = $('.link_theme_black')
               const newsByCat = {block: []}
               for (let i = 0; i < (news.length < userChoice.quantity ? news.length : userChoice.quantity); i++) {
                  newsByCat.block.push({
                     title: news.eq(i).text(), 
                     href: news.eq(i).attr('href'), 
                     categoryClass: userChoice.cat, 
                     categoryName: category.inRus(userChoice.cat)
                  })
               }
               resolve(newsByCat)
         } else reject(err);
      })
   })
}
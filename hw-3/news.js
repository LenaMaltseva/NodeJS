//Программа для получения информации о последних новостях с выбранного сайта в структурированном виде

const request = require('request')
const cheerio = require('cheerio')
const chalk = require('chalk')

const url = 'https://yandex.ru/news/rubric/computers?from=rubric'

request(url, (err, response, body) => {
    if (!err && response.statusCode === 200) {
        const $ = cheerio.load(body)
        const news = $('.link.link_theme_black.i-bem')
        let newsList = ''
        for (i = 0; i < (news.length > 10 ? 10 : news.length); i++) {
            let newsItem = news.eq(i).text()
            newsList += ` - ${newsItem}\n`
        }
        console.log(`\n${chalk.cyan('Свежие новости из мира технологий:')}\n\n${newsList}`)
    } else console.log(err)
})


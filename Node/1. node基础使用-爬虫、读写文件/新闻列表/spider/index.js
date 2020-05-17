const http = require('http')
const cheerio = require('cheerio')
const fs = require('fs')
const webUrl = 'http://news.ifeng.com/'

http.get(webUrl, res => {
    let str = ''
    
    res.on('data', chunk => {
        // console.log(chunk, 'chunk');
        str += chunk
    })
    res.on('end', () => {
        formatData(str)
    })
})

function formatData(html) {
    // console.log(html, 'formatDate');
    let $ = cheerio.load(html)
    let arr = []

    $('.news-stream-basic-news-list li').each((index, item) => {
        let obj = {
            id: index + 1,
            title: $(item).find('a').attr('title'),
            imgUrl: 'http:'+$(item).find('img').attr('src'),
            from: $(item).find('.news-stream-newsStream-mr10').text(),
            newTime: $(item).find('time').text()
        }
        // console.log(obj, 'item');

        arr.push(obj)
    })

    fs.writeFileSync('../resource/data.json', JSON.stringify(arr))
}
const http = require('http')
const fs = require('fs')
const url = require('url')
const path = require('path')
const cheerio = require('cheerio')
const mime = require('./resource/mime.json')
const data = require('./resource/data.json')

class SliceData {
    constructor(data) {
        this.data = data
    }

    computed(page) {
        return this.data.slice((page - 1 ) * 5, page * 5)
    }
}
const sliceData = new SliceData(data)

function formatQuery(str) {
    console.log(str, 'str');
    const arr = str.split('&')
    let obj = {}
    arr.forEach(equal => {
        const equalArr = equal.split('=')
        const key = equalArr[0]
        const value = equalArr[1]
        obj[key] = value
    })
    return obj
}

const server = http.createServer((request, response) => {
    response.setHeader('content-type', 'text/html;charset=utf8')
    
    let urlObj = url.parse(request.url)
    if (urlObj.pathname === '/' || urlObj.pathname === '/index') {
        console.log(urlObj, urlObj.query, 'urlObj.query');
        let query = null
        if (urlObj.query) {
            query = formatQuery(urlObj.query)
        }
        let page = query ? query.page : 1

        const getSliceData = sliceData.computed(page)
        let str = "";
        getSliceData.forEach(v => {
            str += `<li class="news">
            <a href="javascript:;">
                <img src="${v.imgUrl}" alt="">
            </a>
            <div>
                <h3>
                    <a href="javascript:;">${v.title}</a>
                </h3>
                <div class="info">
                    <span class="tips"><span>${v.from}</span></span>
                    <!-- <span class="line"></span> -->
                    <span class="time">| &nbsp;&nbsp;${v.newTime}</span>
                </div>
            </div>
        </li>`;
        })

        let indexData = fs.readFileSync("./views/index.html");
        let $ = cheerio.load(indexData);
        $(".news-list").html(str);
        response.end($.html());
    } else if (urlObj.pathname === '/detail') {
        let indexData = fs.createReadStream('./resource/data.json')
        indexData.pipe(response)
    } else {
        // 处理html中引入的js、css文件
        if (urlObj.pathname !== '/favicon.ico') {
            let ext = path.extname(urlObj.pathname)
            response.setHeader('content-type', mime[ext])

            let resData = fs.createReadStream('./views/css' + urlObj.pathname)
            resData.pipe(response)
        }
    }
})
server.listen(3000)
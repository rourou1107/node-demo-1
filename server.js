// 新建一个 GitHub 仓库 node-demo-1 来存放你的代码，只需要有一个 server.js 文件即可
// 运行 node server.js 8888 可以成功监听 8888 端口
// 访问 http://localhost:8888 得到一个 HTML 页面，页面里面有一个 h1 标签，并且页面会请求一个 style.css
//     style.css 内容为 h1{color: red}
// 访问其他未知路径一律提示「你访问的页面不存在」，并且状态码为 404


var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
    console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
    process.exit(1)
}

var server = http.createServer(function(request, response){
    var parsedUrl = url.parse(request.url, true)
    var pathWithQuery = request.url
    var queryString = ''
    if(pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
    var path = parsedUrl.pathname
    var query = parsedUrl.query
    var method = request.method

    /******** 从这里开始看，上面不要看 ************/

    console.log('有个傻子发请求过来啦！路径（带查询参数）为：' + pathWithQuery)

    if(path === '/'){
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        response.write(`
            <!doctype html>
            <head>
                <link rel="stylesheet" href = "/style"/>
            </head>
            <body>
                 <h1>hello</h1>
            </body>
        `)
        response.end()
    } else if(path === '/style') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/css;charset=utf-8')
        response.write(`h1{color: red}`)
        response.end()
    } else {
        response.statusCode = 404
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        response.write(`<h1>访问的页面不存在</h1>`)
        response.end()
    }

    /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)


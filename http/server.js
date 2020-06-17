const http = require('http')
const fs = require('fs')

http
  .createServer(function (request, response) {
    console.log(request.url)
    // 缓存
    // if (request.url === '/') {
    //   const html = fs.readFileSync(__dirname + '/test.html', 'UTF-8')
    //   response.writeHead(200, {
    //     'Content-Type': 'text/html',
    //   })
    //   response.end(html)
    // } else if (request.url === '/main.js') {
    //   if (request.headers['if-modified-since'] === '1234') {
    //     response.writeHead(304, {
    //       'Content-Type': 'text/javascript',
    //       // Expires: new Date(Date.now() + 1000 * 30), // 设置缓存过期时间，HTTP/1.0中出现
    //       'Cache-Control': 'max-age=30000', // 多少秒之后过期
    //       // 'Cache-Control': 'max-age=300,no-cache',
    //       'Last-Modified': '1234',
    //       // Etag: '5678',
    //     })
    //     response.end('console.log("main.js ~---~~")')
    //   } else {
    //     response.writeHead(200, {
    //       'Content-Type': 'text/javascript',
    //       // Expires: new Date(Date.now() + 1000 * 30), // 设置缓存过期时间，HTTP/1.0中出现
    //       'Cache-Control': 'max-age=30000', // 多少秒之后过期
    //       // 'Cache-Control': 'max-age=300,no-cache',
    //       'Last-Modified': '1234',
    //       // Etag: '5678',
    //     })
    //     response.end('console.log("main.js ~---~~")')
    //   }
    // }

    const html = fs.readFileSync(__dirname + '/test.html', 'UTF-8')
    response.writeHead(200, {
      'Content-Type': 'text/html',
      'Set-Cookie': ['a=123;max-age=2', 'b=456;HttpOnly'],
    })
    response.end(html)
  })
  .listen(9999)

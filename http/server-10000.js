const http = require('http')

http
  .createServer(function (request, response) {
    console.log(request.url)
    response.writeHead(200, {
      'Access-Control-Allow-Origin': 'http://localhost:9999',
    })
    response.end('来自端口：10000的消息')
  })
  .listen(10000)

const http = require('http')

http
  .createServer(function (request, response) {
    console.log(request.url)
    response.writeHead(200, {
      'Access-Control-Allow-Origin': 'http://localhost:9999',
      'Access-Control-Allow-Methods': 'PUT',
      'Access-Control-Allow-Headers': 'X-TEST-CORS',
      'Access-Control-Max-Age': 1000,
    })
    response.end('来自端口：10000的消息')
  })
  .listen(10000)

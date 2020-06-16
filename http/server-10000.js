const http = require('http')

http
  .createServer(function (request, response) {
    console.log(request.headers['if-modified-since'])
    const expiresSign = 111
    if (request.headers['if-modified-since'] === expiresSign)
      response.writeHead(200, {
        'Access-Control-Allow-Origin': 'http://localhost:9999',
        'Access-Control-Allow-Methods': 'PUT',
        'Access-Control-Allow-Headers': 'If-Modified-Since',
        'Access-Control-Max-Age': 1000,
      })
    response.end('来自端口：10000的消息')
  })
  .listen(10000)

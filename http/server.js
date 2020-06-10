const http = require('http')
const fs = require('fs')

http
  .createServer(function (request, response) {
    console.log(request.url)
    const html = fs.readFileSync(__dirname + '/test.html', 'UTF-8')
    response.end(html)
  })
  .listen(9999)

const http = require('http');

const server = http.createServer((req, res) => {
    console.log(req.url, req.method, req.headers);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('Hello from the node server');
});

server.listen(8080, () => {
    console.log('Server is running http://localhost:8080');
});
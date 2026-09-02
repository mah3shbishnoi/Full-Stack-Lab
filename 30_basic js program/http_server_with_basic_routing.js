const http = require('http');

const server = http.createServer((req,res) => {
    if (req.url === '/' && req.method === 'GET') {
        res.end('Welcome to Home Page');
    } else if (req.url === '/about' && req.method === 'GET') {
        res.end('This is about page');
    } else {
        res.statusCode=404;
        res.end('Page Not Found');
    }
});

server.listen(3000, () => console.log('Server started on port 3000'));
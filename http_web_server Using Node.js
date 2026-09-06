const http = require('http');
const HOSTNAME = '127.0.0.1';
const PORT = 3000;

const server = http.createServer((req, res) => {
    console.log(`Received ${req.method} request for: ${req.url}`);

    if(req.url === '/' && req.method === 'GET') {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Welcome to the Node.js Web Server!\n');
    } else if (req.url === 'api/data' && req.method === 'GET') {
         const payload = JSON.stringify({ 
            status: 'success', 
            timestamp: new Date().toISOString(), 
            message: 'Server is running smoothly' 
        }); 
        res.writeHead(200, { 'Content-Type': 'application/json' }); 
        res.end(payload); 
    } else { 
        res.writeHead(404, { 'Content-Type': 'text/plain' }); 
        res.end('404 Not Found: The requested route does not exist.\n'); 
    } 
}); 

server.listen(PORT, HOSTNAME, () => { 
    console.log(`Server successfully started.`); 
    console.log(`Running at http://${HOSTNAME}:${PORT}/`); 
});
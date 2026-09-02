const http = require('http'); 
  
const html = `<!DOCTYPE html> 
<html lang="en"> 
<head> 
  <meta charset="UTF-8"> 
  <title>Bootstrap Page</title> 
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" 
rel="stylesheet"> 
</head> 
<body class="p-5"> 
  <div class="container"> 
    <h1 class="text-primary">Hello from Node.js!</h1> 
    <p class="lead">This page is styled using Bootstrap and served by a plain Node.js server.</p> 
    <button class="btn btn-success">Click Me</button> 
  </div> 
</body> 
</html>`; 
  
const server = http.createServer((req, res) => { 
  res.writeHead(200, { 'Content-Type': 'text/html' }); 
  res.end(html); 
}); 
  
server.listen(3000, () => console.log('Server running on http://localhost:3000')); 
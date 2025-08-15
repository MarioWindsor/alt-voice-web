const http = require('http');
const fs = require('fs');
const path = require('path');

// Create the server
const server = http.createServer((req, res) => {
    // Determine the file path for the request
    // If the root is requested, serve index.html, otherwise serve the requested file
    const filePath = path.join(
        __dirname,
        req.url === '/' ? 'index.html' : req.url
    );

    // Get the file's extension to determine the content type
    const extname = path.extname(filePath);
    let contentType = 'text/html'; // Default content type

    // Set the content type based on the file extension
    switch (extname) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpeg';
            break;
    }

    // Read the file from the disk
    fs.readFile(filePath, (error, content) => {
        if (error) {
            // If the file is not found, send a 404 error
            if (error.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 Not Found</h1>');
            } else {
                // For any other server error, send a 500 error
                res.writeHead(500);
                res.end(`Server Error: ${error.code}`);
            }
        } else {
            // If the file is found, send it with the correct content type
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf8');
        }
    });
});

// Define the port to listen on
const PORT = 3000;

// Start the server
server.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
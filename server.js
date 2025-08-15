const http = require('http');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Create the server
const server = http.createServer((req, res) => {
	if (req.url === '/firebase-config') {
		res.writeHead(200, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify({
			apiKey: process.env.FIREBASE_API_KEY,
			authDomain: process.env.FIREBASE_AUTH_DOMAIN,
			projectId: process.env.FIREBASE_PROJECT_ID,
			storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
			messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
			appId: process.env.FIREBASE_APP_ID
		}));
		return;
	}

	// Determine the file path for the request
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
			if (error.code === 'ENOENT') {
				res.writeHead(404, { 'Content-Type': 'text/html' });
				res.end('<h1>404 Not Found</h1>');
			} else {
				res.writeHead(500);
				res.end(`Server Error: ${error.code}`);
			}
		} else {
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
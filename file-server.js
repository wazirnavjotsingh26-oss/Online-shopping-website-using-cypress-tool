const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

const mimeTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "application/javascript",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg"
};

const server = http.createServer((req, res) => {

    // Set the requested file path
    let filePath = path.join(
        __dirname,
        "public",
        req.url === "/" ? "index.html" : req.url
    );

    // Get file extension
    const extname = path.extname(filePath);

    // Get MIME type
    const contentType =
        mimeTypes[extname] || "application/octet-stream";

    // Read the requested file
    fs.readFile(filePath, (err, content) => {

        if (err) {

            // File not found
            if (err.code === "ENOENT") {
                res.writeHead(404, {
                    "Content-Type": "text/plain"
                });

                res.end("404 - File Not Found");
            } 
            
            // Other server error
            else {
                res.writeHead(500, {
                    "Content-Type": "text/plain"
                });

                res.end("500 - Server Error");
            }

        } else {

            // File found
            res.writeHead(200, {
                "Content-Type": contentType
            });

            res.end(content);
        }
    });
});

// Start server
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
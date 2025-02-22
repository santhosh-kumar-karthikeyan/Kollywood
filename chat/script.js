const express = require("express");
const { Server } = require("ws");
const path = require("path");

const app = express();
const port = 8090;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Serve index.html when visiting "/"
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start HTTP server
const server = app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// Attach WebSocket server to HTTP server
const wss = new Server({ server });

let clients = [];

wss.on("connection", (ws) => {
    console.log("New WebSocket connection!");
    clients.push(ws);

    ws.on("message", (message) => {
        console.log(`Received: ${message}`);

        // Broadcast message to all clients except sender
        clients.forEach(client => {
            if (client !== ws && client.readyState === client.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on("close", () => {
        console.log("Client disconnected.");
        clients = clients.filter(client => client !== ws);
    });
});

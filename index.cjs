// index.js
const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);

// ایجاد WebSocket Server
const wss = new WebSocket.Server({ server });

// وقتی کسی وصل شد
wss.on("connection", (ws) => {
  ws.on("message", (msg) => {
    console.log("پیام دریافت شد:", msg);

    // فرستادن پیام برای همه کلاینت‌های وصل شده
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(msg);
      }
    });
  });

  // پیام اولیه به کلاینت جدید
  ws.send("اتصال برقرار شد!");
});

// یک مسیر ساده HTTP برای تست سرور
app.get("/", (req, res) => {
  res.send("WebSocket server is running...");
});

// پورت Render: process.env.PORT
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

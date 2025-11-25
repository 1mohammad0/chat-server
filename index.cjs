// index.cjs
const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// وقتی کسی وصل شد
wss.on("connection", (ws) => {

  // پیام دریافت شد
  ws.on("message", (msg) => {
    console.log("پیام دریافت شد:", msg);

    // ارسال پیام به همه به جز فرستنده
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(msg);
      }
    });
  });

  // پیام خوش‌آمدگویی به فرستنده
  ws.send("اتصال برقرار شد!");
});

// تست سرور با مرورگر
app.get("/", (req, res) => {
  res.send("WebSocket server is running...");
});

// پورت سرور
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

import { WebSocketServer, WebSocket } from "ws";
import http from 'http';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors({
    origin: ['http://localhost:5147'],
    credentials: true
}));
const httpServer = app.listen(8000, () => console.log('server running on port 8000'))
const port = 5003

// const server = http.createServer((req, res) => {
//   console.log(new Date() + "request recievved from " + req.url);
//   res.end("connection closed")
// });

// const wss = new WebSocketServer({server});

// let userConnected = 0;
// wss.on('connection', (ws) => {
//   ws.on('error', console.error)

//   ws.on('message', (data, isBinary) => {
//      wss.clients.forEach((client) => {
//        if(client.readyState === WebSocket.OPEN){
//         client.send(data, {binary: isBinary})
//        }
//      })
//   })
//   console.log("users connected", ++userConnected);
//   ws.send('hello fellas, from server');
// });

// server.listen(port, () =>  console.log(`server running on localhost port: ${port}`));




const wss = new WebSocketServer({ server: httpServer });

wss.on('connection', ws => {
    ws.on('error', console.error);

    ws.on('message', function message(data, isBinary) {
        wss.clients.forEach( client =>{
            if (client.readyState === WebSocket.OPEN) {
                client.send(data, { binary: isBinary });
            }
        });
    });

    ws.send('Hello! Message From Server!!');
});
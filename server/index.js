const express = require('express');
const app = express();
http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
app.use(cors()); 
const server = http.createServer(app); 
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:4000',
    methods: ['GET', 'POST'],
  },
});

const CHAT_BOT = 'ChatBot';
io.on('connection', (socket) => {
  console.log(`User connected ${socket.id}`);

  socket.on('join_room', (data) => {
    const { username, room } = data; 
    let __createdtime__ = Date.now();
  socket.to(room).emit('receive_message', {
      message: `${username} has joined the chat room`,
      username: CHAT_BOT,
      __createdtime__,});
  socket.emit('receive_message', {
        message: `Welcome ${username}`,
        username: CHAT_BOT,
        __createdtime__,});

        chatRoom = room;
        allUsers.push({ id: socket.id, username, room });
        chatRoomUsers = allUsers.filter((user) => user.room === room);
        socket.to(room).emit('chatroom_users', chatRoomUsers);
        socket.emit('chatroom_users', chatRoomUsers);
  });
});

server.listen(4000, () => 'Server is running on port 4000');


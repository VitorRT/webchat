"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("./http");
var users = [];
var messages = [];
// permitir que o cliente se conecte com a nossa aplicação
http_1.io.on('connection', function (socket) {
    socket.on("location_client", function (data, callback) {
        socket.join(data.room);
        var userInRoom = users.find(function (user) {
            return user.room === data.room && user.username === data.username;
        });
        if (userInRoom) {
            userInRoom.socket_id = socket.id;
        }
        else {
            users.push({
                room: data.room,
                username: data.username,
                socket_id: socket.id
            });
        }
        ;
        var messagesRoom = getMessagesRoom(data.room);
        callback(messagesRoom);
    });
    socket.on("message", function (data) {
        // salvar as mensagens (Ideal: Salvar em um BD)
        var message = {
            room: data.room,
            username: data.username,
            text: data.message,
            createdAt: new Date()
        };
        messages.push(message);
        // Enviar para os usuários da sala
        http_1.io.to(data.room).emit("message", message);
    });
});
function getMessagesRoom(room) {
    var messagesRoom = messages.filter(function (msg) { return msg.room === room; });
    return messagesRoom;
}

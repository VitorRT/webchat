import { io } from './http';

interface RoomUser {
    socket_id: string,
    username: string,
    room: string
}

interface Messages {
    room: string, 
    text: string,
    username: string,
    createdAt: Date
}

const users: RoomUser[] = [];
const messages: Messages[] = [];

// permitir que o cliente se conecte com a nossa aplicação
io.on('connection', (socket) => {
    socket.on("location_client", (data, callback) => {

        socket.join(data.room);

        const userInRoom = users.find(user => {
            return user.room === data.room && user.username === data.username
        });
        if(userInRoom) {
            userInRoom.socket_id = socket.id;
        } else {
            users.push({
                room: data.room,
                username: data.username,
                socket_id: socket.id
            });
        };

        const messagesRoom = getMessagesRoom(data.room);
        callback(messagesRoom);
    });

    socket.on("message", data => {
        // salvar as mensagens (Ideal: Salvar em um BD)
        const message: Messages = {
            room: data.room,
            username: data.username,
            text: data.message,
            createdAt: new Date()
        }

        messages.push(message);

        // Enviar para os usuários da sala
        io.to(data.room).emit("message", message);
    })
});

function getMessagesRoom(room: string) {
    const messagesRoom = messages.filter(msg => msg.room === room);
    return messagesRoom;
}
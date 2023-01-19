const socket = io();

const urlSearch = new URLSearchParams(window.location.search);

const username = urlSearch.get("username");
const room = urlSearch.get("select_room");

const usernameDiv = document.getElementById('username-text');
const roomDiv = document.getElementById('room-text');

document.title = room;

usernameDiv.innerHTML = `
    <p class="mx-auto form-text" >Olá @${username} 👋</p>
`;
roomDiv.innerHTML = `
    <a href="index.html">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-box-arrow-left" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"/>
            <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
        </svg>
    </a>
    <h4 class="mx-auto">${room}</h4>
`

socket.emit("location_client", {
    username,
    room
}, messages => {
    messages.forEach(msg => createMessage(msg))
});

document.getElementById("message_input").addEventListener("keypress", event => {
    if(event.key === 'Enter') {
        const message = event.target.value;

        const data = {
            room,
            message,
            username
        };
        
        socket.emit("message", data);

        event.target.value = "";
    }
});

socket.on("message", data => {
    createMessage(data);
});


function createMessage(data) {
    const messagesDiv = document.getElementById("messages");

    messagesDiv.innerHTML += `
    <div id="new_messages">
        <p>
            <span class="badge bg-dark">@${data.username}</span> : ${data.text} - <span class="text-muted small">(${dayjs(data.createdAt).format("DD/MM HH:mm")})</span>
        </p>
    </div>
    `
};
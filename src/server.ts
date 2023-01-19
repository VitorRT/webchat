import { server } from'./http';
import './websocket';

const port = process.env.PORT || 3000;
const host = "localhost";
const api_url = `http://${host}:${port}`;

server.listen(port, () => {
    console.log(`\n[ ON ] - Servidor rodando em [ ${api_url} ]`);
})
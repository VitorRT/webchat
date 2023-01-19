"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("./http");
require("./websocket");
var port = process.env.PORT || 3000;
var host = "localhost";
var api_url = "http://".concat(host, ":").concat(port);
http_1.server.listen(port, function () {
    console.log("\n[ ON ] - Servidor rodando em [ ".concat(api_url, " ]"));
});

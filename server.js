"use strict";

import http from "node:http";
import { router } from "./app.js";

const hostname = "127.0.0.1";
const port = process.env.PORT || 8080;

const server = http.createServer((request, response) => {
    router(request, response);
});


server.listen(port, hostname, () => {
    console.log(`Listening on ${hostname}:${port}...`)
})

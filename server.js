"use strict";

import http from 'node:http';

const hostname = "127.0.0.1";
const port = 8080;

const server = http.createServer((request, response) => {
    
});


server.listen(port, hostname, () => {
    console.log(`Listening on ${hostname}:${port}...`)
})

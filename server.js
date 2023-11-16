"use strict";

import Fastify from "fastify";
import fastifyWebsocket from "@fastify/websocket";

const hostname = "127.0.0.1";
const port = process.env.PORT || 8080;

const fastify = Fastify({
    logger: true
});

// Register websocket plugin
fastify.register(fastifyWebsocket);

/* 
    Routings
*/
fastify.get("/", async function(request, response) {

});

fastify.get("/game", async function(request, response) {

});

fastify.post("/api/v1/user/register", async function(request, response) {

});

// Start the server
const start = async function() {
    try {
        await fastify.listen({
            host: hostname,
            port: port
        });
    }
    catch (error) {
        fastify.log.error(err);
        process.exit(1);
    }
}
start();
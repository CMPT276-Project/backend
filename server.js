"use strict";

import Fastify from "fastify";
import fastifyWebsocket from "@fastify/websocket";

const hostname = "127.0.0.1";
const port = process.env.PORT || 8080;

const fastify = Fastify({
    logger: true
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
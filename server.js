"use strict";

import Fastify from "fastify";

const hostname = "127.0.0.1";
const port = process.env.PORT || 8080;

const fastify = Fastify({
    logger: true
});

/* 
    Routings
*/
fastify.post("/api/v1/score/register", async function(request, response) {
    
});

fastify.patch("/api/v1/score/update", async function(request, response) {

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
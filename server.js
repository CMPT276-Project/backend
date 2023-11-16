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

// Handle single-player mode 
fastify.register(async function(fastify) {
    fastify.get("/api/v1/ws/game", {
        websocket: true
    }, async function(ws_connection, request) {
        console.log("Client connected");
    
        ws_connection.socket.on("message", async function(message) {
            const client_message = JSON.parse(message.toString());
            
            console.log(message.toString());

            switch(client_message.opcode) {
                case "get-categories":
                    let categories = await fetch("https://opentdb.com/api_category.php");
                    categories = await categories.json();
            
                    ws_connection.socket.send(JSON.stringify(categories));
                    break;
                case "get-question":
                    const category = client_message.payload.category;
                    const amount = client_message.payload.number_of_questions;
            
                    let url = `https://opentdb.com/api.php?category=${category}&amount=${amount}`;
            
                    if(client_message.diffculty !== "any") {
                        url.concat(`&difficulty=${client_message.diffculty}`);
                    }
            
                    if(client_message.type !== "any") {
                        url.concat(`&type=${client_message.type}`);
                    }

                    let questions = await fetch(url);
                    questions = await questions.json();
                    ws_connection.socket.send(JSON.stringify(questions)); 
                    break;
                default:
                    break;
            }
        })
    
        ws_connection.socket.on("close", function(message) {
            console.log("Client disconnected")
        })
    });
})

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
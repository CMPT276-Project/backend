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
fastify.get("/api/v1/ws/game", {
    websocket: true
}, async function(ws_connection, request) {
    ws_connection.socket.on("get-categories", async function(message) {
        let categories = await fetch("https://opentdb.com/api_category.php");
        categories = await categories.json();

        ws_connection.socket.send(categories);
    });

    ws_connection.socket.on("get-question", async function(message) {
        const question_parameters = JSON.parse(message.to_string());

        const category = question_parameters.category;
        const amount = question_parameters.number_of_questions;

        let url = `https://opentdb.com/api.php?category=${category}&amount=${amount}`;

        if(question_parameters.diffculty !== "any") {
            url.concat(`&difficulty=${question_parameters.diffculty}`);
        }

        if(question_parameters.type !== "any") {
            url.concat(`&type=${question_parameters.type}`);
        }

        let questions = await fetch(url);
        questions = await questions.json();
        ws_connection.socket.send(questions); 
    });
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
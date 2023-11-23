"use strict";

import Fastify from "fastify";

import { Database } from "./app/database";

const hostname = "127.0.0.1";
const port = process.env.PORT || 8080;
const db_path = process.env.DB_PATH || "./db.sqlite3";

const fastify = Fastify({
    logger: true
});

const database = new Database(db_path);

/* 
    Routings - User Management
*/

// Generate, store, and return a GUID
fastify.get("/api/v1/user/register", async function(request, response) {
    const sql = `
        INSERT INTO users
            VALUES(?, ?);
    `;
    const guid = crypto.randomUUID();

    try {
        await database.run_statement(sql, guid, guid);
        response.send({
            id: guid
        });
    }   
    catch(error) {
        response.send({
            error: error
        });
    }
});

// Update a user's name
fastify.post("/api/v1/user/:guid", async function(request, response) {
    const sql = `
        UPDATE users
            SET name = ?
            WHERE id = ?;
    `;
    
    const guid = response.params["guid"];
    const name = response.body["name"];

    try {
        await database.run_statement(sql, name, guid);
    }
    catch(error) {
        response.send({
            error: error
        });
    }
});

/*
    Routings - Score Management
*/

// Get all scores
fastify.get("/api/v1/score", async function(request, response) {
    const sql = `
        SELECT *
            FROM scores;
    `;

    try {
        const scores = await database.get_all_statement(sql);
        response.send({
            scores: JSON.stringify(scores)
        });
    }
    catch(error) {
        response.send({
            error: error
        });
    }
})

// Get user's current score
fastify.get("/api/v1/score/:guid", async function(request, response) {
    const sql = `
        SELECT *
            FROM scores
            WHERE id = ?;
    `;

    const guid = request.params["guid"];

    try {
        const score = await database.get_statement(sql, guid);
        response.send({
            score: JSON.stringify(score)
        })
    }
    catch(error) {
        response.send({
            error: error
        });
    }
});

// Update a user's score
fastify.post("/api/v1/score/:guid", async function(request, response) {
    const get_score_sql = `
        SELECT score
            FROM scores
            WHERE id = ?;
    `;

    const store_score_sql = `
        UPDATE scores
            SET score = ?
            WHERE id = ?;
    `;

    const guid = request.params["guid"];
    const update_by_amount = request.body["score"];

    try {
        const current_score = await database.get_statement(get_score_sql, guid)["score"];
        await database.run_statement(
            store_score_sql, 
            current_score + update_by_amount,
            guid
        );
    }
    catch(error) {
        response.send({
            error: error
        });
    }
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
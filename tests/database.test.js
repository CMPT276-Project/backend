"use strict";

import { Database } from "../app/database";

const db_path = process.env.DB_PATH || "./testing.sqlite3";
const db = new Database(db_path);

describe("Table - Difficulties", function() {
    test("Inserting and retrieving row", async function() {
        await db.add_difficulty("Testing", 123);

        expect(false).toBe(true);
    });

    test("Retrieving non-existent row", async function() {

    })

    test("Inserting and retrieving row with incorrect data types", async function() {

    })
})
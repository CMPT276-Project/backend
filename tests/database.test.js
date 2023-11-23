"use strict";

import { randomUUID } from "node:crypto";
import { Database } from "../app/database";
import { create_user, get_user, update_user_name } from "../app/users";

const db_path = process.env.DB_PATH || "./testing.sqlite3";
const db = new Database(db_path);

const guid = randomUUID();
const name = "Taylor";

describe("Users", function() {
    test("Adding user to database", function() {
        create_user(db, guid, 
            function(id) {
                expect(id).toBe(guid);
            },
            function(error) {
                // TODO: Unsure what to test for this branch.
            }
        );
    });

    test("Update username", function() {
        update_user_name(db, guid, name,
            function() { },
            function(error) {
                // TODO: Unsure what to test for this branch.
            }
        );

        get_user(db, guid,
            function(record) {
                expect(record.name).toBe(name);
            },
            function(error) {
                // TODO: Unsure what to test for this branch.
            }
        );
    });
});

describe("Scores", function() {
    test("Get user score", function() {
        
    });

    test("Get all user scores", function() {

    });

    test("Update user score", function() {

    })
})
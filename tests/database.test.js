"use strict";

import { Database } from "../app/database";

const db_path = process.env.DB_PATH || "./testing.sqlite3";
const db = new Database(db_path);

describe("Users", function() {

})

describe("Scores", function() {
    
})
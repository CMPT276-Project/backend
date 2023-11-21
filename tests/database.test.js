"use strict";

const sqlite3 = require("sqlite3");

const db_path = process.env.DB_PATH || "./testing.sqlite3";
const db = new sqlite3.Database(db_path, sqlite3.OPEN_READWRITE | sqlite3.OPEN_FULLMUTEX);

describe("Table operations", function() {
    test("Table insertion tests - difficulties", function(done) {
        expect(false).toBe(true);
    });
    
    test("Table insertion tests - categories", function(done) {
        expect(false).toBe(true);
    });
    
    test("Table insertion tests - sources", function(done) {
        expect(false).toBe(true);
    });
    
    test("Table insertion tests - questions", function(done) {
        expect(false).toBe(true);
    });
    
    test("Table deletion tests - difficulties", function(done) {
        expect(false).toBe(true);
    });
    
    test("Table deletion tests - categories", function(done) {
        expect(false).toBe(true);
    });
    
    test("Table deletion tests - sources", function(done) {
        expect(false).toBe(true);
    });
    
    test("Table deletion tests - questions", function(done) {
        expect(false).toBe(true);
    });
})

db.close();
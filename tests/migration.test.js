"use strict";

const sqlite = require("sqlite3");

const db_path =  process.env.DB_PATH || "./db.sqlite3";
const db = new sqlite.Database(db_path, sqlite.OPEN_READWRITE | sqlite.OPEN_FULLMUTEX);

test("Table existence checks", function(done) {
    db.all(`
    SELECT name FROM sqlite_master 
        WHERE type="table";
    `, function(err, rows) {
        if(err) {
            done(err);
            return;
        }

        try {
            expect(rows)
                .toHaveLength(5);
            expect(rows)
                .toContainEqual({name: "difficulties"});
            expect(rows)
                .toContainEqual({name: "categories"});
            expect(rows)
                .toContainEqual({name: "sources"});
            expect(rows)
                .toContainEqual({name: "scores"});
            expect(rows)
                .toContainEqual({name: "questions"});
            done();
        }
        catch(error) {
            done(error);
        }
    });
});

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


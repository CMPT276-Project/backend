"use strict";

import sqlite from "sqlite3";

class Database {
    /*
        Database manager (explicitly not a comprehensive ORM) for SQLite.

        Arguments:
            db_path (String):   Path to an on-disk SQLite database.
    */
    constructor(db_path) {
        this.db_path = db_path;
        this.db = new sqlite.Database(db_path, sqlite.OPEN_READWRITE | sqlite.OPEN_FULLMUTEX);

        this.cache = {};
    }

    /*
        ===================================================
        CRUD functions related to the 'difficulties' table.
        ===================================================
    */

    /*
        Inserts a difficulty into the 'difficulties' table

        Arguments:
            name (String):      The name is the primary key column for the table, if this key 
                                already exists then SQLite will return a UNIQUE constraint failure.
            points (Integer):   Value is passed in literally, bounds limits should be performed before 
                                calling this function.
    */
    async add_difficulty(name, points) {
        const sql = `
            INSERT INTO difficulties 
                VALUES (?, ?);
        `;
        
        const statement = await this.get_prepared_statement(sql);
        statement.run(name, points);
    }

    async get_points(name) {
        const sql = `
            SELECT points 
                FROM difficulties 
                WHERE difficulty = ?;
        `;

        const statement = await this.get_prepared_statement(sql);
        statement.run(name);
        // TODO: Insert return
    }

    async get_difficulties() {
        const sql = `
            SELECT * 
                FROM difficulties;
        `;
        
        const statement = await this.get_prepared_statement(sql);
        statement.run();
        // TODO: Insert return
    }

    async update_points(name, points) {
        const sql = `
            UPDATE difficulties
                SET points = ?
                WHERE difficulty = ?;
        `;

        const statement = await this.get_prepared_statement(sql);
        statement.run(points, name);
    }

    async remove_difficulty(name) {
        const sql = `
            DELETE FROM difficulties 
                WHERE difficulty = ?;
        `;

        const statement = await this.get_prepared_statement(sql);
        statement.run(name);
    }

    /*
        =================================================
        CRUD functions related to the 'categories' table.
        =================================================
    */

    /*
        ==============================================
        CRUD functions related to the 'sources' table.
        ==============================================
    */

    /*
        ============================================
        CRUD functions related to the 'users' table.
        ============================================
    */

    /*
        =============================================
        CRUD functions related to the 'scores' table.
        =============================================
    */

    /*
        ================================================
        CRUD functions related to the 'questions' table.
        ================================================
    */


    get_prepared_statement(sql) {
        return new Promise(function(resolve, reject) {
            if(this.cache[sql] === undefined) {
                const statement = this.db.prepare(sql, function(err) {
                    if(err !== null) {
                        reject(err);
                    }
                });

                this.cache[sql] = statement;
            }

            resolve(this.cache[sql]);            
        }.bind(this));
    }

    close() {
        this.db.close();
    }
}

export {
    Database
};
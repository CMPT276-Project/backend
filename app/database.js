"use strict";

import sqlite from "sqlite3";

class Database {
    /*
        Database connection manager (explicitly not a comprehensive ORM) for SQLite.

        This function only executes commands and passes through results back to the caller.

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
        
        return this.run_statement(sql, name, points);
    }

    async get_difficulty(name) {
        const sql = `
            SELECT * 
                FROM difficulties 
                WHERE difficulty = ?;
        `;

        return this.get_statement(sql, name);
    }

    async get_all_difficulties() {
        const sql = `
            SELECT * 
                FROM difficulties;
        `;
        
        return this.get_all_statement(sql);
    }

    async update_difficulty(name, points) {
        const sql = `
            UPDATE difficulties
                SET points = ?
                WHERE difficulty = ?;
        `;

        return this.run_statement(sql, points, name);
    }

    async delete_difficulty(name) {
        const sql = `
            DELETE FROM difficulties 
                WHERE difficulty = ?;
        `;

        return this.run_statement(sql, name);
    }

    /*
        =================================================
        CRUD functions related to the 'categories' table.
        =================================================
    */

    async add_category() {

    }

    async get_category() {

    }

    async get_all_categories() {

    }

    async update_category() {

    }

    async remove_category() {

    }

    /*
        ==============================================
        CRUD functions related to the 'sources' table.
        ==============================================
    */

    async add_source() {

    }

    async get_source() {

    }

    async get_all_sources() {

    }
    
    async update_source() {

    }

    async remove_source() {

    }

    /*
        ============================================
        CRUD functions related to the 'users' table.
        ============================================
    */

    async add_user(guid, name) {
        const sql = `
            INSERT INTO users 
                VALUES(?, ?)
        `;

        return this.run_statement(sql, guid, name);
    }

    async get_user(guid) {
        const sql = `
            SELECT *
                FROM users
                WHERE id = ?;
        `;

        return this.get_statement(sql, guid);
    }

    async get_all_users() {
        const sql = `
            SELECT *
                FROM users;
        `;

        return this.get_all_statement(sql);
    }

    async update_user(guid, name) {
        const sql = `
            UPDATE users
                SET name = ?
                WHERE id = ?;
        `;

        return this.run_statement(sql, name, guid);
    }

    async remove_user(guid) {
        const sql = `
            DELETE FROM users
                WHERE id = ?;
        `;

        this.run_statement(sql, guid);
    }

    /*
        =============================================
        CRUD functions related to the 'scores' table.
        =============================================
    */

    async add_score() {

    }

    async get_score() {

    }

    async get_all_scores() {

    }

    async update_score() {

    }

    async remove_score() {

    }

    /*
        ================================================
        CRUD functions related to the 'questions' table.
        ================================================
    */

    async add_question() {

    }

    async get_question() {

    }

    async get_all_questions() {

    }

    async update_question() {

    }

    async remove_question() {

    }


    get_prepared_statement(sql) {
        return new Promise(function(resolve, reject) {
            if(this.cache[sql] === undefined) {
                const statement = this.db.prepare(sql, function(err) {
                    if(err !== null) {
                        reject(err);
                        return;
                    }
                });

                this.cache[sql] = statement;
            }

            resolve(this.cache[sql]);            
        }.bind(this));
    }

    run_statement(sql, ...parameters) {
        const promise = this.get_prepared_statement(sql)
            .then(function(statement) {
                statement.run(...parameters, function(err) {
                    if(err !== null) {
                        reject(err);
                        return;
                    }

                    resolve();
                });
            });

        return promise;
    }

    get_statement(sql, ...parameters) {
        return this.get_prepared_statement(sql)
            .then(function(statement) {
                statement.get(...parameters, function(err, row) {
                    if(err !== null) {
                        reject(err, row);
                        return;
                    }

                    resolve(row);
                });
            });
    }

    get_all_statement(sql, ...parameters) {
        return this.get_prepared_statement(sql)
            .then(function(statement) {
                statement.all(...parameters, function(err, rows) {
                    if(err !== null) {
                        reject(err, rows);
                        return;
                    }

                    resolve(rows);
                });
            });
    }

    close() {
        this.db.close();
    }
}

export {
    Database
};
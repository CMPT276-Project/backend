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

    async add_difficulty(name, points) {
        const sql = `
            INSERT INTO difficulties 
                VALUES(?, ?);
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

    async add_category(name, description) {
        const sql = `
            INSERT INTO categories
                VALUES(?, ?);
        `;

        return this.run_statement(sql, name, description);
    }

    async get_category(name) {
        const sql = `
            SELECT *
                FROM categories
                WHERE category = ?;
        `;

        return this.get_statement(sql, name);
    }

    async get_all_categories() {
        const sql = `
            SELECT *
                FROM categories;
        `;

        return this.get_all_statement(sql);
    }

    async update_category(name, description) {
        const sql = `
            UPDATE categories
                SET description = ?
                WHERE category = ?; 
        `;

        return this.run_statement(sql, description, name);
    }

    async remove_category(name) {
        const sql = `
            DELETE FROM categories
                WHERE category = ?;
        `;

        return this.run_statement(sql, name);
    }

    /*
        ==============================================
        CRUD functions related to the 'sources' table.
        ==============================================
    */

    async add_source(name, source) {
        const sql = `
            INSERT INTO sources
                VALUES(?, ?);
        `;

        return this.run_statement(sql, name, source);
    }

    async get_source(name) {
        const sql = `
            SELECT *
                FROM sources
                WHERE source_name = ?;
        `;

        return this.get_statement(sql, name);
    }

    async get_all_sources() {
        const sql = `
            SELECT *
                FROM sources;
        `;

        return this.get_all_statement(sql);
    }
    
    async update_source(name, source) {
        const sql = `
        UPDATE sources
            SET source = ?
            WHERE source_name = ?; 
        `;

        return this.run_statement(source, name);
    }

    async remove_source(name) {
        const sql = `
            DELETE FROM sources
                WHERE source_name = ?;
        `;

        return this.run_statement(sql, name);
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

        return this.run_statement(sql, guid);
    }

    /*
        =============================================
        CRUD functions related to the 'scores' table.
        =============================================
    */

    async add_score(id, score) {
        const sql = `
            INSERT INTO scores
                VALUES(?, ?);
        `;

        return this.run_statement(sql, id, score);
    }

    async get_score(id) {
        const sql = `
            SELECT *
                FROM scores
                WHERE id = ?;
        `;

        return this.get_statement(sql, id);
    }

    async get_all_scores() {
        const sql = `
            SELECT *
                FROM scores;
        `;

        return this.get_all_statement(sql);
    }

    async update_score(id, score) {
        const sql = `
            UPDATE scores
                SET score = ?
                WHERE id = ?;
        `;

        return this.run_statement(sql, score, id);
    }

    async remove_score(id) {
        const sql = `
            DELETE FROM scores
                WHERE id = ?;
        `;

        return this.run_statement(sql, id);
    }

    /*
        ================================================
        CRUD functions related to the 'questions' table.
        ================================================
    */

    async add_question(question, source, difficulty, category) {
        const sql = `
            INSERT INTO questions
                VALUES(?, ?, ?, ?);
        `;

        return this.run_statement(sql, question, source, difficulty, category);
    }

    async get_question(question, source, category) {
        const sql = `
            SELECT *
                FROM questions
                WHERE question = ? 
                    AND source = ?
                    AND category = ?;
        `;

        return this.get_statement(sql, question, source, category);
    }

    async get_all_questions() {
        const sql = `
            SELECT *
                FROM questions;
        `;

        return this.get_all_statement(sql);
    }

    async update_question(question, source, category, difficulty) {
        const sql = `
            UPDATE questions
                SET difficulty = ?
                WHERE question = ?
                    AND source = ?
                    AND category = ?;
        `;

        return this.run_statement(sql, difficulty, question, source, category);
    }

    async remove_question(question, source, category) {
        const sql = `
            DELETE FROM questions
                WHERE question = ?
                    AND source = ?
                    AND category = ?;
        `;

        return this.run_statement(sql, question, source, category);
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
                return new Promise(function(resolve, reject) {
                    statement.run(...parameters, function(err) {
                        if(err !== null) {
                            reject(err);
                            return;
                        }
    
                        resolve();
                    });
                });
            });

        return promise;
    }

    get_statement(sql, ...parameters) {
        return this.get_prepared_statement(sql)
            .then(function(statement) {
                return new Promise(function(resolve, reject) {
                    statement.get(...parameters, function(err, row) {
                        if(err !== null) {
                            reject(err);
                            return;
                        }

                        resolve(row);
                    });
                });
            });
    }

    get_all_statement(sql, ...parameters) {
        return this.get_prepared_statement(sql)
            .then(function(statement) {
                return new Promise(function(resolve, reject) {
                    statement.all(...parameters, function(err, rows) {
                        if(err !== null) {
                            reject(err);
                            return;
                        }

                        resolve(rows);
                    });
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
db.serialize(function() {
    db.exec(`
    CREATE TABLE IF NOT EXISTS difficulties(
        difficulty TEXT,
        points INTEGER,
    
        PRIMARY KEY(difficulty)
    );

    CREATE TABLE IF NOT EXISTS categories(
        category TEXT,
        description TEXT,
    
        PRIMARY KEY(category)
    );

    CREATE TABLE IF NOT EXISTS sources(
        source_name TEXT,
        source TEXT,
    
        PRIMARY KEY(source_name)
    );

    CREATE TABLE IF NOT EXISTS users(
        id TEXT,
        name TEXT UNIQUE,

        PRIMARY KEY(id)
    );

    CREATE TABLE IF NOT EXISTS scores(
        id TEXT,
        score INTEGER,

        PRIMARY KEY(id),

        FOREIGN KEY(id)
            REFERENCES users(id)
            ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS questions(
        question TEXT,
        source TEXT DEFAULT "Unknown",
        difficulty TEXT,
        category TEXT,
    
        PRIMARY KEY(question, source, category),
    
        FOREIGN KEY(difficulty)
            REFERENCES difficulties(difficulty)
            ON UPDATE CASCADE
            ON DELETE CASCADE,
        
        FOREIGN KEY(category)
            REFERENCES categories(category)
            ON UPDATE CASCADE
            ON DELETE CASCADE,
    
        FOREIGN KEY(source)
            REFERENCES sources(source_name)
            ON UPDATE CASCADE
            ON DELETE SET DEFAULT
    );
    `);
});

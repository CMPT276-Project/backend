"use strict";

async function create_user(database) {
    const guid = crypto.randomUUID();

    await database.add_user(guid, guid);
}

async function change_username(database, guid, name) {
    await database.update_user(guid, name);
}
"use strict";

async function get_token(_, response) {
    const resp = await fetch("https://opentdb.com/api_token.php?command=request");
    const body = JSON.stringify(await resp.json());
    response.end(body);
}

export { router };
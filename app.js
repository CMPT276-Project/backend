"use strict";

function router(request, response) {
    switch(request.url) {
        case "/":
            start_page(request, response);
            break;
    }
}

function start_page(_, response) {
    response.end("Hello");
}

export { router };
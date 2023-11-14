# Schema

The client will connect to the server either via a REST or WebSocket handshake endpoint.

## REST API

In the case of the REST API, the following is a list of valid endpoints:

- GET `/api/v1/user/register`

This function creates a GUID and then both stores it in a persistent database as well as returns it to the caller.

## WebSocket API

In the case of WebSocket based APIs, the following is a list of valid endpoints:

### `/api/v1/ws/game`

The following is a list of valid events and associated message contents encoded in JSON:

#### `get-categories`

The server will respond with an array in JSON in the following format:

```json
{
    "categories":["Computers", "Math", ...]
}
```

For `categories`, the array must contain at least one value and can contain multiple values.

#### `get-question`

The client will send a JSON encoded message in the following format:

```json
{
    "categories":["Computers", "Math"],
    "types": "multiple" || "truefalse" || "all",
    "diffculty": ["Easy", "Medium", "Hard"]
    "number_of_questions": 50,
}
```

For `types`, the options are one of `multiple`, `truefalse`, or `all`.

For `categories`, and `difficulty`, the array must contain at least one value and can contain multiple values.

`number_of_questions` has an upper limit of 50.

The server will respond with the following JSON:

```json
{
    [
        {
            "category": "Computers",
            "type": "Multiple",
            "question": "Which of the following is the register number for the stack pointer in RISC-V",
            "incorrect_answers": ["x0", "x1", "x20"],
            "correct_answer": "x2",
        },
        ...
    ]
}
```

The array contains one to many number  of questions.
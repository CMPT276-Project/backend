# Schema

The client will connect to the server either via a REST or WebSocket handshake endpoint.

## REST API

In the case of the REST API, the following is a list of valid endpoints:

- GET `/api/v1/user/register`

This function creates a GUID and then both stores it in a persistent database as well as returns it to the caller.

## WebSocket API

In the case of WebSocket based APIs, the following is a list of valid endpoints:

All messages must be encoded with the following format:

```json
{
    "opcode": "get-question",
    "payload": {
        "categories": 0,
        "type": "multiple",
        "diffculty": "easy",
        "number_of_questions": 50,
    }
}
```
`get-question` and associated `payload` is used as a nexample, different operations will have different payloads. Depending on the command,  the usage of `payload` may not be necessary, in this event an empty object should be used instead.

### `/api/v1/ws/game`

The following is a list of valid operations and associated message contents encoded in JSON:

#### `get-categories`

The server will respond with an array in JSON in the following format:

```json
{
    "categories":[
        {
            "id": 0,
            "name": "Computers"
        }
        {
            "id": 1,
            "name": "Mathematics"
        },
        ...
    ]
}
```

It should be noted that the categories names and ids are not representative of actual data and is intended as an example.

#### `get-question`

The client will send a JSON encoded message in the following format:

```json
{
    "categories": 0,
    "type": "multiple",
    "diffculty": "easy",
    "number_of_questions": 50,
}
```

For `types`, the options are one of `multiple`, `boolean`, or `all`.

For `categories`, refer to the values returned from `get-categories` for the ids of categories.

For `difficulty`, the value must contain one of: `easy`, `medium`, `hard`, or `any`.

The `number_of_questions` has an upper limit of 50. This is based off the limits of the OpenTrivia Database API.

The server will respond with the following JSON, certain keys will yield different results based on input parameters:

```json
{
    [
        {
            "category": "Computers",
            "type": "multiple",
            "question": "Which of the following is the register number for the stack pointer in RISC-V",
            "incorrect_answers": ["x0", "x1", "x20"],
            "correct_answer": "x2",
        },
        ...
    ]
}
```

The array contains one to many number (up to the value specified in `number_of_questions`) of questions.
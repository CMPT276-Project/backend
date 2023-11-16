# Schema

The client will connect to the server either via a REST or WebSocket handshake endpoint.

## REST API

### POST /api/v1/score/register

The body of the request MUST contain the following key-value pair encoded in a JSON object: 

```json
{
    "name": "John Smith",
    "guid": "b8cf914e-96ea-4521-b293-619c55b6d9cd" 
}
```

- "guid": is a v4 UUID, this can be generated in browser using: `self.crypto.randomUUID()`.

### PATCH /api/v1/score/update

The URL to this endpoint MUST include a query string indicating the user, for example:

`localhost:8080/api/v1/score/update?id=b8cf914e-96ea-4521-b293-619c55b6d9cd`

The body of the request MUST contain a JSON encoded integer which is added to a pre-existing (or a zero value if not) in the database:

```json
{
    "value": 42
}
```
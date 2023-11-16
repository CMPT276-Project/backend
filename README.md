# What is this?

This repository serves as a working POC of the backend component of our Kahoot style game.

This POC will be concerned with two components of our game: the backend, which consists of setting up the database and establishing a WebSocket server, and the database, which will store the scores of our players.

# Prerequisites

- NodeJS and NPM (as of writing this document, `v18.18.2` and `9.8.1` respectively)

# Running

```bash
npm install
npm start
```

# Dependency Rationale

## Fastify

Fastify appears to be the replacement/alternative to Express as the latter has seen only a handful of commits (most of which seem to be dependency updates) for this year. 

Stable and well-maintained software is, in my opinion, fine with not receiving major version updates and only updating dependencies, but for something as potentially vulnerable as a web framework, it's safer to err on the side of caution and pick something that is more frequently updated instead.
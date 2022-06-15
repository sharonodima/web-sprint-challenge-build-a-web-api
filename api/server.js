const express = require('express');
const cors = require("cors")
const server = express();
const {logger} = require("./projects/projects-middleware")
const projectsRouter = require("./projects/projects-router")
const actionsRouter = require("./actions/actions-router")

server.use(express.json())
server.use(express.urlencoded({extended: true}))
server.use(cors())
server.use(logger);
server.use("/api/projects", projectsRouter)
server.use("/api/actions", actionsRouter)

server.use("*", (req, res) =>{
    res.status(404).json({
        message: "does not exist"
    })
})

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

module.exports = server;

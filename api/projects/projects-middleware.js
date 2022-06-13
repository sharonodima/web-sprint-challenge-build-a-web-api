// add middlewares here related to projects
const Project = require("../projects/projects-model")
function logger(req, res, next) {
    const timestamp = new Date().toLocaleString();
    const method = req.method;
    const url = req.originalUrl
    console.log(`[${timestamp}] ${method} to ${url}`)  
    next()
  }

  async function validateProjectId(req, res, next) {
    try{
      const project = await Project.getById(req.params.id)
      if(!project) {
        next({status: 404, message: "not found",})
      } else {
        req.project = project
        next()
      }
    } catch(err) {
      res.status(500).json({
        message: "project not found"
      })
    }
  }

  function validateProject(req, res, next) {
    const {name} = req.body
    if (!name || !name.trim()) {
      res.status(400).json({
        message: "missing required name field"
      })   
    } else {
      req.name = name.trim()
      next()
    }
  }

  

  module.exports = {
    logger,
    validateProjectId,
    validateProject,
  }
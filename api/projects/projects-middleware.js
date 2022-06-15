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
      const project = await Project.get(req.params.id)
      if(!project) {
        res.status(404).json({
          message: "project not found"
        })
      } else {
        req.project = project
        next()
      }
    } catch(err) {
      res.status(404).json({
        message: "project not found"
      })
    }
  }

  function validateProject(req, res, next) {
    const {name, description, completed} = req.body
    if ( !name?.trim()) {
      res.status(400).json({
        message: "missing required name field"
      })   
    } else if (!description?.trim()) {
      res.status(400).json({
        message: "missing required description field"
      })  
    } else if (completed === undefined) {
      res.status(400).json({
        message: "missing required completed field"
      })  
    }else {
      req.body.name = name.trim()
      req.body.description = description.trim()
      next()
    }
  }

  

  module.exports = {
    logger,
    validateProjectId,
    validateProject,
  }
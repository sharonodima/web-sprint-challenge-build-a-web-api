// add middlewares here related to actions
const Action = require("../actions/actions-model")
function logger(req, res, next) {
    const timestamp = new Date().toLocaleString();
    const method = req.method;
    const url = req.originalUrl
    console.log(`[${timestamp}] ${method} to ${url}`)  
    next()
  }

  async function validateActionId(req, res, next) {
    try{
      const action = await Action.get(req.params.id)
      if(!action) {
        res.status(404).json({
          message: "action not found"
        })
      } else {
        req.action = action
        next()
      }
    } catch(err) {
      res.status(404).json({
        message: "action not found"
      })
    }
  }

  function validateAction(req, res, next) {
    const {project_id, description, notes} = req.body
    if ( !project_id) {
      res.status(400).json({
        message: "missing required project id field"
      })   
    } else if (!description?.trim()) {
      res.status(400).json({
        message: "missing required description field"
      })  
    }else if (description.trim().length > 128) {
        res.status(400).json({
            message: "description field greater than 128 characters"
          })
    }else if (!notes?.trim()) {
        res.status(400).json({
            message: "missing required notes field"
        })  
    }else {
      req.body.description = description.trim()
      req.body.notes = notes.trim()
      next()
    }
  }

  

  module.exports = {
    logger,
    validateActionId,
    validateAction,
  }
// Write your "projects" router here!
const {
    validateProjectId,
    validateProject,
  } = require("../projects/projects-middleware")


const express = require("express");
const Project = require("./projects-model");
const router = express.Router();

router.get('/', (req, res, next) => {
    Project.get()
      .then(projects => {
        res.json(projects)
      })
      .catch(next)
  });

router.get('/:id', validateProjectId, (req, res) => {
    res.json(req.project)
  });

router.post("/api/projects", validateProject, (req, res, next) => {
    Project.insert({name: req.name})
    .then(newProject => {
      res.status(201).json(newProject)
    })
    .catch(next)
})

router.put('/api/projects/:id', validateProjectId, validateProject, (req, res, next) => {
    Project.update(req.params.id, {name: req.name})
      .then(() => {
        return Project.getById(req.params.id)
      })
      .then(project=> {
        res.json(project)
      })
      .catch(next)
  });

  router.delete('/api/projects/:id', validateProjectId, async (req, res) => {
    try{
      await Project.remove(req.params.id)
      res.json(req.project)
    } catch(err) {
      next(err)
    }
  });

  router.get('/api/projects/:id/actions', validateProjectId, async (req, res) => {
    try{
      const result = await Project.getUserActions(req.params.id)
      res.json(result)
    } catch (err) {
      next(err)
    }
  });

  


module.exports = router
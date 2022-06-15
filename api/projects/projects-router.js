// Write your "projects" router here!
const {
    validateProjectId,
    validateProject,
  } = require("./projects-middleware")


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


router.post("/", validateProject, (req, res, next) => {
    Project.insert(req.body)
    .then(newProject => {
      res.status(201).json(newProject)
    })
    .catch(next)
})

router.put('/:id', validateProjectId, validateProject, (req, res, next) => {
    Project.update(req.params.id, req.body)
      .then(() => {
        return Project.get(req.params.id)
      })
      .then(project=> {
        res.json(project)
      })
      .catch(next)
});

router.delete('/:id', validateProjectId, async (req, res) => {
try{
    await Project.remove(req.params.id)
    res.json(req.project)
} catch(err) {
    next(err)
}
});

router.get('/:id/actions', validateProjectId, async (req, res) => {
try{
    res.json(req.project.actions)
} catch (err) {
    next(err)
}
});

  


module.exports = router
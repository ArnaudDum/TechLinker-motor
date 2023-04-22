import Project from '../../models/Project.js'

export const createProject = (req, res, next) => {
  const project = new Project({ ...req.body, userId: req.auth.userId })
  project.save()
    .then(() => res.status(201).json({ message: 'Project saved' }))
    .catch((error) => res.status(400).json({ error }))
}

export const getAllProjects = (req, res, next) => {
  Project.find()
    .then((projects) => res.status(200).json(projects))
    .catch((error) => res.status(400).json({ error }))
}
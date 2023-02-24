const { Sample, Profile } = require('../models')

async function index(req, res) {
  try {
    if (req.user.authorized) {
      const samples = await Sample.findAll({include: ['Profile']})
      res.status(200).json(samples)
    } else {
      throw new error('not authorized')
    }
  } catch (error) {
    res.status(500).json(error)
  }
}

async function create(req, res) {
  try {
    req.body.profileId = req.user.profile.id
    const sample = await Sample.create(req.body)
    res.status(200).json(sample)
  } catch (error) {
    res.status(500).json({ err: error })
  }
}

async function show(req, res) {
  try {
    if (req.user.authorized) {
      const sample = await Sample.findByPk(req.params.id, {include: ['Profile']})
      res.status(200).json(sample)
    } else {
      throw new error('not authorized')
    }
  } catch (error) {
    res.status(500).json({ err: error })
  }
}

async function update(req, res) {
  try {
    if (req.user.authorized) {
      const sample = await Sample.findByPk(req.params.id, {include: ['Profile']})
      if (sample.profileId === req.user.profile.id || req.user.admin) {
        sample.set(req.body)
        sample.save()
        res.status(200).json(sample)
      } else {
        throw new Error('not authorized')
      }
    } else {
      throw new Error('not authorized')
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: error })
  }
}

async function deleteSample(req, res) {
  try {
    const sample = await Sample.findByPk(req.params.id)
    if (sample.profileId === req.user.profile.id || req.user.admin) {
      await sample.destroy()
      res.status(200).json(sample)
    } else {
      throw new Error('not authorized')
    }
  } catch (error) {
    res.status(500).json({ err: error })
  }
}

module.exports = {
  index,
  create,
  show,
  update, 
  delete: deleteSample,
}
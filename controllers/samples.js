const { Sample, Profile } = require('../models')

async function index(req, res) {
  try {
    const thisUser = await Profile.findByPk(req.user.profile.id)
    if (thisUser.authorized) {
      const samples = await Sample.findAll({include: ['Profile']})
      res.status(200).json(samples)
    } else {
      throw new error('not authorized')
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
}

async function create(req, res) {
  try {
    req.body.profileId = req.user.profile.id
    const sample = await Sample.create(req.body)
    res.status(200).json(sample)
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: error })
  }
}

async function show(req, res) {
  try {
    const thisUser = await Profile.findByPk(req.user.profile.id)
    if (thisUser.authorized) {
      const sample = await Sample.findByPk(req.params.id, {include: ['Profile']})
      res.status(200).json(sample)
    } else {
      throw new error('not authorized')
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: error })
  }
}

async function update(req, res) {
  try {
    const thisUser = await Profile.findByPk(req.user.profile.id)
    if (thisUser.authorized) {
      const sample = await Sample.findByPk(req.params.id)
      if (sample.profileId === req.user.profile.id) {
        sample.set(req.body)
        res.status(200).json(sample)
      } else {
        throw new Error('not authorized')
      }
    } else {
      throw new Error('not authorized')
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ err: error })
  }
}

async function deleteSample(req, res) {
  try {
    const sample = await Sample.findByPk(req.params.id)
    if (sample.profileId === req.user.profile.id) {
      await sample.destroy()
      res.status(200).json(sample)
    } else {
      throw new Error('not authorized')
    }
  } catch (error) {
    console.log(error);
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
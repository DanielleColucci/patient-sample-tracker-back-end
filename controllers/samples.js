const { Sample, Profile } = require('../models')

async function index(req, res) {
  try {
    const samples = await Sample.findAll(
      {
        include: [{ model: Profile, as: 'Profile'}]
      }
    )
    res.status(200).json(samples)
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

module.exports = {
  index,
  create,
}
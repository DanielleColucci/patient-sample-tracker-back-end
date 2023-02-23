const { Sample } = require('../models')

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
  create,
}
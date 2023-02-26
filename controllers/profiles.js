const { Profile, User } = require('../models')
const cloudinary = require('cloudinary').v2

async function index(req, res) {
  try {
    if (req.user.authorized) {
      const profiles = await Profile.findAll({include: [
        'samples', 
        {model: User, as: 'User'}
      ]})
      res.json(profiles)
    } else {
      throw new Error('not authorized')
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ err: error })
  }
}

async function show(req, res) {
  try {
    if (req.user.authorized) {
      const profile = await Profile.findByPk(req.params.id, {include: ['samples']})
      res.json(profile)
    } else {
      throw new Error('not authorized')
    }
  } catch (error) {
    res.status(500).json({ err: error })
  }
}

async function addPhoto(req, res) {
  try {
    const imageFile = req.files.photo.path
    const profile = await Profile.findByPk(req.params.id)
    const image = await cloudinary.uploader.upload(
      imageFile, 
      { tags: `${req.user.email}` }
    )
    profile.photo = image.url
    await profile.save()
    res.status(201).json(profile.photo)
  } catch (error) {
    console.log(error)
    res.status(500).json({ err: error })
  }
}

async function updateAuthorization(req, res) {
  try {
    if (req.user.admin) {
      const user = await User.findByPk(req.params.userId)
      user.authorized = !user.authorized
      await user.save()
      const updatedProfile = await Profile.findOne({
        where: {
          userId: user.id
        }, 
        include: [{model: User, as: 'User'}]
      })
      res.status(201).json(updatedProfile)
    } else {
      throw new Error('no admin status')
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ err: error })
  }
}

async function updateAdmin(req, res) {
  try {
    if (req.user.admin) {
      const user = await User.findByPk(req.params.userId)
      user.admin = !user.admin
      await user.save()
      res.status(201).json(user)
    } else {
      throw new Error('no admin status')
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ err: error })
  }
}

module.exports = { index, addPhoto, updateAdmin, updateAuthorization, show }

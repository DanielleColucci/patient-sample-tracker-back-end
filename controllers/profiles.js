const { Profile } = require('../models')
const cloudinary = require('cloudinary').v2

async function index(req, res) {
  try {
    const profiles = await Profile.findAll()
    res.json(profiles)
  } catch (error) {
    console.log(error)
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
    const thisUser = await Profile.findByPk(req.user.profile.id)
    if (thisUser.admin) {
      const profile = await Profile.findByPk(req.params.id)
      profile.authorized = !profile.authorized
      await profile.save()
      res.status(201).json(profile)
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
    const thisUser = await Profile.findByPk(req.user.profile.id)
    if (thisUser.admin) {
      const profile = await Profile.findByPk(req.params.id)
      if (profile.authorized) {
        profile.admin = !profile.admin
        await profile.save()
        res.status(201).json(profile)
      } else {
        throw new Error('this user is not authorized')
      }
    } else {
      throw new Error('no admin status')
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ err: error })
  }
}

module.exports = { index, addPhoto, updateAdmin, updateAuthorization }

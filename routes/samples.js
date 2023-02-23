const router = require('express').Router()
const samplesCtrl = require('../controllers/samples.js')
const middleware = require('../middleware/auth.js')

const { decodeUserFromToken, checkAuth } = middleware

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', checkAuth, samplesCtrl.index)
router.post('/', checkAuth, samplesCtrl.create)

module.exports = router
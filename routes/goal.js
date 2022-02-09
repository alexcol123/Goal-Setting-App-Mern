const express = require('express')
const router = express.Router()

const { getAllGoalsStatic, getAllGoals } = require('../controllers/goal')

router.route('/static').get(getAllGoalsStatic)
router.route('/').get(getAllGoals)

module.exports = router

const { query } = require('express')
const Goal = require('../models/goal')

exports.getAllGoalsStatic = async (req, res) => {
  const goals = await Goal.find({})

  res.status(200).json({ goals, amount: goals.length })
}

///  real project routes ------------------------------>>>>>>>>>>>>>>>>>>>>>>
///  --------------------------------------------------------------------->>>>>>>>>>>>>>>>>>>>>>

exports.getAllGoals = async (req, res) => {
  const { completed, goalType, fields, sort, name, numericFilters } = req.query

  const queryObject = {}

  if (completed) queryObject.completed = completed === 'true' ? true : false
  if (goalType) queryObject.goalType = goalType
  if (name) {
    queryObject.name = { $regex: name, $options: 'i' }
  }

  if (numericFilters) {
    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte',
    }

    const regex = /\b(<|>|>=|=|<|<=)\b/g
    let filters = numericFilters.replace(
      regex,
      (match) => `-${operatorMap[match]}-`
    )
    const options = ['deadlineInDays', 'percentageCompleted']

    filters = filters.split(',').forEach((item) => {
      const [field, operator, value] = item.split('-')
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) }
      }
    })
  }
  console.log(queryObject)

  //  In order to sort we remove the await  form the firs request
  let results = Goal.find(queryObject)

  if (sort) {
    const sortList = sort.split(',').join(' ')
    results = results.sort(sortList)
  } else {
    result = results.sort('createdAt')
  }

  if (fields) {
    const fieldList = fields.split(',').join(' ')
    results = results.select(fieldList)
  }

  // Pagination
  // Command is : skip and Limit
  //const page = Number(req.query.page)

  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 30

  const skip = (page - 1) * limit

  result = result.skip(skip).limit(limit)

  console.log(result)

  const goals = await results
  res.status(200).json({ nbHits: goals.length, goals })
}

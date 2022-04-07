const {Task} = require('../models')
const {Habit} = require('../models')

module.exports = {
  async addHabit (req, res) {
    try {
      const habit = await Habit.create(req.body)
      console.log (req.body)
      res.send(habit.toJSON())
    } catch (err) {
      res.status(400).send({
        error: `A new habit could not be created.`,
        err: err
      })
    }
  },
  async getHabitsByMonth (req, res) {
    console.log (req.body.date)
    try {
      const habits = await Habit.findAll({
        where: {
          month: req.body.month
        }
      })
      console.log (habits)
      res.send(JSON.stringify(habits, null, 2))
    } catch (err) {
      res.status(400).send({
        error: `Habits could not be retrieved.`,
        err: err
      })
    }
  },
  async addTask (req, res) {
    try {
      const task = await Task.create(req.body)
      console.log (req.body)
      res.send(task.toJSON())
    } catch (err) {
      res.status(400).send({
        error: `A new task could not be created.`,
        err: err
      })
    }
  },
  async getAllTasks (req, res) {
    try {
      const tasks = await Task.findAll()
      console.log (tasks)
      res.send(JSON.stringify(tasks, null, 2))
    } catch (err) {
      res.status(400).send({
        error: `Tasks could not be retrieved.`,
        err: err
      })
    }
  },
  async getTasksByDate (req, res) {
    console.log (req.body.date)
    try {
      const tasks = await Task.findAll({
        where: {
          date: req.body.date
        }
      })
      console.log (tasks)
      res.send(JSON.stringify(tasks, null, 2))
    } catch (err) {
      res.status(400).send({
        error: `Tasks could not be retrieved.`,
        err: err
      })
    }
  }
}

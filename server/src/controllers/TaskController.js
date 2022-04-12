const {Task} = require('../models')
const {Habit} = require('../models')

module.exports = {
  async addHabit (req, res) {
    try {
      const habit = await Habit.create(req.body)
      const daysInMonth = new Date(parseInt(req.body.month.slice(0,4)), parseInt(req.body.month.slice(5,7)), 0).getDate()
      for (let i = 1; i <= daysInMonth; i++) {
        await Task.create({
          "habit_id": habit.dataValues.id, 
          "date": req.body.month + "-" + (i < 10 ? "0" : "") + i,
          "message": "",
          "score": ""
        })
      }
      res.send(habit.toJSON())
    } catch (err) {
      res.status(400).send({
        error: `A new habit could not be created.`,
        err: err
      })
    }
  },
  async deleteHabit (req, res) {
    try {
      const habit = await Habit.destroy({
        where: {
          id: req.body.habit_id
        }
      })
      const task = await Task.destroy({
        where: {
          habit_id: req.body.habit_id
        }
      })
      res.send({habit, task})
    } catch (err) {
      res.status(400).send({
        error: `The habit could not be deleted.`,
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
      for (const habit in habits) {
        console.log(habits[habit])
        habits[habit].dataValues.tasks = await Task.findAll({
          where: {
            habit_id: habits[habit].id
          }
        })
      }
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
  async updateTask (req, res) {
    try {
      const task = await Task.update(
        req.body, {
        where: {
          id: req.body.id
        }
      })
      console.log (req.body)
      res.send({task})
    } catch (err) {
      res.status(400).send({
        error: `The task could not be updated.`,
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

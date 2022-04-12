const AuthenticationController = require('./controllers/AuthenticationController')
const TaskController = require('./controllers/TaskController')

const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')

module.exports = (app) => {
  app.post('/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)

  app.post('/addhabit',
    TaskController.addHabit
  )

  app.post('/deletehabit',
    TaskController.deleteHabit
  )

  app.post('/gethabitsbymonth',
    TaskController.getHabitsByMonth
  )

  app.post('/addtask',
    TaskController.addTask
  )

  app.post('/updatetask',
    TaskController.updateTask
  )

  app.get('/getalltasks',
    TaskController.getAllTasks
  )

  app.post('/gettasksbydate',
    TaskController.getTasksByDate
  )
}

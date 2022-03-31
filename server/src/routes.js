const AuthenticationController = require('./controllers/AuthenticationController')
const TaskController = require('./controllers/TaskController')

const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')

module.exports = (app) => {
  app.post('/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)

  app.post('/addtask',
    TaskController.addTask
  )

  app.get('/getalltasks',
    TaskController.getAllTasks
  )

  app.post('/gettasksbydate',
    TaskController.getTasksByDate
  )
}

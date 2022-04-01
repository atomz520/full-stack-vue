import Api from '@/services/Api'

export default {
  addTask (task) {
    return Api().post('addtask', task)
  },
  getTasksByDate (date) {
    return Api().post('gettasksbydate', date)
  }
}

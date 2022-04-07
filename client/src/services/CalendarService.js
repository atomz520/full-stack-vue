import Api from '@/services/Api'

export default {
  addHabit (habit) {
    return Api().post('addHabit', habit)
  },
  getHabitsByMonth (month) {
    return Api().post('gethabitsbymonth', month)
  },
  addTask (task) {
    return Api().post('addtask', task)
  },
  getTasksByDate (date) {
    return Api().post('gettasksbydate', date)
  }
}

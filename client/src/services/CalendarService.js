import Api from '@/services/Api'

export default {
  getTasksByDate (date) {
    return Api().post('gettasksbydate', date)
  }
}

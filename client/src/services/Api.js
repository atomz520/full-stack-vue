import axios from 'axios'

export default() => {
  return axios.create({
    baseURL: `http://locahost:8081/`
  })
}
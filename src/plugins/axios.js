import axios from 'axios'

const axiosSettings = axios.create({
  baseURL: 'https://reqres.in/api/',
})

export default axiosSettings

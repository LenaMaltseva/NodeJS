import axios from 'axios'
import cookies from "@/services/cookies"

export default () => {
   return axios.create({
      baseURL: 'http://localhost:8000',
      headers: {'Authorization': `bearer ${cookies.getValue('token')}`}
    })
}
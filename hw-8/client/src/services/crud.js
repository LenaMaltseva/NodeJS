import API from '@/services/api'

export default {

//Users
   signUp (params) {
      return API().post('auth/sign_up', params)
   },
   signIn (params) {
      return API().post('auth/sign_in', params)
   },
   findUser(id) {
      return API().get('auth/' + id)
   },
   
//Tasks
   fetchTasks () {
      return API().get('tasks')
   }
}


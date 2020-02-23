import API from '@/services/api'

export default {

//Users
   signUp (params) {
      return API().post('auth/sign_up', params)
   },
   signIn (params) {
      return API().post('auth/sign_in', params)
   },
   
//Tasks
   fetchTasks () {
      return API().get('tasks')
   },
   addTask (params) {
      return API().post('tasks', params)
   },
   updateTask (params) {
      return API().patch('tasks/' + params.id, params)
   },
   deleteTask (id) {
      return API().delete('tasks/' + id)
   }
}


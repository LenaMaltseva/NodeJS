import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router ({
   mode: 'history',
   routes: [
      {
         path: '/auth',
         name: 'Authorization',
         component: () => import('./views/Auth.vue')
      },
      {
         path: '/tasks',
         name: "Tasks",
         component: () => import('./views/Tasks.vue')
      },
   ]
})
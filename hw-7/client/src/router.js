import Vue from 'vue'
import Router from 'vue-router'
import cookies from "@/services/cookies"

Vue.use(Router)

const router = new Router ({
   mode: 'history',
   routes: [
      {
         path: '/',
         name: 'Home',
         redirect: '/auth'
      },
      {
         path: '/auth',
         name: 'Auth',
         component: () => import('./views/Auth.vue')
      },
      {
         path: '/tasks',
         name: "Tasks",
         meta: { auth: true },
         component: () => import('./views/Tasks.vue')
      },
   ]
})

router.beforeEach((to, from, next) => {
   const token = cookies.getValue('token')
   const requireAuth = to.matched.some(record => record.meta.auth)

   if( requireAuth && !token ) {
      next('/auth')
   }  else next()
})

export default router
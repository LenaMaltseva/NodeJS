<template>
  <main class="login__container">
      <div class="login__block">
        <img src="@/assets/logo-mono.png" alt="Agenda" class="logo_mono">
        <h1>{{ signIn ? 'Sign in to Agenda' : 'Create your account' }}</h1>
        <div class="login__error">
            {{errorMessage}}
        </div>
        <template v-if='signIn'>
            <SignIn
               v-on:sign-in="toLogin" />
            <p class="login__text">New to Agenda? <span @click="[signIn = !signIn]" class="login__link">Create an account.</span></p>
        </template>
        <template v-else>
            <SignUp
               v-on:sign-up="addNewUser"/>
            <span @click="[signIn = !signIn]" class="login__text login__link">I already have an account.</span>
        </template>
      </div>
   </main>
</template>

<script>
import SignIn from '@/components/SignIn'
import SignUp from '@/components/SignUp'
import CRUD from '@/services/crud'
import cookies from '@/services/cookies'

export default {
   props: ['user'],
   components: {
      SignIn, SignUp
   },
   data () {
      return {
         signIn: true,
         errorMessage: ''
      }
   },
   methods: {
      async toLogin(user) {
         const authUser = await CRUD.signIn(user)
         if (authUser.data.message) {
            return this.errorMessage = authUser.data.message
         }
         if (authUser.data.token) {
            let cookieAge = ''
            if (user.remember_me) {
               cookieAge = 3600 * 24 * 365 * 1000    // one year
            }
            for (let key in authUser.data) {
               cookies.set(key, authUser.data[key], {path: '/', 'max-аge': +cookieAge})
            }
            this.errorMessage = ''
            this.$router.push({ name: 'Tasks' })
         }
      },
      async addNewUser(newUser) {
         const savedUser = await CRUD.signUp(newUser)
         if (savedUser.data.message) {
            this.errorMessage = savedUser.data.message
         }
         if (savedUser.data.token) {
            for (let key in savedUser.data) {
                cookies.set(key, savedUser.data[key], {path: '/'})
            }
            this.errorMessage = ''
            this.signIn = !this.signIn
            this.$router.push({ name: 'Home' })
         }
      }
   }
}
</script>



<style>
   .login__container {
      width: 80%;
      height: 100vh;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
   }
   .login__block {
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      justify-content: space-between;
      align-content: center;
      background-color: #F7931E;
      border-radius: 30px;
      box-shadow: 0 3px 10px #F7931E;
      min-width: 400px;
      padding: 30px 40px 40px;
   }
   .logo_mono {
      width: 250px;
      margin-bottom: 30px;
   }
   h1 {
      font-size: 20px;
      text-align: center;
      color: #fff;
      margin-bottom: 5px;
   }
   .login__sign-in {
      display: block;
      width: 250px;
   }
   .login__error {
      padding: 0px 0px 7px;
      text-align: center;
      height: 20px;
      font-size: 14px;
      color: #000;
      margin-bottom: 5px;
   }
   .login__input {
      display: block;
      width: 100%;
      padding: 15px 20px;
      border-radius: 30px;
      border: none;
      margin-bottom: 10px;
      font-size: 14px;
   }
   .login__input::placeholder {
      color: #aaa;
   }
   .login__input:focus {
      color: #000;
      box-shadow: 0 0 9px 1px #fff;
      outline: none;
   }
   .login__input:focus::placeholder {
      color: #F7931E;
   }
   .login__remember {
      display: flex;
      align-items: center;
   }
   .login__checkbox {
      margin-left: 20px;
   }
   .login__label {
      margin-left: 10px;
      font-size: 14px;
      cursor: pointer;
   }
   .login__button {
      width: 100%;
      margin: 20px 0;
      padding: 15px;
      border-radius: 30px;
      border: none;
      background-color: #000;
      box-shadow: 0 3px 6px 1px #000;
      color: #fff;
      text-transform: uppercase;
      font-size: 14px;
      font-weight: bold;
      cursor: pointer;
   }
   .login__button:hover {
      color: #F7931E;
      background-color: #fff;
      box-shadow: none;
   }
   .login__text {
      text-align: center;
      font-size: 14px;
      color: #fff;
   }
   .login__link {
      color: #000;
      text-decoration: underline;
      cursor: pointer;
   }
</style>
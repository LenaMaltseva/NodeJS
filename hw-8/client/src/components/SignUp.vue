<template>
   <form @submit.prevent="$emit('sign-up', newUser)" class="login__sign-up">
      <input type="text" name="username" id="username" placeholder="Username *" class="login__input" v-model="newUser.username" required>
      <input type="email" name="mail" id="mail" placeholder="E-mail *" class="login__input" v-model="newUser.mail" required>
      <input type="password" name="password" id="password" placeholder="Password *" class="login__input" v-model="newUser.password" required>
      <input type="text" name="firstName" id="firstName" placeholder="First name" class="login__input" v-model="newUser.firstName">
      <input type="text" name="lastName" id="lastName" placeholder="Last name" class="login__input" v-model="newUser.lastName">
      <span class="login__text">* Required fields</span>
      <button type="submit" class="login__button">Submit</button>
   </form>
</template>

<script>
export default {
   data () {
      return {
         newUser: {
            username: '',
            firstName: '',
            lastName: '',
            mail: '',
            password: '',
         }
      }
   },
}
</script>

<style scoped>
   .login__text {
      margin-left: 20px;
   }
</style>
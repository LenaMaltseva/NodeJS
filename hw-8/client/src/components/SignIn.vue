<template>
   <form @submit.prevent="$emit('sign-in', authUser)" class="login__sign-in">
      <input type="text" name="username" id="username" placeholder="Username" class="login__input" v-model="authUser.username">
      <input type="password" name="password" id="password" placeholder="Password" class="login__input" v-model="authUser.password">
      <div class="login__remember">
         <input type="checkbox" name="remember_me" id="remember_me" value='true' class="login__checkbox" v-model="authUser.remember_me">
         <label for="remember_me" class="login__label">Remember me</label>
      </div>
      <button type="submit" class="login__button">Submit</button>
   </form>
</template>

<script>
export default {
   data() {
      return {
         authUser: {
            username: '',
            password: '',
            remember_me: false
         }
      }
   }
}
</script>
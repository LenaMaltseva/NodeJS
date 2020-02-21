<template>
  <div id="app">
    <router-view :user="user" ></router-view>
  </div>
</template>

<script>
import Auth from '@/views/Auth'
import Tasks from '@/views/Tasks'
import router from '@/router'
import cookies from '@/services/cookies'

export default {
  name: 'App',
  data() {
    return {
      user: {
        username: cookies.getValue('username'),
        _id: cookies.getValue('_id'),
        token: cookies.getValue('token')
      },
    }
  },
  components: {
    Auth, Tasks
  }
}
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Roboto:300,400,700&display=swap&subset=cyrillic);

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
}
</style>

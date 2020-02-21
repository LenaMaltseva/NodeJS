<template>
  <div id="app">
    <!-- <router-view></router-view> -->
    <Auth v-if="!user.token" :user="user" />
    <Tasks v-else v-bind:user="user"/>
  </div>
</template>

<script>
import Auth from '@/views/Auth'
import Tasks from '@/views/Tasks'

export default {
  name: 'App',
  data() {
    return {
      user: {
        username: '',
        _id: '',
        token: ''
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

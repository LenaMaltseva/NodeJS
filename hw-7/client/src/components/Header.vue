<template>
   <header class="header">
      <img src="@/assets/logo-color.png" alt="Agenda" class="logo_color">
      <div class="user">
         <a href='#' class="user__name">{{user.username}}</a>
         <a @click="$emit('logout')" class="logout__link"><img src="@/assets/icon-logout.svg" alt="Log out" class="logout__icon"></a>
      </div>
   </header>
</template>

<script>
export default {
   props: ['user'],
}
</script>
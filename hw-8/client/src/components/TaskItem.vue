<template>
  <div class="task__item" :class="[ task.completed ? 'task__item_done' : '']">
      <p class="task__title">{{task.taskBody}}</p>
      <span class="task__priority">{{task.priority}}</span>
      <span class="task__date"> {{task.deadline | localDate}} </span> 
      <span class="task__author"> {{authorName}} </span>
      <div class="task__actions">
         <div class="task__complete" >
            <span v-show="task.completed">DONE</span>
         </div>
         <button @click="$emit('complete-task', task)" class="task__button" :disabled="task.completed"><img src="@/assets/icon_done.svg" alt="Mark as done" class="task__button_icon" v-show="!task.completed"></button>
         <button @click="$emit('delete-task', task._id)" class="task__button"><img src="@/assets/icon_delete.svg" alt="Delete task" class="task__button_icon"></button>
      </div>
   </div>
</template>

<script>
import CRUD from '@/services/crud'

export default {
   props: {
      task: {
         type: Object,
         required: true
      }
   },
   data() {
      return {
         authorName: ''
      }
   },
   mounted() {
      this.getUserName(this.task.author)
   },
   methods: {
      async getUserName(id) {
         let user = await CRUD.findUser(id)
         this.authorName = user.data.username
      },
   }, 
   filters: {
      localDate(value) {
         return value.split('T', 9)[0].split('-').reverse().join('.')
      }
   }
}
</script>
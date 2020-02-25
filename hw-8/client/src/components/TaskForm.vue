<template>
   <form @submit.prevent="$emit('add-task', newTask)" class="task__form">
      <input type="text" name="taskBody" id="taskBody" class="task_input task__body" placeholder="What should we do?" v-model="newTask.taskBody">
      <select size="1" name="priority" class="task_input" v-model="newTask.priority">
         <option disabled>Priority:</option>
         <template v-for="(option, index) of priorityOptions" >
            <option :value="option" :key="index">{{option}}</option>
         </template>
      </select>
      <input type="date" name="deadline" id="deadline" class="task_input task__deadline" :min="setToday" v-model="newTask.deadline" required>
      <input type="hidden" name="author" id="author" v-model="newTask.author">
      <button type="submit" class="task__button_add" @click="clearForm">Add new task</button>
   </form>
</template>

<script>
export default {
   props: ['user'],
   data() {
      return {
         priorityOptions: ['Low', 'Normal', 'High', 'First'],
         newTask: {
            taskBody: '',
            priority: 'Normal',
            deadline: new Date().toISOString().slice(0,10),
            author: this.user._id
         }
      }
   },
   computed: {
      setToday () {
         return new Date().toISOString().slice(0,10)
      }
   },
   methods: {
      clearForm() {
         setTimeout(() => {
            this.newTask.taskBody = ''
            this.newTask.priority = 'Normal'
            this.newTask.deadline = new Date().toISOString().slice(0,10)
         }, 0)
      }
   }
}
</script>
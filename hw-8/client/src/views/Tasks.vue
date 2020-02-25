<template>
   <div class="tasks__container">
      <Header 
         v-bind:user="user"
         v-on:logout="logout" />
      <main>
         <TaskForm 
            v-bind:user="user"
            v-on:add-task="addTask" />
         <div class="task__block">
            <TaskItem 
               v-for="(task, index) of tasks"
               v-bind:key="index" 
               v-bind:task="task"
               v-on:complete-task="completeTask"
               v-on:delete-task="removeTask" />
         </div>
      </main>
   </div>
</template>

<script>
import Header from '@/components/Header'
import TaskForm from '@/components/TaskForm'
import TaskItem from '@/components/TaskItem'
import CRUD from '@/services/crud'
import cookies from '@/services/cookies'

export default {
   props: ['user'],
   components: {
      Header, TaskForm, TaskItem
   },
   data() {
      return {
         tasks: [],
      }
   },
   mounted() {
      this.getTasks()
   },
   sockets: {
      updTaskList () {
         this.getTasks()
      }
   },
   methods: {
      async getTasks() {
         const tasks = await CRUD.fetchTasks()
         this.tasks = tasks.data
      },
      addTask (newTask) {
         if (newTask.taskBody) {
            this.$socket.emit('addTask', newTask)
         } else alert('Empty task!')
      },
      completeTask (task) {
         this.$socket.emit('completeTask', {
            id: task._id,
            completed: !task.completed,
         })
      },
      removeTask (taskId) {
         this.$socket.emit('removeTask', taskId)
      },
      logout() {
         cookies.set('token', "", {'max-age': -1 })
         this.$router.push({ name: 'Home' })
      }
   }
}
</script>

<style>
   .tasks__container {
   width: 80%;
   margin: 0 auto;
   position: relative;
   }
   .header {
      position: fixed;
      top: calc(100vh - 60px);
      width: 80%;
      display: flex;
      justify-content: space-between;
      align-content: center;
      padding: 6px 30px 12px 10px;
      background-color: #F7931E;
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
      box-shadow: 0 3px 10px 1px #F7931E;
   }
   .logo_color {
      width: 100px;
   }
   .user {
      display: flex;
      align-items: center;
   }
   .user__name {
      color: #000;
      text-decoration: none;
   }
   .user__name:hover {
      text-decoration: underline;
   }
   .logout__link {
      cursor: pointer;
   }
   .logout__icon {
      width: 18px;
      margin-top: 3px;
      margin-left: 15px;
   }
   .task__form {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      margin: 40px 0;
   }
   .task_input {
      height: 48px;
      border: none;
      background-color: #fff;
      border-bottom: 2px solid #ddd;
      padding: 15px 10px;
      font-size: 14px;
      color: #aaa;
   }
   .task_input::placeholder {
      color: #aaa;
   }
   select:focus, input:focus {
      color: #000;
      outline: none;
   }
   .task__body {
      flex-basis: 55%;
   }
   select {
      width: 100px;
   }
   .task__deadline {
      width: 160px;
   }
   .task__button_add {
      flex-basis: 15%;
      padding: 12px 15px;
      border-radius: 30px;
      border: none;
      background-color: #F7931E;
      box-shadow: 0 2px 5px 1px #F7931E;
      color: #fff;
      text-transform: uppercase;
      font-size: 14px;
      font-weight: bold;
      cursor: pointer;
   }
   .task__button_add:hover {
      color: #000;
   }
   .task__item {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      margin: 15px 0;
      padding: 15px 10px 15px 20px;
      border-radius: 20px;
      box-shadow: 0 0 5px 1px #ddd;
      font-size: 12px;
   }
   .task__item_done {
      background-color: #eee;
      color: #aaa;
   }
   .task__title {
      flex-basis: 55%;
      font-size: 14px;
   }
   .task__priority {
      width: 60px;
   }
   .task__date {
      width: 100px;
   }
   .task__author {
      width: 60px;
   }
   .task__actions {
      width: 150px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      align-items: center;
   }
   .task__complete {
      width: 50px;
      color: #aaa;
   }
   .task__button {
      height: 40px;
      border: 2px solid rgba(255, 255, 255, 0);
      background: none;
      transition-duration: 0.2s;
      cursor: pointer;
   }
   .task__button:hover {
      border-bottom: 2px solid #F7931E;
   }
   .task__button_icon {
      width: 20px;
   }
   .task__button:hover > .task__button_icon {
      transform: scale(1.2);
   }
</style>
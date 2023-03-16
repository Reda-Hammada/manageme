<script>
import axios from "axios";
import AppTaskComponent from "./AppTaskComponent.vue";
import AppTaskForm from "./AppTaskForm.vue";

export default {
  name: "AppBoard",
  inject: ["eventBus"],
  components:{
    AppTaskComponent,
    AppTaskForm,
  },
  data() {
    return {
      isLoading: false,
      isAddTask:false,
      fetchedBoard:[],
    };
  },
  created() {
    this.eventBus.on("trigger-board", async (boardId) => {
      await axios
        .get(
          `http://127.0.0.1:8000/api/boards/${boardId}/phases/tasks/subtasks/`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.user_token,
              "Content-Type": "application/json",
            },
          }
        )
        .then(async (res) => {
          if (res.status === 200) {
            this.fetchedBoard = res.data.boards;
            this.eventBus.emit('pass-board-name',this.fetchedBoard.board_name);

          }
        });
    });
  },
  methods: {
    toggleAddTaskForm(){
        this.isAddTask = !this.isAddTask;
    },
    closeTaskFormByEmit(){
        this.isAddTask = false;
    }
  },
};
</script>

<template>
  <div v-if="fetchedBoard.length === 0">
    no phase yet
  </div>
  <div v-else>
    <section class="ml-12 mt-3">
      <!--Phases-->
       <div  class="w-[20%] text-start font-bold"
             v-for='(phase,index) in fetchedBoard.phase'
            :key='index'>

          <!--Phase tasks container-->
          <div class="w-[100%] pt-6 pb-3  bg-white">
            <!--Phase-->
            <div class="flex w-[100%] justify-between">
              <div class="mb-5 pl-5">{{phase.phase}} ({{phase.tasks.length}})</div>
              <div class="text-xl mr-4 pb-3"> 
                ...
              </div>
            </div>
          <!--Tasks-->
              <div v-for='(task,index) in phase.tasks'
                  :key='index'>
                  <div >
                    <app-task-component :Task="task.task_name"
                   >
  
                    </app-task-component>
                    

                  </div>
                 
              </div>
              <div 
                  class="text-main-color pl-5 cursor-pointer"
                   @click="toggleAddTaskForm()">
                + Add a task
              </div>
           
              
        </div>

       </div>
       <div>
          <app-task-form :isAddTask="isAddTask"
          @close-taskform = 'closeTaskFormByEmiti '>

          </app-task-form>
       </div>
    </section>
  </div>
</template>

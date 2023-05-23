<script>
import axios from "axios";
import AppTaskComponent from "./AppTaskComponent.vue";
import AppTaskForm from "./AppTaskForm.vue";
import { integer } from "@vee-validate/rules";

export default {
  name: "AppPhase",
  props: {
    fetchedBoard: {
      type: Array,
      required: true,
    },
    boardId: {
      type: integer,
      required: true,
    },
  },
  components: {
    AppTaskComponent,
    AppTaskForm,
  },
  data() {
    return {
      taskComponentKey: 0,
      isAddPhase: false,
      isAddTask: false,
      taskFormComponentId: null,
      isTaskDetails: false,
      isPhaseSetting: false,
    };
  },
  methods: {
    toggleAddTaskForm() {
      this.isAddTask = !this.isAddTask;
    },
    closeTaskFormByEmit() {
      this.isAddTask = false;
    },
    toggleAddPhase() {
      this.isAddPhase = !this.isAddPhase;
    },
    incrementPhaseCompKeyByEmit() {
      this.$emit("incrementPhaseKey");
    },
    togglePhaseSettings() {
      this.isPhaseSetting = !this.isPhaseSetting;
    },
    rerenderTaskComponent(){
      this.taskComponentKey++;
      this.incrementPhaseCompKeyByEmit();
    },
    // create phase
    async createPhase(values) {
      try {
        await axios
          .post(`http://127.0.0.1:8000/api/phase/${this.boardId}/`, values, {
            headers: {
              Authorization: "Bearer " + localStorage.user_token,
              "Content-Type": "application/json",
            },
          })
          .then(async (response) => {
            if (response.status === 201) {
              this.isAddPhase = false;
              this.incrementPhaseCompKeyByEmit();
            }
          });
      } catch (err) {
        alert("An Errror occurred try again");
      }
    },
  },
};
</script>
<template>
  <!--Phases-->
  <div
    class="w-64 ml-12 rounded-lg w-[100%] text-start font-bold"
    v-for="(phase, index) in fetchedBoard.phase"
    :key="index"
  >
    <!--Phase tasks container-->
    <div
      class="h-[90vh] w-[290px] rounded-lg overflow-y-auto overflow-x-hidden"
    >
      <div class="w-[100%] pt-6 bg-white mb-3 pb-3">
        <!--Phase-->
        <div class="flex justify-between">
          <div class="mb-5 pl-5">
            {{ phase.phase }} ({{ phase.tasks.length }})
          </div>
          <div class="text-xl mr-4 pb-3" @click="togglePhaseSettings">...</div>
          <div
            v-if="isPhaseSetting === true"
            class="absolute flex flex-col items-between"
          >
            <button class="bg-gray-400 text-white w-[90px] rounded">
              edit
            </button>
            <button class="bg-red-600 text-white w-[90px] rounded">
              delete
            </button>
          </div>
        </div>
        <!--Tasks-->
        <div v-for="(task, index) in phase.tasks" :key="index">
          <app-task-form
            :isAddTask="isAddTask"
            :phaseId="phase.id"
            :taskFormComponentId="phase.id"
            @close-taskform="closeTaskFormByEmit"
          >
          </app-task-form>
          <div>
            <app-task-component  :key='taskComponentKey'
                                 @emit-parentPhase = 'rerenderTaskComponent()'
                                 :Task="task.task_name"
                                 :idTask="task.id"> 
              </app-task-component>
          </div>
        </div>

        <div
          class="text-main-color pl-5 cursor-pointer"
          @click="toggleAddTaskForm()"
        >
          + Add a task
        </div>
      </div>
    </div>
  </div>
  <div class="w-full pr-[20%]">
    <div
      @click="toggleAddPhase()"
      v-if="isAddPhase === false && fetchedBoard.length !== 0"
      class="bg-white w-[230px] h-[50px] cursor-pointer ml-[24%] mt-2 rounded-lg text-center pt-3 pb-2"
    >
      + Add a new phase
    </div>
    <div
      v-else-if="isAddPhase === true"
      class="bg-white rounded-lg w-[250px] ml-[25%] h-[150px]"
    >
      <div class="w-full pb-5 pr-2">
        <span
          class="font-bold float-right cursor-pointer"
          @click="toggleAddPhase()"
          >x</span
        >
      </div>
      <div>
        <vee-form :validation-schema="phaseSchema" @submit="createPhase">
          <vee-field v-slot="{ field, errors }" name="phase">
            <input
              type="text"
              name="phase"
              placeholder="e.g to do"
              class="w-[90%] border pl-3 mt-3 border-bg-bg-color border-4 rounded ml-2 h-[35px]"
              v-bind="field"
            />
            <div
              class="text-red-500 ml-3 mt-2 font-bold"
              v-for="(error, key) in errors"
              :key="key"
            >
              {{ error }}
            </div>
          </vee-field>
          <input
            class="bg-main-color cursor-pointer text-white rounded w-[100px] h-[30px] mb-2 mt-3 ml-4"
            type="submit"
            value="Add phase"
          />
        </vee-form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import AppTaskComponent from "./AppTaskComponent.vue";
import AppTaskForm from "./AppTaskForm.vue";

export default {
  name: "AppBoard",
  inject: ["eventBus"],
  components: {
    AppTaskComponent,
    AppTaskForm,
  },
  data() {
    return {
      phaseSchema: {
        phase: "required",
      },
      boardComponentKey: 0,
      taskComponentKey: 0,
      isLoading: false,
      isAddTask: false,
      boardId: null,
      fetchedBoard: [],
      isAddPhase: false,
      isTaskDetails: false,
    };
  },
  // when component mounted fetch the board
  mounted() {
    this.eventBus.on("trigger-board", async (boardId) => {
      this.boardId = boardId;
      this.fetchBoard();
    });
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
    // fetch board
    async fetchBoard() {
      try {
        this.isLoading = true;
        await axios
          .get(
            `http://127.0.0.1:8000/api/boards/${this.boardId}/phases/tasks/subtasks/`,
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
              this.eventBus.emit(
                "pass-board-name",
                this.fetchedBoard.board_name
              );
              if (this.fetchedBoard !== null) {
                this.isLoading = false;
              }
            }
          });
      } catch (err) {
        alert("An Errror occurred try again");
      }
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
              this.boardComponentKey++;
            }
          });
      } catch (err) {
        alert("An Errror occurred try again");
      }
    },
    incrementTaskComponentKeyByEmit() {
      this.taskComponentKey++;
      alert(this.taskComponentKey);
    },
  },
};
</script>

<template>
  <div :key="taskComponentKey">
    <div v-if="isLoading === true">
      <div class="w-[100%] text-center mt-[15%] pl-auto pr-auto">
        <div class="mr-auto ml-auto w-[10%]">
          <img src="src\assets\images\isLoading.svg" alt="loalding animation" />
        </div>
      </div>
    </div>
    <div v-else-if="isLoading === false">
      <section class="mt-3 mr-6 w-full flex">
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
                <div class="text-xl mr-4 pb-3">...</div>
              </div>
              <!--Tasks-->
              <div v-for="(task, index) in phase.tasks" :key="index">
                <div>
                  <app-task-component
                    :Task="task.task_name"
                    :key="taskComponentKey"
                  >
                  </app-task-component>
                </div>
              </div>
              <app-task-form
                :isAddTask="isAddTask"
                @setAddFalse="closeTaskFormByEmit"
                :phaseId="phase.id"
                @close-taskform="closeTaskFormByEmit"
                @incrementTaskComponentKey="incrementTaskComponentKeyByEmit"
              >
              </app-task-form>
              <div
                class="text-main-color pl-5 cursor-pointer"
                @click="toggleAddTaskForm()"
              >
                + Add a task
              </div>
            </div>
          </div>
        </div>
        <div>
          <div
            @click="toggleAddPhase()"
            v-if="isAddPhase === false && fetchedBoard.length !== 0"
            class="bg-white w-[230px] h-[50px] cursor-pointer ml-12 mt-2 rounded-lg text-center pt-3 pb-2"
          >
            + Add a new phase
          </div>
          <div
            v-else-if="isAddPhase === true"
            class="bg-white rounded-lg ml-12 w-[250px] h-[150px]"
          >
            <div class="w-full pb-5 pr-2">
              <span
                class="font-bold float-right cursor-pointer"
                @click="toggleAddPhase()"
                >x</span
              >
            </div>
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
      </section>
    </div>
  </div>
</template>
<style></style>

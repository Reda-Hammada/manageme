<script>
import axios from "axios";
import AppTaskComponent from "./AppTaskComponent.vue";
import AppTaskForm from "./AppTaskForm.vue";
import AppTaskDetails from "./AppTaskDetails.vue";

export default {
  name: "AppPhase",
  props: {
    fetchedBoard: {
      type: Array,
      required: true,
    },
    boardId: {
      type: Number,
      required: true,
    },
  },
  components: {
    AppTaskComponent,
    AppTaskForm,
    AppTaskDetails,
  },
  data() {
    return {
      phaseValue: "",
      taskComponentKey: 0,
      isAddPhase: false,
      updatePhaeID: null,
      addTaskID: null,
      taskDetailsID: null,
      taskFormComponentId: null,
      isTaskDetails: false,
      phaseupdateSchema: {
        phase: "required",
      },
    };
  },
  methods: {
    toggleEdit(phaseId) {
      // if is form not open assing the id to it to be open
      if (this.updatePhaeID !== phaseId) {
        // assigning the phase id to the updatePhaseId so that only the clicked phase form can be shown
        this.updatePhaeID = phaseId;

        // else if it is open  then close it
      } else if (this.updatePhaeID === phaseId) {
        // hide the update form
        this.updatePhaeID = null;
      }
    },
    toggleAddTaskForm(phaseId) {
      if (this.addTaskID !== phaseId) {
        this.addTaskID = phaseId;
      } else if (this.addTaskID === phaseId) {
        this.addTaskID = null;
      }
    },
    toggleShowTaskDetails(taskId) {
      if (this.taskDetailsID !== taskId) {
        this.taskDetailsID = taskId;
      } else if (this.taskDetailsID === taskId) {
        this.taskId = null;
      }
    },
    toggleAddPhase() {
      this.isAddPhase = !this.isAddPhase;
    },
    incrementPhaseCompKeyByEmit() {
      this.$emit("incrementPhaseKey");
    },
    rerenderTaskComponent() {
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
    async updatePhase(phaseId) {
      try {
        const data = this.phaseValue;
        await axios
          .put(
            `http://127.0.0.1:8000/api/phase/${phaseId}`,
            { phase: data },
            {
              headers: {
                Authorization: "Bearer " + localStorage.user_token,
                "Content-Type": "application/json",
              },
            }
          )
          .then(async (res) => {
            if ((await res.data.status) === 200) {
              this.incrementPhaseCompKeyByEmit();
            }
          });
      } catch (err) {
        console.log(err);
      }
    },
    async deletePhase(phaseId) {
      try {
        await axios
          .delete(`http://127.0.0.1:8000/api/phase/${phaseId}`, {
            headers: {
              Authorization: "Bearer " + localStorage.user_token,
              "Content-Type": "application/json",
            },
          })
          .then(async (res) => {
            if ((await res.data.status) === 200) {
              this.incrementPhaseCompKeyByEmit();
            }
          });
      } catch (err) {
        alert(err);
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
          <div v-if="updatePhaeID !== phase.id" class="mb-5 pl-5">
            {{ phase.phase }} ({{ phase.tasks.length }})
          </div>
          <!-- Edit phae form-->
          <div v-if="updatePhaeID === phase.id" class="mb-5 pl-5">
            <div class="mb-2 ml-2 w-full" @click="toggleEdit(phase.id)">
              <span class="font-bold float-right cursor-pointer"> x </span>
            </div>
            <vee-form
              :validation-schema="phaseupdateSchema"
              @submit="updatePhase(phase.id)"
            >
              <div>
                <vee-field name="phase" v-slot="{ field, errors }">
                  <div>
                    <input
                      class="w-[90%] border pl-3 mt-3 border-bg-bg-color border-4 rounded ml-2 h-[35px]"
                      name="phase"
                      type="text"
                      v-model="phaseValue"
                      v-bind="field"
                    />
                  </div>
                  <div :key="index" v-for="(index, error) in errors">
                    {{ error }}
                  </div>
                </vee-field>

                <div>
                  <input
                    type="submit"
                    value="update"
                    class="bg-main-color cursor-pointer text-white rounded w-[100px] h-[30px] mb-2 mt-3 ml-4"
                  />
                </div>
              </div>
            </vee-form>
          </div>
          <!-- edit and delte phase icons-->
          <div v-if="updatePhaeID !== phase.id" class="flex">
            <!--edit-->
            <div
              ref="toggleEdit"
              class="mr-4 cursor-pointer hover:bg-gray-400 w-[22px] text-center h-fit rounded-full"
            >
              <i
                @click="toggleEdit(phase.id)"
                class="fa-solid fa-pen fa-sm"
                style="color: #4e4e91"
              ></i>
            </div>
            <!--Delete-->
            <div
              class="mr-2 cursor-pointer hover:bg-gray-400 w-[22px] text-center h-fit rounded-full"
            >
              <i
                class="fa-solid fa-trash fa-sm"
                style="color: #4e4e91"
                @click="deletePhase(phase.id)"
              ></i>
            </div>
          </div>
        </div>
        <!--Tasks-->
        <div v-for="(task, index) in phase.tasks" :key="index">
          <div>
            <app-task-component
              @click="toggleShowTaskDetails(task.id)"
              :key="taskComponentKey"
              @emit-parentPhase="rerenderTaskComponent()"
              :Task="task.task_name"
              :idTask="task.id"
            >
            </app-task-component>
          </div>
          <div>
            <app-task-details
              :taskDetailsID="taskDetailsID"
              :taskId="task.id"
              :tasks="task"
              @closetaskdetails-emit="toggleShowTaskDetails()"
            >
            </app-task-details>
          </div>
        </div>

        <div
          class="text-main-color pl-5 cursor-pointer"
          @click="toggleAddTaskForm(phase.id)"
        >
          + Add a task
        </div>
      </div>
    </div>
    <app-task-form
      ref="taskComponentForm"
      :phaseId="phase.id"
      :addTaskID="addTaskID"
      @close-taskform="toggleAddTaskForm"
      @rerender-phase="incrementPhaseCompKeyByEmit"
    >
    </app-task-form>
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

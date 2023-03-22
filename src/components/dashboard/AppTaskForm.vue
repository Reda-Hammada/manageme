<script>
import axios from "axios";

export default {
  name: "AppTaskForm",
  props: {
    isAddTask: {
      Type: Boolean,
      Required: true,
    },
    phaseId: {
      Type: Number,
      Required: true,
    },
  },
  data() {
    return {
      Subtasks: [{ Subtask: "" }],
      addTaskSchema: {
        title: "required",
      },
    };
  },
  methods: {
    addSubstakInput() {
      this.Subtasks.push([{ Subtask: "" }]);
    },
    deleteSubTaskInput(index) {
      this.Subtasks.splice(index, 1);
    },
    closeAddTaskForm() {
      this.$emit("close-taskform");
    },
    async addTask(values) {
      try {
        axios.post(`http://127.0.0.1:8000/api/task/${this.phaseId}`,values,
        
       {

        headers:{
          Authorization: "Bearer " + localStorage.user_token,
          "Content-Type": "application/json",
        },
      
        
       })
      .then(async(response)=>{
          console.log(response);
       })


      } catch (err) {
          console.log(err);
      }

    },
  },
};
</script>

<template>
  <section
    class="absolute bg-black w-full h-full top-0 left-0 bg-opacity-50"
    v-show="isAddTask === true"
  >
    <div class="bg-white w-[30%] h-fit pb-[3%] rounded mr-auto ml-auto mt-[5%]">
      <div class="w-full ml-12 font-bold text-xl pt-5 flex justify-between">
        <h2>Add a new task</h2>
        <span class="mr-24 cursor-pointer" @click="closeAddTaskForm()">X</span>
      </div>
      <vee-form :validation-schema="addTaskSchema" @submit="addTask">
        <!--Task title-->
        <div class="ml-12 mt-6">
          <label class="font-bold"> Title: </label><br />
          <vee-field name="title" v-slot="{ field, errors }">
            <input
              class="w-[90%] border mt-3 border-bg-bg-color rounded pl-3 h-[40px]"
              name="title"
              v-bind="field"
              type="text"
              placeholder="e.g take a coffee break"
            />
            <!--Task title error-->
            <div
              v-for="(error, index) in errors"
              :key="index"
              class="text-red-600 mt-2"
            >
              {{ error }}
            </div>
          </vee-field>
        </div>
        <div class="mt-4">
          <!--Subtask-->
          <label class="ml-12 mt-6 font-bold"> Subtasks: </label>
        </div>
        <div
          class="ml-12 mt-2"
          v-for="(Subtask, index) in Subtasks"
          :key="index"
        >
          <vee-field
            v-slot="{ field }"
            :name="`Subtask${index + 1}`"
            v-validate="Subtask.rules"
          >
            <div>
              <input
                v-validate="Subtask.rules"
                class="w-[90%] border mt-3 border-bg-bg-color rounded pl-3 h-[40px]"
                type="text"
                placeholder="e.g make your coffee"
                v-bind="field"
                v-model="Subtasks.Subtask"
                :name="`Subtask`"
              />
              <span
                class="ml-3 mb-2 text-xl cursor-pointer"
                @click="deleteSubTaskInput(index)"
              >
                X
              </span>
              <!--Substask error-->
              <span>{{ Subtask.rules }}</span>
            </div>
          </vee-field>
        </div>
        <!--Add Subtask input button-->
        <div class="text-center mt-4">
          <button
            type="button"
            class="w-[70%] text-center rounded-full h-[40px] bg-gray-200 text-main-color font-bold rounded"
            v-on:click="addSubstakInput()"
          >
            + Add Subtask
          </button>
        </div>
        <!--description-->

        <div class="ml-12 mt-5">
          <label class="font-bold"> description: </label><br />
          <vee-field name="description" v-slot="{ field, errors }">
            <textarea
              name="description"
              placeholder="It is important to take a breakt regularly, remember to take your break"
              class="w-[90%] border mt-3 border-bg-bg-color rounded pl-3 h-[100px] pt-3 resize-none"
              v-bind="field"
            >
            </textarea>

            <!--description error-->
            <div
              v-for="(error, index) in errors"
              :key="index"
              class="mt-2 text-red-500"
            >
              {{ error }}
            </div>
          </vee-field>
        </div>
        <!--Add Button-->
        <div class="text-center mt-6">
          <input
            class="w-[70%] cursor-pointer text-center text-white font-bold text-center rounded-full h-[40px] bg-main-color"
            type="submit"
            value="+ Add Task"
          />
        </div>
      </vee-form>
    </div>
  </section>
</template>

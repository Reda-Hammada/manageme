<script>
import { integer } from "@vee-validate/rules";
import axios from "axios";
export default {
  name: "AppTaskComponent",
  props: {
    Task: {
      type: String,
      required: true,
    },
    idTask: {
      type: integer,
      required: true,
    },
  },
  data() {
    return {
      taskSchema: {
        task: "required",
      },
      hover: false,
      isEdit: false,
    };
  },
  methods: {
    emitParent() {
      this.$emit("emit-parentPhase");
    },
    toggleEdit() {
      this.isEdit = !this.isEdit;
    },
    async updateTask(values) {
      const task = values;
      await axios
        .put(`http://127.0.0.1:8000/api/task/${this.idTask}`, task, {
          headers: {
            Authorization: "Bearer " + localStorage.user_token,
            "Content-Type": "application/json",
          },
        })
        .then(async (res) => {
          if (res.data.status === 200) {
            this.emitParent();
          }
        })
        .catch(async (err) => {
          console.log(await err);
        });
    },
    async deleteTask(idTask) {
      await axios
        .delete(`http://127.0.0.1:8000/api/task/${idTask}`, {
          headers: {
            Authorization: "Bearer " + localStorage.user_token,
            "Content-Type": "application/json",
          },
        })
        .then(async (res) => {
          if (res.data.status === 200) {
            this.emitParent();
          }
        })
        .catch(async (err) => {
          if (await err) {
            alert(err.message);
          }
        });
    },
  },
  computed: {
    getTask() {
      return this.Task;
    },
  },
};
</script>
<template>
  <div
    v-if="isEdit === false"
    @mouseover="hover = true"
    @mouseleave="hover = false"
    class="text-start flex justify-between pl-2 pb-3 bg-color mr-auto ml-auto pt-3 bg-bg-color mb-5 w-[90%] h-fit hover:bg-gray-300 cursor-pointer rounded"
  >
    <div>
      {{ Task }}
    </div>
    <div v-show="hover === true" class="flex">
      <!--Delete-->
      <div
        @click="deleteTask(idTask)"
        class="hover:bg-gray-400 h-fit rounded-full pl-2 pr-2 mr-2"
      >
        <i class="fa-solid fa-trash fa-sm" style="color: #4e4e91"></i>
      </div>
      <!--Edit-->
      <div
        @click="toggleEdit()"
        class="hover:bg-gray-400 h-fit rounded-full pl-2 pr-2 mr-2"
      >
        <i class="fa-solid fa-pen fa-sm" style="color: #4e4e91"></i>
      </div>
    </div>
  </div>
  <div v-else-if="isEdit === true">
    <vee-form @submit="updateTask" :validation-scheme="taskSchema">
      <span
        class="font-bold cursor-pointer h-fit float-right mr-2 cursor-pointer"
        @click="toggleEdit()"
        >x</span
      >
      <vee-field v-slot="{ field, errors }" name="task">
        <input
          class="w-[85%] h-fit border-4 ml-2 border-bg-bg-color rounded pl-3"
          type="text"
          v-model="getTask"
          v-bind="field"
          name="task"
        />
        <div class="text-red-500" :key="index" v-for="(index, error) in errors">
          {{ error }}
        </div>
      </vee-field>
      <input
        class="bg-main-color cursor-pointer text-white rounded w-[100px] h-[30px] mb-2 mt-3 ml-4"
        type="submit"
        value="update task"
      />
    </vee-form>
  </div>
</template>

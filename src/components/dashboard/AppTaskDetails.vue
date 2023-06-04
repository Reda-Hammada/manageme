<script>
import axios from "axios";
import AppSubtask from "./AppSubtask.vue";
export default {
  name: "AppTaskDetails",
  components: {
    AppSubtask,
  },
  props: {
    tasks: {
      required: true,
    },
    taskId: {
      type: Number,
      required: true,
    },
    taskDetailsID: {
      required: true,
    },
  },
  data() {
    return {
      isEdit: false,
      subtasks: null,
      subtaskComponentKey: 0,
    };
  },
  methods: {
    closeTaskDetails() {
      this.$emit("closetaskdetails-emit");
    },
    icrementSubtaskComponenetKey() {
      this.subtaskComponentKey++;
    },
  },
};
</script>
<template>
  <section
    v-if="taskId === taskDetailsID"
    class="absolute bg-black w-full h-full top-0 left-0 bg-opacity-25"
  >
    <div
      class="bg-white w-[40%] h-fit overflow-y-auto overflow-x-hidden pb-[2%] rounded mr-auto ml-auto mt-[5%]"
    >
      <div class="w-full pt-2 pr-6">
        <span
          @click="closeTaskDetails()"
          class="font-bold text-xl hover:text-main-color float-right cursor-pointer"
          >x</span
        >
      </div>
      <div v-if="isEdit === false">
        <!--Task name-->
        <div class="w-full font-bold text-2xl">
          <h1 class="ml-12 mt-12">{{ tasks.task_name }}</h1>
        </div>
        <!--Task name-->

        <div class="font-light w-[80%]">
          <p class="mt-9 ml-12">{{ tasks.description }}</p>
        </div>
        <!--subtasks-->
        <div>
          <app-subtask
            :key="subtaskComponentKey"
            @increment-key="icrementSubtaskComponenetKey"
            :taskId="tasks.id"
          >
          </app-subtask>
        </div>
      </div>
      <div v-else-if="isEdit === true">
        <div></div>
      </div>
    </div>
  </section>
</template>

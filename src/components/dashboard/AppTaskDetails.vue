<script>
export default {
  name: "AppTaskDetails",
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
    return {};
  },
  methods: {
    closeTaskDetails() {
      this.$emit("closetaskdetails-emit");
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
      <!--Task name-->
      <div class="w-full font-bold text-2xl">
        <h1 class="ml-12 mt-12">{{ tasks.task_name }}</h1>
      </div>
      <!--Task name-->

      <div class="font-light w-[80%]">
        <p class="mt-9 ml-12">{{ tasks.description }}</p>
      </div>
      <!--subtasks-->
      <div v-if="tasks.subtasks.length !== 0">
        <p class="ml-12 mt-6">Subtasks (0 of {{ tasks.subtasks.length }})</p>
      </div>
      <div class="ml-12 mt-9">
        <ul :key="index" v-for="(subtask, index) in tasks.subtasks">
          <li
            class="bg-gray-200 mb-3 w-[80%] h-[40px] pl-9 pt-2 rounded text-main-color"
            :key="subtask.id"
          >
            <input class="mr-6" type="checkbox" />

            <span ref="subtask">{{ subtask.subtask_name }}</span>
          </li>
        </ul>
      </div>
    </div>
    <div></div>
  </section>
</template>

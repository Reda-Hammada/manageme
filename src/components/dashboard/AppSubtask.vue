<script>
import axios from "axios";
export default {
  name: "AppSubtask",
  props: {
    taskId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      subtasks: [],
    };
  },

  methods: {
    async fetchSubtasks() {
      try {
        await axios
          .get(`http://127.0.0.1:8000/api/tasks/subtasks/${this.taskId}`, {
            headers: {
              Authorization: "Bearer " + localStorage.user_token,
              "Content-Type": "application/json",
            },
          })
          .then(async (res) => {
            if ((await res.data.status) === 200) {
              this.subtasks = await res.data.subtasks;
              console.table(this.subtasks);
            }
          });
      } catch (err) {
        console.log(err);
      }
    },
    async checkSubtask(id) {
      try {
        const subtask = this.subtasks.find((subtask) => subtask.id === id);
        console.log(subtask)
        if (subtask) {
          const isDone = !subtask.isDone;
          console.log(subtask)

          await axios
            .put(
              `http://127.0.0.1:8000/api/subtasks/${id}`,
              { isDone: isDone },
              {
                headers: {
                  Authorization: "Bearer " + localStorage.user_token,
                  "Content-Type": "application/json",
                },
              }
            )
            .then(async (res) => {
              if (res.data.status === 200) {
                console.table(res.data.isDone);
                this.incrementKeyFromChild();
              }
            });
        }
      } catch (err) {
        console.log(err);
      }
    },
    // increment the subtask component key with emit
    incrementKeyFromChild() {
      this.$emit("increment-key");
    },
  },
  created() {
    this.fetchSubtasks();

  },
};
</script>
<template>
  <div class="ml-12 mt-9">
    <ul :key="index" v-for="(subtask, index) in subtasks">
      <li
        :style="
          subtask.isDone
            ? { textDecorationLine: 'line-through', color: 'gray' }
            : { textDecorationLine: 'none' }
        "
        class="bg-gray-200 flex mb-3 w-[80%] h-[40px] pl-9 pt-2 rounded"
      >
        <input
          type="checkbox"
          class="mr-5 mb-2"
          @click="checkSubtask(subtask.id)"
        />
        {{ subtask.subtask_name }}
      </li>
    </ul>
  </div>
</template>

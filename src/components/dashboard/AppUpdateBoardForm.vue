<script>
import axios from "axios";
export default {
  name: "AppUpdateBoardForm",
  props: {
    board: {
      type: Array,
      rquired: true,
    },
    data() {
      return {
        updateBoardSchema: {
          board: "required",
        },
      };
    },
  },
  methods: {
    triggerToggleUpdateBoard() {
      this.$emit("trigger-updateBoard-form");
    },
    async updateBoard(values) {
      const board = values.board;
      try {
        await axios
          .put(
            `http://127.0.0.1:8000/api/boards/${this.board.id}`,
            {
              board: board,
            },
            {
              headers: {
                Authorization: "Bearer " + localStorage.user_token,
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
            if (res.data.status === 200) {
                this.triggerToggleUpdateBoard();
            }
          });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
<template>
  <section class="absolute bg-black w-full h-full top-0 left-0 bg-opacity-25">
    <div
      class="bg-white w-[40%] overflow-y-auto overflow-x-hidden pb-[1%] rounded mr-auto ml-auto mt-[5%]"
    >
      <div @click="triggerToggleUpdateBoard">
        <span
          class="font-bold hover:text-main-color float-right cursor-pointer text-2xl mr-3 mb-2"
        >
          x
        </span>
      </div>
      <div class="text-center mt-6 font-bold text-xl">
        <h2>Update Board title</h2>
      </div>
      <vee-form @submit="updateBoard" :validation-schema="updateBoardSchema">
        <div>
          <div class="mt-3 ml-4 mb-3">
            <label class="font-bold block"> Board title : </label>
            <vee-field v-slot="{ field, errors }" name="board">
              <input
                type="text"
                name="board"
                v-model="board.board_name"
                class="w-[90%] border mt-3 border-bg-bg-color border-4 rounded pl-3 h-[40px]"
                v-bind="field"
              />
              <div v-for="error in errors" :key="error">
                <span class="text-red-500 font-bold">
                  {{ error }}
                </span>
              </div>
            </vee-field>
          </div>
          <div class="w-[100%] mt-6 text-center">
            <input
              type="submit"
              value="update"
              class="w-[24%] mt- mb-5 cursor-pointer text-center text-white font-bold rounded-full h-[40px] bg-main-color"
            />
          </div>
        </div>
      </vee-form>
    </div>
  </section>
</template>

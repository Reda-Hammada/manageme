<script>
import axios from "axios";

export default {
  name: "AppSideNav",
  inject: ["eventBus"],
  data() {
    return {
      boards: [],
      isBoardActive: false,
      boardsFetchErro: null,

      userData: JSON.parse(localStorage.userData),
    };
  },
  created() {
    this.fetchBoards();
  },
  methods: {
    async fetchBoards() {
      try {
        await axios
          .get(`http://127.0.0.1:8000/api/boards/user/${this.userData.id}`, {
            headers: {
              Authorization: "Bearer " + localStorage.user_token,
            },
          })
          .then(async (res) => {
            if (res.status === 200) {
              this.boards = res.data.boards;
            }
          });
      } catch (err) {
        console.log(err);
      }
    },
    toggleIsAdd() {
      this.$emit("ToggleAdd");
    },
    triggerFetchBoard(boardId) {
      this.eventBus.emit("trigger-board", boardId);
      this.isBoardActive = boardId;
    },
  },
};
</script>

<template>
  <header class="border-r-2 pb-32 overflow-x-auto">
    <nav>
      <div
        class="pt-2 pl-3 font-bold pb-10 border-gray text-2xl text-main-color"
      >
        <h1>Manageme:</h1>
      </div>
      <div v-if="$slots.boards">
        <slot name="boards">
          <h1 class="ml-3 font-bold text-xl">
            All Boards ({{ boards.length }})
          </h1>
          <div class="pl-5 mt-3 mb-6 overflow-x-auto">
            <ul class="pb-2" v-for="(board, index) in boards" :key="index">
              <li
                :style="
                  isBoardActive === board.id
                    ? { backgroundColor: '#4E4E91', color: '#ffff' }
                    : { backgroundColor: '#F5F5F5 ' }
                "
                @click="triggerFetchBoard(board.id)"
                class="text-main-color h-fit hover:bg-main-color cursor-pointer w-[90%] mb-2 pt-3 pb-3 rounded-r-full pl-5 font-bold"
              >
                {{ board.board_name }}
              </li>
            </ul>
            <a
              class="text-main-color font-bold cursor-pointer"
              @click="toggleIsAdd"
            >
              + Create a New Board
            </a>
          </div>
        </slot>
      </div>
      <div v-if="$slots.settingSideNavSlot">
        <slot name="settingSideNavSlot"> </slot>
      </div>
    </nav>
  </header>
</template>

<script>
import axios from "axios";

export default {
  name: "AppSideNav",
  data() {
    return {
      boards: [],
      boardsFetchErro: null,
      isLoading: false,
      userData: JSON.parse(localStorage.userData),
    };
  },
  mounted() {
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
        alert(err.response.data.message);
      }
    },
    toggleIsAdd() {
      this.$emit("ToggleAdd");
    },
 

  },
}
</script>

<template>
  <header>
    <nav>
      <div class="mb-12 pt-2 pl-3 font-bold text-2xl text-main-color">
        <h1>Manageme:</h1>
      </div>
      <h1 class="ml-3 font-bold text-xl">All Boards ({{ boards.length }})</h1>
      <div class="pl-5 mt-3">
        <ul class="" v-for="(board, index) in boards" :key="index">
          <li
            class="bg-main-color cursor-pointer text-white w-[80%] mb-2 rounded-r-full h-[35px] pt-1 pl-5 font-bold"
          >
            {{ board.board_name }}
          </li>
        </ul>
        <a
          class="text-main-color font-bold mt-3 cursor-pointer"
          @click="toggleIsAdd"
        >
          + Create a New Board
        </a>
      </div>
    </nav>
  </header>
</template>

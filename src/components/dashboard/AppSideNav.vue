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
          .get(`http://127.0.0.1:8000/api/boards/${this.userData.id}`, {
            headers: {
              Authorization: "Bearer " + localStorage.user_token,
            },
          })
          .then(async (res) => {
            if (res.status === 200) {
              this.boards = res.data.boards;
              console.log(this.boards);
            }
          });
      } catch (err) {
        alert(err.response.data.message);
      }
    },
  },
};
</script>

<template>
  <section>
    <div>
      <h1>boards:</h1>
      <div>
        <ul v-for="(board,index) in boards" :key='index'>
          <li :key="index">{{board.board_name}}</li>
        </ul>
      </div>
    </div>
  </section>
</template>

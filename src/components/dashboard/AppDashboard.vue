<script>
import AppSideNav from "@/components/dashboard/AppSideNav.vue";
import axios from "axios";

export default {
  name: "AppDashboard",
  components: {
    AppSideNav,
  },
  data() {
    return {
      userData: JSON.parse(localStorage.userData),
      Board: null,
    };
  },
  methods: {
    logOut() {
      localStorage.removeItem("user_token");
      localStorage.removeItem("userData");
      this.$router.push({ name: "Home" });
    },
    async createBoard() {
      try {
        await axios
          .post(
            `http://127.0.0.1:8000/api/board/create/${this.userData.id}`,
            { Board: this.Board },
            {
              headers: {
                Authorization: "Bearer " + localStorage.user_token,
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
            alert(res);
          });
      } catch (err) {
        alert(err);
      }
    },
  },
};
</script>
<template>
  <h1>Dashboard</h1>
  <p>{{ userData.name }}</p>
  <button @click="consoleUser">console</button>
  <button @click="logOut">Logout</button>
  <app-side-nav></app-side-nav>
  {{ userData.id }}
  <div>
    <form @submit="createBoard">
      <div>
        <input type="text" name="Board" v-model="Board" />
        <input type="submit" value="create" />
      </div>
    </form>
  </div>
</template>

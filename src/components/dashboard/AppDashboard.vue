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
      Board: "",
    };
  },
  methods: {
    logOut() {
      localStorage.removeItem("user_token");
      localStorage.removeItem("userData");
      this.$router.push({ name: "Home" });
    },
    async createBoard() {
      alert(this.Board)
      try {
        const response = await axios.post(
          `http://127.0.0.1:8000/api/board/create/${this.userData.id}`,
          {
            Board:this.Board,
          },
          {
           
            headers: {
              Authorization: "Bearer " + localStorage.user_token,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
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
    <form >
      <div>
        <input type="text" 
               v-model="Board" 
               name="Board" />
        <input type="submit"
                @click="createBoard" 
            value="create" />
      </div>
    </form>
  </div>
</template>

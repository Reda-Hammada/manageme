<script>
import { RouterLink, RouterView } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { mapActions } from "pinia";

export default {
  name: "AppDashboard",

  data() {
    return {
      userData:localStorage.getItem("userData"),
    };
  },
  methods: {
    consoleUser() {
      console.log(this.userData);
    },
    logOut(){
      localStorage.removeItem('user_token')
      localStorage.removeItem('userData')
      this.$router.push({name:'Home'})
    }
  },
};
</script>
<template>
  <h1>Dashboard</h1>
    <p>{{userData}}</p>
  <button @click="logOut">Logout</button>
</template>

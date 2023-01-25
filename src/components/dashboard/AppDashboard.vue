<script>
import { RouterLink, RouterView } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { mapActions } from "pinia";

export default {
  name: "AppDashboard",

  data() {
    return {
      userData: JSON.parse(localStorage.getItem("userData")),
    };
  },
  methods: {
    consoleUser() {
      console.log(this.userData);
    },
    ...mapActions(useAuthStore,['logout'])
  },
};
</script>
<template>
  <h1>Dashboard</h1>

  <button @click="consoleUser">Click me !!</button>
  <p>{{userData.name}}</p>
  <button @click="logout">Logout</button>
</template>

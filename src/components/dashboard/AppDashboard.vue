<script>
export default {
  name: "AppDashboard",

  data() {
    return {
      // userData:JSON.parse(localStorage.userData),
    };
  },
  methods: {
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
  <!-- <p>{{userData.name}}</p>
    <button @click="consoleUser">console</button>
  <button @click="logOut">Logout</button> -->
</template>

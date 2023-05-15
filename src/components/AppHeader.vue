<script>
import { useHiddenStore } from "@/stores/hidden.js";
import { mapWritableState } from "pinia";
import { RouterLink } from "vue-router";

export default {
  name: "AppHeader",
  el: "#app",

  props: {
    tab: {
      type: String,
      Required: true,
    },
  },
  emits: ["change-tab"],
  data() {
    return {};
  },
  computed: {
    ...mapWritableState(useHiddenStore, ["isHidden"]),
  },
  methods: {
    // toggle form
    ToggleForm(argument) {
      // change global state isHidden to show the pop up form
      this.isHidden = !this.isHidden;
      // pass the argument to parent component either login or signup
      this.$emit("change-tab", argument);
    },
  },
};
</script>
<template>
  <!--navbar-->
  <header>
    <nav class="navbar-container flex justify-evenly pt-5 w-full">
      <div class="logo-container">
        <h1 class="text-main-color font-bold text-3xl">Manageme</h1>
      </div>
      <!--navbar lists and links-->
      <div class="navbar-list">
        <ul class="mt-2">
          <li
            class="inline mr-4 hover:text-main-color cursor-pointer font-bold"
          >
            Home
          </li>
          <li
            class="inline mr-4 hover:text-main-color cursor-pointer font-bold"
          >
            Features
          </li>
          <li
            class="inline mr-4 hover:text-main-color cursor-pointer font-bold"
          >
            Testimonies
          </li>
          <li
            class="inline mr-4 hover:text-main-color cursor-pointer font-bold"
          >
            About us
          </li>
          <li
            class="inline mr-4 hover:text-main-color cursor-pointer font-bold"
          >
            Contact us
          </li>
        </ul>
      </div>
      <!--sign up and login up button-->
      <div class="mt-2 button-container">
        <button
          @click="ToggleForm('logIn')"
          class="mr-7 w-28 rounded h-10 bg-bg-color border text-main-color border-main-color"
        >
          Sign in
        </button>
        <button
          @click="ToggleForm('signUp')"
          class="w-28 w-28 rounded h-10 bg-button-color text-white"
        >
          Sign up
        </button>
      </div>
    </nav>
  </header>
  <!--navbar-->
</template>
<style>
@media screen and (max-width: 576px) {
  /* navbar */
  .navbar-container {
    width: 100%;
    display: flex;
  }
  .logo-container {
    width: 40%;
  }
  .logo-container h1 {
    font-size: 1.6rem;
    margin-left: 5px;
  }
  .navbar-list {
    display: none;
  }
  .button-container {
    display: flex;
    width: 60%;
    margin-left: 60px;
  }
  .button-container button {
    width: 70px;
    margin-right: 3%;
  }
  /* navbar */
}

@media screen and (min-width: 576px) and (max-width: 768px) {
  /* navbar */
  .navbar-container {
    display: flex;
    justify-content: start;
    width: 100%;
  }
  .navbar-list {
    display: none;
  }
  .button-container {
    display: flex;
    margin-left: 6%;
  }
  .button-container button {
    margin-right: 4%;
  }
  /* navbar */
}

@media screen and (min-width: 768px) and (max-width: 992px) {
  /* navbar */

  .navbar-container {
    display: flex;
    justify-content: center;
    width: 100%;
  }
  .logo-container h1 {
    margin-left: 2%;
  }
  .navbar-list {
    text-justify: center;
    margin-left: 3%;
    width: 70%;
  }
  .navbar-list li {
    margin-right: 1%;
  }
  .button-container {
    display: flex;
    margin-right: 1%;
  }
  .button-container button {
    margin-right: 3%;
  }
  /* navbar */
}
</style>

<script>
import AppSideNav from "@/components/dashboard/AppSideNav.vue";
import AppNav from "./AppNav.vue";
import axios from "axios";

export default {
  name: "AppDashboard",
  components: {
    AppSideNav,
    AppNav,
  },
  data() {
    return {
      userData: JSON.parse(localStorage.userData),
      Board: null,
      isAdd: false,
    };
  },
  methods: {
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
    updateIsAdd(){
      this.isAdd = !this.isAdd;
    }
  },
};
</script>
<template>
  <!--Ultimate container-->
  <div class=" flex">
    <!--Side navbar-->
    <div class="bg-white h-screen w-[15%]">
      <app-side-nav @ToggleAdd="updateIsAdd"></app-side-nav>
    </div>
    <div class="w-[85%]">
      <!--navbar-->
      <app-nav class="bg-white w-full h-[5%] divide-x-2">

      </app-nav>
    </div>
  </div>
  <div v-if="isAdd === true" 
      class="absolute bg-black w-full h-full opacity-25 top-0">
      <div  v-if="isAdd === true"
        class="aboslute bg-white w-[50%] top-100">
     <form 
          @submit="createBoard">
      <div>
        <input type="text" name="Board" v-model="Board" />
        <input type="submit" value="create" />
      </div>
    </form>
  </div>
  </div>
  

  <!-- <p>{{ userData.name }}</p>
  <button @click="consoleUser">console</button>
  <button @click="logOut">Logout</button>
  <app-side-nav></app-side-nav>
  {{ userData.id }}
  <div>
    <form 
          @submit="createBoard">
      <div>
        <input type="text" name="Board" v-model="Board" />
        <input type="submit" value="create" />
      </div>
    </form>
  </div> -->
</template>

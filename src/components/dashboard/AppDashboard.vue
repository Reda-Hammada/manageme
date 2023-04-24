<script>
import AppSideNav from "@/components/dashboard/AppSideNav.vue";
import AppNav from "./AppNav.vue";
import AppBoard from "./AppBoard.vue";
import axios from "axios";

export default {
  name: "AppDashboard",
  components: {
    AppSideNav,
    AppNav,
    AppBoard,
  },
  data() {
    return {
      addBoardSchema: {
        board: "required",
      },
      userData: JSON.parse(localStorage.userData),
      Board: null,
      isAdd: false,
    };
  },
  methods: {
    async createBoard(values) {
      try {
        await axios
          .post(
            `http://127.0.0.1:8000/api/boards/user/${this.userData.id}`,
            { Board: values.board },
            {
              headers: {
                Authorization: "Bearer " + localStorage.user_token,
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
            this.isAdd = false;
            this.$forceUpdate();
          });
      } catch (err) {
        console.log(err);
      }
    },
    updateIsAdd() {
      this.isAdd = !this.isAdd;
    },
  },
};
</script>
<template>
  <!--Ultimate container-->
  <div class="flex w-full bg-bg-color overflow-x-scroll">
    <!--Side navbar-->
    <div class="bg-white h-screen">
      <app-side-nav class="h-screen w-[300px]" @ToggleAdd="updateIsAdd">
        <template v-slot:boards> </template>
      </app-side-nav>
    </div>
    <div class="w-[85%] flex flex-col">
      <!--navbar-->
      <app-nav class="bg-white w-full h-[8.5%] border-b-2 border-gray">
      </app-nav>
      <div>
        <app-board class="overflow-x-auto"> </app-board>
      </div>
    </div>
  </div>
  <div
    v-if="isAdd === true"
    class="absolute bg-black w-full h-full bg-opacity-50 top-0"
  >
    <div
      v-if="isAdd === true"
      class="mr-auto ml-auto bg-white w-[30%] mt-32 rounded"
    >
      <div class="w-full ml-12 font-bold text-xl pt-5 flex justify-between">
        <h2>Add a new board</h2>
        <span class="mr-24 cursor-pointer" @click="updateIsAdd()">X</span>
      </div>
      <vee-form @submit="createBoard" :validation-schema="addBoardSchema">
        <div>
          <div class="mt-3 ml-4 mb-3">
            <label class="font-bold block"> Board title : </label>
            <vee-field v-slot="{ field, errors }" name="board">
              <input
                type="text"
                name="board"
                class="w-[90%] border mt-3 border-bg-bg-color border-4 rounded pl-3 h-[35px]"
                v-bind="field"
                placeholder="e.g todo app project"
              />
              <div v-for="error in errors" :key="error">
                <span class="text-red-500 font-bold">
                  {{ error }}
                </span>
              </div>
            </vee-field>
          </div>
          <div class="w-[100%] text-center">
            <input
              type="submit"
              value="create"
              class="w-[24%] mt- mb-5 cursor-pointer text-center text-white font-bold rounded-full h-[30px] bg-main-color"
            />
          </div>
        </div>
      </vee-form>
    </div>
  </div>
</template>

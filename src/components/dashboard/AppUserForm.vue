<template>
  <section class="bg-white w-[70%] rounded h-fit mr-auto ml-auto mb-32">
    <vee-form @submit="updateUserInfo" :validation-schema="userFromSchema">
      <!--User image-->
      <div class="w-full flex ml-12 mt-5">
        <div class="mt-6">
          <img
            class="w-[100px] rounded-full"
            :src="userData.image_path"
            alt="User image"
          />
        </div>
        <div class="ml-4 mt-9">
          <h1 class="font-bold text-xl">{{ userData.name }}</h1>
          <p>Update your image and personal information</p>
        </div>
      </div>

      <!--User full name-->
      <div
        v-if="isChangeName === false"
        class="flex justify-between border-b-2 pb-9 pl-5 pr-5 mt-12"
      >
        <div class="flex">
          <p class="font-bold">Full name:</p>
          <p class="ml-48">{{ userData.name }}</p>
        </div>

        <button
          @click="toggleEdit('name', true)"
          class="text-main-color font-bold"
          type="button"
        >
          Edit
        </button>
      </div>

      <div
        v-else-if="isChangeName === true"
        class="mt-12 h-[160px] pl-12 pb-8 border-b-2 w-full"
      >
        <label class="font-bold">Full name:</label>
        <vee-field name="userfullname" v-slot="{ errors, field }">
          <input
            class="border-bg-bg-color h-[32px] pl-5 ml-[9%] w-[500px] border-2 rounded"
            type="text"
            name="userfullname"
            v-bind="field"
          />
          <!--Errors-->
          <div
            class="ml-[170px] mt-2 text-red-500 font-bold"
            v-for="(error, index) in errors"
            :key="index"
          >
            {{ error }}
          </div>
        </vee-field>
        <div class="flex justify-center mt-12 pb-6">
          <div class="mr-12">
            <input
              class="bg-main-color text-white w-[120px] cursor-pointer rounded font-bold h-[35px]"
              value="save"
              type="submit"
            />
          </div>
          <div>
            <button
              @click="toggleEdit('name', false)"
              class="bg-button-color text-white w-[120px] cursor-pointer rounded font-bold h-[35px]"
            >
              cancel
            </button>
          </div>
        </div>
      </div>

      <!--User email-->
      <div
        v-if="isChangeEmail === false"
        class="flex justify-between border-b-2 pb-9 pl-5 pr-5 mt-12"
      >
        <div class="flex">
          <p class="font-bold">Email:</p>
          <p class="ml-48">{{ userData.email }}</p>
        </div>

        <button
          @click="toggleEdit('email', true)"
          class="text-main-color font-bold"
          type="button"
        >
          Edit
        </button>
      </div>
      <div
        v-else-if="isChangeEmail === true"
        class="mt-12 pl-12 pb-8 border-b-2 w-full"
      >
        <label class="font-bold">Email:</label>

        <vee-field name="email" v-slot="{ errors, field }">
          <input
            class="border-bg-bg-color h-[32px] pl-5 ml-[11.5%] w-[500px] border-2 rounded"
            type="email"
            required
            name="email"
            v-bind="field"
          />
          <!--Errors-->
          <div
            class="ml-[170px] mt-2 text-red-500 font-bold"
            v-for="(error, index) in errors"
            :key="index"
          >
            {{ error }}
          </div>
        </vee-field>
        <div class="flex justify-center mt-12 pb-6">
          <div class="mr-12">
            <input
              class="bg-main-color text-white w-[120px] cursor-pointer rounded font-bold h-[35px]"
              type="submit"
              value="save"
            />
          </div>
          <div>
            <button
              @click="toggleEdit('email', false)"
              class="bg-button-color text-white w-[120px] cursor-pointer rounded font-bold h-[35px]"
            >
              cancel
            </button>
          </div>
        </div>
      </div>

      <!--password-->
      <div
        v-if="isChangePassword === false"
        class="flex justify-between border-b-2 pb-9 pl-5 pr-5 mt-12"
      >
        <div class="">
          <p class="font-bold">Password:</p>
          <p class="">
            It's a good idea to use a strong password that you don't use
            elsewhere
          </p>
        </div>

        <button
          @click="toggleEdit('password', true)"
          class="text-main-color font-bold"
          type="button"
        >
          Edit
        </button>
      </div>
      <div
        v-else-if="isChangePassword === true"
        class="mt-12 pl-5 pb-8 border-b-2 w-full"
      >
        <div class="mb-6">
          <label class="font-bold">Current password:</label>

          <vee-field name="currentpassword" v-slot="{ errors, field }">
            <input
              class="border-bg-bg-color h-[32px] pl-5 ml-[6%] w-[500px] border-2 rounded"
              type="password"
              name="currentpassword"
              v-bind="field"
            />
            <!--Errors-->
            <div
              class="ml-[195px] mt-2 text-red-500 font-bold"
              v-for="(error, index) in errors"
              :key="index"
            >
              {{ error }}
            </div> </vee-field
          ><br />
        </div>
        <div class="">
          <label class="font-bold">New password:</label>

          <vee-field name="newpass" v-slot="{ errors, field }">
            <input
              class="border-bg-bg-color h-[32px] pl-5 ml-[6%] w-[500px] border-2 rounded"
              type="password"
              name="newpass"
              v-bind="field"
            />
            <!--Errors-->
            <div
              class="ml-[195px] mt-2 text-red-500 font-bold"
              v-for="(error, index) in errors"
              :key="index"
            >
              {{ error }}
            </div>
          </vee-field>
        </div>
        <br />
        <div>
          <label class="font-bold">Confirm password:</label>

          <vee-field name="cpass" v-slot="{ errors, field }">
            <input
              class="border-bg-bg-color h-[32px] pl-5 w-[500px] ml-[4%] border-2 rounded"
              type="password"
              name="cpass"
              v-bind="field"
            />
            <!--Errors-->
            <div
              class="ml-[195px] mt-2 text-red-500 font-bold"
              v-for="(error, index) in errors"
              :key="index"
            >
              {{ error }}
            </div>
          </vee-field>
        </div>
        <div class="flex justify-center mt-12 pb-6">
          <div class="mr-12">
            <input
              class="bg-main-color text-white w-[120px] cursor-pointer rounded font-bold h-[35px]"
              type="submit"
              value="save"
            />
          </div>
          <div>
            <button
              @click="toggleEdit('password', false)"
              class="bg-button-color text-white w-[120px] cursor-pointer rounded font-bold h-[35px]"
            >
              cancel
            </button>
          </div>
        </div>
      </div>
    </vee-form>
  </section>
</template>

<script>
import axios from "axios";
export default {
  name: "AppUserForm",
  data() {
    return {
      userFromSchema: {
        userfullname: "",
        email: "email",
        currentpassword: "",
        newpass: "min:8|max:20",
        cpass: "confirmed:@newpass",
      },
      userData: JSON.parse(localStorage.userData),
      isChangePassword: false,
      isChangeName: false,
      isChangeEmail: false,
      updateUserInfoMsg: "",
    };
  },
  methods: {
    returnDashboard() {
      this.$router.push({ name: "Dashboard" });
    },
    toggleEdit(param, bool) {
      if (bool === true) {
        switch (param) {
          case "name":
            this.isChangeName = true;
            break;
          case "email":
            this.isChangeEmail = true;
            break;
          case "password":
            this.isChangePassword = true;
            break;
        }
      } else if (bool === false) {
        switch (param) {
          case "name":
            this.isChangeName = false;
            break;
          case "email":
            this.isChangeEmail = false;
            break;
          case "password":
            this.isChangePassword = false;
            break;
        }
      }
    },
    async updateUserInfo(values) {
      const data = values;
      try {
        await axios
          .put(`http://127.0.0.1:8000/api/user/${this.userData.id}`, data, {
            headers: {
              Authorization: "Bearer " + localStorage.user_token,
              "Content-Type": "application/json",
            },
          })
          .then(async (res) => {
            switch (res.data.status) {
              case 200:
                this.updateUserInfoMsg = res.data.msg;
                this.$emit("msg", this.updateUserInfoMsg, res.data.status);
                break;
              case 401:
                this.updateUserInfoMsg = res.data.msg;
                this.$emit("msg", this.updateUserInfoMsg, res.data.status);

                break;
            }
          });
      } catch (err) {
        alert(err);
      }
    },
  },
};
</script>

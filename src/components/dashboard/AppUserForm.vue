<script>
import axios from 'axios'
export default {
  
  name: "AppUserForm",
  data() {
    return {
      
      userFromSchema: {
        userfullname:'required',
        email: "email",
        newpass: "min:8|max:20",
        cpass: "confirmed:@newpass",
      },
      userData: JSON.parse(localStorage.userData),
    };
  },
  methods: {
    returnDashboard() {
      this.$router.push({ name: "Dashboard" });
    },
    async updateUserInfo(values) {
      const data = values;
      try {
        console.log(data)

        await axios.put(
          `http://127.0.0.1:8000/api/user/${this.userData.id}`,
          data,
          {
            headers: {
              Authorization: "Bearer " + localStorage.user_token,
              "Content-Type": "application/json",
            },
          }
        
        )
        .then(async(res)=>{
          console.log(res)
        })
      } catch (err) {
        alert(err);
      }
    },
  },
};
</script>

<template>
  <section class="bg-white w-[70%] rounded h-fit mr-auto ml-auto">
    <vee-form @submit="updateUserInfo" :validation-schema="userFromSchema">
      <!--User image-->
      <div class="w-full flex ml-12 mt-5">
        <div class="mt-6">
          <img
            class="w-[100px] rounded-full"
            src="/src/assets/images/person1.jpg"
            alt="User image"
          />
        </div>
        <div class="ml-4 mt-9">
          <h1 class="font-bold text-xl">{{ userData.name }}</h1>
          <p>Update your image and personal information</p>
        </div>
      </div>
      <!--User full name-->
      <div class="mt-12 ml-12">
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
      </div>
      <!--User email-->
      <div class="mt-12 ml-12 w-full">
        <label class="font-bold">Email:</label>

        <vee-field name="email" v-slot="{ errors, field }">
          <input
            class="border-bg-bg-color h-[32px] pl-5 ml-[11.5%] w-[500px] border-2 rounded"
            type="email"
            name="email"
            :placeholder="userData.email"
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
      </div>

      <!--password-->
      <div class="mt-12 ml-12 w-full">
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
      <!-- confirm password-->
      <div class="mt-12 ml-12 w-full">
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
            @click="returnDashboard()"
            class="bg-button-color text-white w-[120px] cursor-pointer rounded font-bold h-[35px]"
          >
            cancel
          </button>
        </div>
      </div>
    </vee-form>
  </section>
</template>

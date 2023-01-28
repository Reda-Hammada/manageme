<script>
import { useHiddenStore } from "@/stores/hidden.js";
import { useAuthStore } from "@/stores/auth";
import { mapState, mapWritableState, mapActions } from "pinia";

export default {
  name: "AppAuth",
  props: {
    tab: {
      type: String,
      Required: true,
    },
  },

  data() {
    return {
      schemaRegister: {
        name: "required",
        email: "required|email",
        password: "required|min:8|max:20",
        confirm_password: "confirmed:@password",
      },
      schemaLogin: {
        email: "required|email",
        password: "required",
      },

      inputValidation: {
        name: {
          isValid: null,
        },
        email: {
          isValid: null,
          message: "",
        },
        password: {
          isValid: null,
        },
        confirmPassword: {
          pass: "",
          isValid: null,
        },
      },
      messageSuccess: {
        isMessage: false,
        message: "",
      },
      messageError: {
        isMessage: false,
        message: "",
      },
      isLoading: false,
    };
  },
  computed: {
    ...mapState(useHiddenStore, ["isHidden"]),

    ...mapWritableState(useHiddenStore, ["isHidden"]),
    ...mapWritableState(useAuthStore, ["isAuthenticated"]),
    ...mapState(useAuthStore, ["authenticateError"]),
    ...mapState(useAuthStore, ["SuccessLogin"]),
    ...mapState(useAuthStore, ["SuccessSignUp"]),
    ...mapState(useAuthStore, ["ErrorSignUp"]),
    ...mapState(useAuthStore, ["userData"]),
  },
  methods: {
    toggleTab(argument) {
      this.$emit("change-tab", argument);
    },
    validateEmailRegister(e) {
      // if the field is empty
      if (e.target.value == null || e.target.value == "") {
        this.inputValidation.email.isValid = false;
      } else {
        this.inputValidation.email.isValid = true;
        this.inputValidation.email.message =
          "You got it right do not worry we won't spam you ";
      }

      // if the field is not a valid email
      const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (!regex.test(e.target.value)) {
        this.inputValidation.email.isValid = false;
      } else {
        this.inputValidation.email.isValid = true;
      }
    },
    validatePasswordRegister(e) {
      // if field empty
      if (e.target.value == null || e.target.value == "") {
        this.inputValidation.password.isValid = false;
      } else {
        this.inputValidation.password.isValid = true;
        this.inputValidation.confirmPassword.pass = e.target.value;
      }

      // if field does not have at least 8 character or maximum 20 characters
      const regx = /^(?=.*[a-zA-Z]).{8,20}$/;
      if (!regx.test(e.target.value)) {
        this.inputValidation.password.isValid = false;
      } else {
        this.inputValidation.password.isValid = true;
      }
    },
    validateConfirmPassRegister(e) {
      if (e.target.value.includes(this.inputValidation.confirmPassword.pass)) {
        this.inputValidation.confirmPassword.isValid = true;
      } else {
        this.inputValidation.confirmPassword.isValid = false;
      }
    },
    validateNameRegister(e) {
      // if name is empty
      if (e.target.value == null || e.target.value == "") {
        this.inputValidation.name.isValid = false;
      } else {
        this.inputValidation.name.isValid = true;
      }
    },
    ...mapActions(useAuthStore, {
      createUser: "register",
      logUser: "logIn",
    }),
    ...mapActions(useAuthStore, ""),

    async register(values) {
      this.isLoading = true;
      const userCred = {
        name: values.name,
        email: values.email,
        password: values.password,
      };
      try {
        await this.createUser(userCred);
        this.isLoading = false;
        this.$router.push({ name: "Dashboard" });
      } catch (err) {
        console.log(err);
      }
    },
    async Login(values) {
      this.isLoading = true;
      try {
        await this.logUser(values);
        this.isLoading = false;
        this.SuccessLogin = '';
        this.$router.push({ name: "Dashboard" });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<template>
  <!--Auth Login & Register-->
  <div
    class="absolute opacity-75 a bg-black w-full h-full top-100 bottom-0"
    v-show="isHidden === true"
  ></div>
  <div
    v-show="isHidden == true"
    class="bg-white absolute right-0 left-0 top-0 rounded ml-auto mr-auto w-4/5 h-fit pb-6"
    :class="{
      'w-[50%] mt-32': tab === 'Login',
      'mt-14': tab === 'Register',
    }"
  >
    <div class="w-full ml-[95%] pt-[1%]">
      <span
        @click="isHidden = !isHidden"
        class="font-bold text-black cursor-pointer hover:text-main-color"
      >
        X
      </span>
    </div>

    <div class="text-center">
      <button
        @click="toggleTab('logIn')"
        class="mr-12"
        :class="{
          'hover:text-main-color bg-white': tab === 'Register',
          ' w-28 rounded	h-10 bg-button-color text-white ': tab === 'Login',
        }"
      >
        Sign in
      </button>
      <button
        @click="toggleTab('signUp')"
        :class="{
          'text-main-color bg-white': tab === 'Login',
          'w-28 w-28 rounded	h-10 bg-button-color text-white ':
            tab === 'Register',
        }"
      >
        Sign up
      </button>
    </div>
    <div class="w-full">
      <div class="h-fit text-center pt-3">
        <div
          v-if="authenticateError && tab === 'Login'"
          class="w-[70%] rounded pt-2 h-[40px] mb-4 ml-auto mr-auto text-white font-bold bg-red-500"
        >
          {{ authenticateError }}
        </div>
        <div
          v-if="SuccessLogin && tab === 'Login'"
          class="w-[70%] rounded pt-2 h-[40px] mb-4 ml-auto mr-auto text-white font-bold bg-green-500"
        >
          {{ SuccessLogin }}
        </div>
        <!--Login-->
        <vee-form
          v-show="tab === 'Login'"
          :validation-schema="schemaLogin"
          @submit="Login"
        >
          <!--email-->
          <div>
            <label class="block ml-[8.2%] mb-2 text-start">Email :</label>
            <vee-field name="email" v-slot="{ field, errors }">
              <input
                name="email"
                v-bind="field"
                class="border outline-blue-600 border-2 w-5/6 h-9 pl-5 rounded border-input-color"
                type="email"
                placeholder="Enter yo ur email"
              />
              <!--Errors email -->
              <div
                class="text-start ml-[9%] mt-2"
                :key="error"
                v-for="error in errors"
              >
                <span class="text-red-500">{{ error }}</span>
              </div>
            </vee-field>
          </div>

          <!--password-->
          <div>
            <label class="block ml-[8.2%] mb-2 mt-2 text-start"
              >Password :</label
            >
            <vee-field v-slot="{ field, errors }" name="password">
              <input
                v-bind="field"
                class="border outline-blue-600 border-2 h-9 w-5/6 text-black pl-5 focus:border-green-500 rounded border-input-color"
                name="password"
                type="password"
                placeholder="Enter your password"
              />
              <!--Errors passowrd -->
              <div
                class="text-start ml-[9%] mt-2"
                :key="error"
                v-for="error in errors"
              >
                <span class="text-red-500">{{ error }}</span>
              </div>
            </vee-field>
          </div>
          <!--Submit-->
          <div class="w-full mt-4">
            <div class="w-2/5 mr-auto ml-auto">
              <input
                v-if="isLoading === false"
                class="bg-main-color ring-button-color hover:ring-2 cursor-pointer w-28 text-white py-1.5 px-3 rounded"
                value="Log in"
                type="submit"
              />
              <button
                v-else
                class="bg-main-color ring-button-color hover:ring-2 cursor-pointer w-28 text-white py-1.5 px-3 rounded"
                type="submit"
              >
                <i class="fa-solid fa-spinner-third"></i>
              </button>
            </div>
          </div>
        </vee-form>
        <div v-show="tab === 'Login'" class="mt-2 w-full text-center">
          <a>Forget your passowrd ?</a>
        </div>
      </div>
    </div>
    <div class="w-full text-center">
      <transition-group name="fade" mode="out-in">
        <div
          v-if="SuccessSignUp && tab === 'Register'"
          class="bg-green-500 w-[60%] rounded mr-auto ml-auto mb-7 p-2 h-[90px] text-white font-bold"
        >
          {{ SuccessSignUp }}
        </div>
        <div
          v-if="ErrorSignUp && tab === 'Register'"
          class="bg-red-500 w-fit pl-[3%] pr-[3%] rounded mr-auto mt-auto pt-[2%] pb-2 ml-auto mb-7 p-2 h-[90px] text-white font-bold"
        >
          {{ ErrorSignUp  }}
        </div>
      </transition-group>
      <!--Register-->
      <vee-form
        v-show="tab === 'Register'"
        @submit="register"
        :validation-schema="schemaRegister"
      >
        <!--user image-->
        <div class="">
          <vee-field v-slot="{ field, errors }" name="image">
            <input type="file" class="" v-bind="field" name="image" />
            <div :key="error" v-for="error in errors">
              <span>{{ error }}</span>
            </div>
          </vee-field>
        </div>
        <!--Name -->
        <div class="mb-1">
          <label class="block ml-[8.2%] mb-2 text-start">Name :</label>
          <vee-field v-slot="{ field, errors }" name="name">
            <input
              name="name"
              v-bind="field"
              @change="validateNameRegister($event)"
              class="border outline-input-color border-2 w-5/6 h-9 pl-5 rounded border-input-color"
              :class="{
                'border-green-500 outline-green-500':
                  inputValidation.name.isValid === true,
                'border-red-500 outline-red-500':
                  inputValidation.name.isValid === false,
              }"
              type="text"
              placeholder="Enter your name"
            />
            <div
              class="mt-2 text-start ml-[8.2%]"
              v-for="error in errors"
              :key="error"
            >
              <span class="text-red-500">{{ error }}</span>
            </div>
          </vee-field>
        </div>
        <!--Email-->
        <div class="">
          <label class="block ml-[8.2%] mb-2 text-start">Email :</label>
          <vee-field v-slot="{ field, errors }" name="email">
            <input
              name="email"
              v-bind="field"
              @change="validateEmailRegister($event)"
              class="border outline-input-color border-2 w-5/6 h-9 pl-5 rounded border-input-color"
              :class="{
                'border-green-500 outline-green-500':
                  inputValidation.email.isValid === true,
                'border-red-500 outline-red-500':
                  inputValidation.email.isValid === false,
              }"
              type="email"
              placeholder="Enter your email"
            />
            <div
              class="mt-2 text-start ml-[8.2%]"
              v-for="error in errors"
              :key="error"
            >
              <span class="text-red-500">{{ error }}</span>
            </div>
            <div
              class="mt-3 text-start ml-[8.2%]"
              v-if="inputValidation.email.isValid === true"
            >
              <span class="text-green-500">{{
                inputValidation.email.message
              }}</span>
            </div>
          </vee-field>
        </div>
        <!--Password-->
        <div class="">
          <label class="block ml-[8.2%] mb-2 mt-2 text-start">Password :</label>
          <vee-field v-slot="{ field, errors }" name="password">
            <input
              name="password"
              v-bind="field"
              @change="validatePasswordRegister($event)"
              class="border outline-input-color border-2 w-5/6 h-9 pl-5 rounded border-input-color"
              :class="{
                'border-green-500 outline-green-500':
                  inputValidation.password.isValid === true,
                'border-red-500 outline-red-500':
                  inputValidation.password.isValid === false,
              }"
              type="password"
              placeholder="Enter password"
            />
            <div
              class="mt-2 text-start ml-[8.2%]"
              v-for="error in errors"
              :key="error"
            >
              <span class="text-red-500">{{ error }}</span>
            </div>
          </vee-field>
        </div>
        <!--confirm Password-->
        <div class="">
          <label class="block ml-[8.2%] mb-2 mt-2 text-start"
            >confirm password :</label
          >
          <vee-field v-slot="{ field, errors }" name="confirm_password">
            <input
              @change="validateConfirmPassRegister($event, password)"
              :class="{
                'border-green-500 outline-green-500':
                  inputValidation.confirmPassword.isValid === true,
                'border-red-500 outline-red-500':
                  inputValidation.confirmPassword.isValid === false,
              }"
              name="confirm_password"
              v-bind="field"
              class="border outline-input-color border-2 w-5/6 h-9 pl-5 rounded border-input-color"
              type="password"
              placeholder="Enter password"
            />
            <div
              class="mt-2 text-start ml-[8.2%]"
              v-for="error in errors"
              :key="error"
            >
              <span class="text-red-500">{{ error }}</span>
            </div>
          </vee-field>
          <div class="pt-2">
            <div>
              <input v-if="isLoading === false"
                class="bg-main-color cursor-pointer rounded font-bold text-white h-[35px] w-[120px]"
                type="submit"
                value="signup"
              />
              <button v-if="isLoading === true"
                     class="bg-main-color cursor-pointer rounded font-bold text-white h-[35px] w-[120px]"
              >
                <i class="fa-solid fa-spinner-third"></i>

              </button>
            </div>
          </div>
        </div>
      </vee-form>
    </div>
  </div>
</template>

<style>
.fade-enter-from {
  opacity: 0;
}

.fade-enter-to {
  opacity: 1;
  transition: all 1s ease;
}
</style>

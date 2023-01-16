<script>
import { useHiddenStore } from "@/stores/hidden.js";
import { mapState, mapWritableState } from "pinia";

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
          pass:'',
          isValid: null,
        },
      },
    };
  },
  computed: {
    ...mapState(useHiddenStore, ["isHidden"]),
    ...mapWritableState(useHiddenStore, ["isHidden"]),
  },
  methods: {
    toggleTab(argument) {
      this.$emit("change-tab", argument);
    },
    validateEmailRegister(e) {
      // if the field is empty
      if (e.target.value == null || e.target.value == "") {
        this.inputValidation.email.isValid = false;
        console.log(this.email.isValid);
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
        this.inputValidation.confirmPassword.pass = e.target.value
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
    class="bg-white absolute right-0 left-0 bottom-0 top-0 rounded ml-auto mr-auto w-4/5 h-fit pb-6"
    :class="{
      'w-[50%] mt-32': tab === 'Login',
      ' mt-14': tab === 'Register',
    }"
  >
    <div class="w-full ml-[95%] pt-[1%]">
      <span
        @click="isHidden = !isHidden"
        class="font-bold text-black cursor-pointer hover:text-main-color"
        >X
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
      <div class="w-[80%] ml-auto mr-auto h-fit text-center pt-3">
        <!--Login-->
        <vee-form v-show="tab === 'Login'" :validation-schema="schema">
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
              <div class="text-start" :key="error" v-for="error in errors">
                <span class="text-red-500">{{ error }}</span>
              </div>
            </vee-field>
          </div>

          <!--password-->
          <div>
            <label class="block ml-[8.2%] mb-2 mt-2 text-start"
              >Password :</label
            >
            <vee-field name="password">
              <input
                class="border outline-blue-600 border-2 h-9 w-5/6 text-black pl-5 focus:border-green-500 rounded border-input-color"
                name="password"
                type="password"
                placeholder="Enter your password"
              />
            </vee-field>
          </div>
          <!--Submit-->
          <div class="w-full mt-4">
            <div class="w-2/5 mr-auto ml-auto">
              <input
                class="bg-main-color ring-button-color hover:ring-2 cursor-pointer w-28 text-white py-1.5 px-3 rounded"
                type="submit"
                value="Login"
              />
            </div>
          </div>
        </vee-form>
        <div v-show="tab === 'Login'" class="mt-2 w-full text-center">
          <a>Forget your passowrd ?</a>
        </div>
      </div>
    </div>
    <div class="w-full text-center">
      <!--Register-->
      <vee-form v-show="tab === 'Register'" :validation-schema="schemaRegister">
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
              @change="validateConfirmPassRegister($event,password)"
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
        </div>
      </vee-form>
    </div>
  </div>
</template>

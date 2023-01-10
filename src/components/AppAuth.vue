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
      schema: {},
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
  },
};
</script>

<template>
  <!--Auth Login & Register-->
  <div
    class="absolute opacity-75 bg-black w-full h-full bottom-0"
    v-show="isHidden === true"
  >
    <div
      class="bg-white rounded ml-auto mr-auto w-2/6"
      :class="{
        'h-3/5	mt-32': tab === 'Login',
        'h-5/6 mt-14': tab === 'Register',
      }"
    >
      <span
        @click="isHidden = !isHidden"
        class="text-2xl font-bold text-black cursor-pointer hover:text-main-color"
        >X
      </span>

      <div class="text-center mb-7 mt-6">
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
      <div class="w-full ml-[5%]">
        <!--Login-->
        <vee-form v-show="tab === 'Login'">
          <!--email-->
          <div>
            <label class="block mb-3">Email :</label>
            <vee-field name="email">
              <input
                name="email"
                class="border hover:outline-green-500 border-2 w-5/6 h-9 pl-5 rounded border-input-color"
                type="text"
                placeholder="Enter your email"
              />
            </vee-field>
          </div>
          <!--password-->
          <div>
            <label class="block mb-3 mt-3">Password :</label>
            <vee-field name="password">
              <input
                class="border hover:outline-green-500	 border-2 h-9 w-5/6 text-black pl-5 focus:border-green-500 rounded border-input-color"
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
                class="bg-main-color ring-button-color hover:ring-2  cursor-pointer w-28 text-white py-1.5 px-3 rounded"
                type="submit"
                value="Login"
              />
            </div>
          </div>
        </vee-form>
        <div class="mt-2 w-full text-center">
          <a>Forget your passowrd ?</a>
        </div>
      </div>
      <!--Register-->
      <vee-form v-show="tab === 'Register'">
        <div>
          <label>email</label>
          <vee-field name="email" type="text" placeholder="Enter your email" />
        </div>
        <div>
          <label>Password</label>
          <vee-field
            name="password"
            type="password"
            placeholder="Enter your password"
          />
        </div>
      </vee-form>
    </div>
  </div>
</template>

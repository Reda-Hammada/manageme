<script>
import AppSideNav from "@/components/dashboard/AppSideNav.vue";
import AppNav from "@/components/dashboard/AppNav.vue";
import AppUserForm from "@/components/dashboard/AppUserForm.vue";

export default {
  name: "AppSetting",
  components: {
    AppSideNav,
    AppNav,
    AppUserForm,
  },
  data() {
    return {
      userInfoMsg: null,
      isUserInfoMsg: false,
      msgColor: "",
    };
  },
  methods: {
    getMsgAndStatus(msg, status) {
      if (status === 200) {
        this.userInfoMsg = msg;
        this.msgColor = "green";
        this.isUserInfoMsg = true;
        setTimeout(() => {
          this.isUserInfoMsg = false;
        }, 4000);
      }
      if (status === 401) {
        this.userInfoMsg = msg;
        this.msgColor = "red";
        this.isUserInfoMsg = true;
      }
    },
  },
};
</script>

<template>
  <!-- Ultimate container -->
  <div class="flex flex-row bg-bg-color">
    <!--Message-->
    <transition name="slide">
      <div
        v-if="isUserInfoMsg === true"
        class="absolute mt-[5%] rounded ml-[80%] text-center text-white pt-2 pb-1 mt-[2%] bg-gray-500 w-[250px] h-[90px]"
      >
        {{ userInfoMsg }}
        <transition name="slide-line">
          <span></span>
        </transition>
      </div>
    </transition>
    <!--Message-->
    <!-- Navbar-->
    <app-side-nav class="bg-white w-[20vw] border-r-2 h-[100vh]">
      <!-- Slot for setting component only-->
      <template v-slot:settingSideNavSlot> </template>
    </app-side-nav>

    <div class="flex flex-col">
      <!-- side navbar-->
      <app-nav class="bg-white w-[85vw] border-b-2"> </app-nav>
      <div class="w-full overflow-auto h-[100vh]">
        <app-user-form @msg="getMsgAndStatus"></app-user-form>
      </div>
    </div>
  </div>
  <!-- Ultimate container -->
</template>
<style>
.slide-enter-from {
  transform: translateX(400px);
}

.slide-enter-active {
  transition: transform 0.25s ease-in;
}

.slide-leave-from {
  opacity: 1;
  transform: translateX(-400px);
}

.slide-leave-active {
  transition: all 0.25s linear;
}
.slide-leave-to {
  transform: translateX(0px);
  opacity: 0;
}
</style>

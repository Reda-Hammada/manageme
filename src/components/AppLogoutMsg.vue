<script>
import { useAuthStore } from "../stores/auth";
import { mapWritableState } from "pinia";
export default {
  name: "AppLogoutMsg",
  computed: {
    ...mapWritableState(useAuthStore, ["loggedOutMsg"]),
  },
  mounted() {
    setTimeout(() => {
      this.loggedOutMsg = "";
    }, 7000);
  },
};
</script>
<template>
  <div>
    <transition name="slide">
      <div
        v-if="loggedOutMsg"
        class="absolute rounded ml-[80%] text-center text-white font-bold pt-2 pb-1 mt-[1%] bg-green-500 w-[290px] h-[90px]"
      >
        {{ loggedOutMsg }}
      </div>
    </transition>
  </div>
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

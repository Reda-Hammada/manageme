<script>
import AppSideNav from "@/components/dashboard/AppSideNav.vue";
import AppNav from "./AppNav.vue";

export default {
  name: "AppSetting",
  components: {
    AppSideNav,
    AppNav,
  },
};
</script>

<template>
  <app-nav class="w-full bg-white "> </app-nav>
  <app-side-nav class="bg-white h-[100vh] w-[20%]">
    <template v-slot:settingSideNavSlot>
        
    </template>
  </app-side-nav>
</template>

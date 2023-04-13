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
};
</script>

<template>
  <!-- Ultimate container -->
  <div class="flex flex-col bg-bg-color">
    <!-- Navbar-->
    <app-nav class=" bg-white w-[100vw] border-b-2"> 

    </app-nav>

    <div class="flex flex-row">
      <!-- side navbar-->
      <app-side-nav class="bg-white w-[20vw] border-r-2 h-[100vh] ">
        <!-- Slot for setting component only-->
        <template v-slot:settingSideNavSlot> 
             
        </template>
      </app-side-nav>
      <div class="w-full">
        <app-user-form>

        </app-user-form>
      </div>
    </div>
  </div>
  <!-- Ultimate container -->
</template>

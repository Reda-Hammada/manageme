<script>
import { useHiddenStore } from "@/stores/hidden.js";
import { mapWritableState } from "pinia";
export default {
  name: "AppHero",

  computed: {
    ...mapWritableState(useHiddenStore, ["isHidden"]),
  },
  methods: {
    openForm() {
      this.isHidden = true;
    },
  },
};
</script>
<template>
  <section class="flex mt-24">
    <div class="w-[40%] ml-12 mt-16">
      <h1 class="font-bold text-main-color text-3xl">
        Manage your tasks effortlessly and effectively
      </h1>
      <p class="text-xl mt-4 text-start w-full">
        Manage me is an application that simplifies tasks management and offers
        multiple boards creation with life time access .
      </p>
      <div>
        <button
          class="bg-button-color mt-6 text-white rounded font-bold w-[120px] h-[40px]"
          @click="openForm"
        >
          Get Started
        </button>
      </div>
    </div>
    <div class="w-[60%] ml-12">
      <img
        src="../assets/images/illustrator.png"
        alt="illustrator for someone using the computer describe tasks management"
      />
    </div>
  </section>
</template>
<style></style>

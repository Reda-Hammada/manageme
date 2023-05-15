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
  <div class="flex justify-evenly mt-24 w-full hero-container">
    <div class="w-[100%] ml-[5%] mt-16 intro-container">
      <h1 class="font-bold text-main-color text-3xl">
        Manage your tasks effortlessly and effectively
      </h1>
      <p class="text-xl mt-4 text-start">
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
    <div class="w-[100%] image-container">
      <img
        src="../assets/images/illustrator.png"
        alt="illustrator for someone using the computer describe tasks management"
      />
    </div>
  </div>
</template>
<style>
@media (max-width: 576px) {
  /* CSS rules here */

  .hero-container {
    width: 100%;
    flex-direction: column-reverse;
  }

  .intro-container {
    width: 100%;
    text-align: center;
  }
  .intro-container h1 {
    margin-right: 6%;
  }
  .intro-container p {
    text-align: center;
    margin-right: 6%;
  }

  .image-container {
    width: 100%;
  }
}
@media (min-width: 576px) and (max-width: 768px) {
  /* CSS rules here */
  .hero-container {
    width: 100%;
    flex-direction: column-reverse;
    text-align: center;
  }

  .intro-container {
    width: 100%;
    text-align: center;
  }
  .intro-container h1 {
    margin-right: 6%;
  }
  .intro-container p {
    text-align: center;
    margin-right: 6%;
  }

  .image-container {
    width: 100%;
  }
}
@media (min-width: 768px) and (max-width: 992px) {
  /* CSS rules here */
  .hero-container {
    width: 100%;
    flex-direction: column-reverse;
  }

  .intro-container {
    width: 100%;
    text-align: center;
  }
  .intro-container h1 {
    margin-right: 6%;
  }
  .intro-container p {
    text-align: center;
    margin-right: 6%;
  }

  .image-container {
    width: 100%;
    text-align: center;
  }
}
@media (min-width: 992px) and (max-width: 1200px) {
  /* CSS rules here */
}
</style>

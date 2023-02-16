<script>
import AppAvatar from "@/components/AppAvatar.vue";
export default {
  name: "AppTestimony",
  components: {
    AppAvatar,
  },
  data() {
    return {
      slides: [
        {
          img: "@/assets/images/phases.png",
          text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quaerat officia ipsum distinctio ut esse ratione nobis amet voluptate aperiam quam? Sed libero aliquam commodi nesciunt?",
          person: 1,
        },
        {
          img: "@/src/assets/images/tasks.png",
          text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quaerat officia ipsum distinctio ut esse ratione nobis amet voluptate aperiam quam? Sed libero aliquam commodi nesciunt?",
          person: 2,
        },
        {
          img: "@/assets/images/boards.png",
          text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quaerat officia ipsum distinctio ut esse ratione nobis amet voluptate aperiam quam? Sed libero aliquam commodi nesciunt?",
          person: 3,
        },
      ],
      currentSlide: 0,
      intervalId: null,
    };
  },
  mounted() {
    this.intervalId = setInterval(this.playSlides, 3000);
  },
  beforeDestroy() {
    clearInterval(this.intervalId);
  },
  methods: {
    playSlides() {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    },
  },
};
</script>
<template>
  <section class="w-full mb-12 mt-12">
    <div class="text-center mt-6">
      <h2 class="text-main-color font-bold text-2xl">
        What people say about us
      </h2>
    </div>
    <!--Slider-->

    <div class="w-full">
      <div class="w-[80%] mr-auto ml-auto">
        <transition-group name="fade" mode="in-out">
          <div
            v-for="(slide, index) in slides"
            :key="index"
            v-show="currentSlide === index"
            class="w-[40%] mr-auto ml-auto pb-12 mt-6 bg-white rounded"
          >
            <div class="w-full">
              <app-avatar :image="slide.img"></app-avatar>
            </div>
            <div class="text-center">
              <p class="pl-32 pr-32 pb-5">
                {{ slide.text }}
              </p>
              <p>
                {{ slide.person }}
              </p>
            </div>
          </div>
        </transition-group>
      </div>
    </div>
  </section>
</template>

<style>
/*
.fade-enter-form {
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 1s linear;
}

.fade-leave-from {
  opacity: 1;
}
.fade-leave-to {
  opacity: 0;
}

*/

.fade-enter-from {
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}
.fade-enter-active {
  transition: opacity 1s linear;
}

.fade-leave-active {
  display: none;
  transition:display 0.5s linear ;
}

.fade-leave-to {
  opacity: 0;
}

.fade-move {
  transition: opacity 1s linear;
}
</style>

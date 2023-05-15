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
          img: "../src/assets/images/person1.jpg",
          text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quaerat officia ipsum distinctio ut esse ratione nobis amet voluptate aperiam quam? Sed libero aliquam commodi nesciunt?",
          person: "Müller -CTO",
        },
        {
          img: "../src/assets/images/person2.jpg",
          text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quaerat officia ipsum distinctio ut esse ratione nobis amet voluptate aperiam quam? Sed libero aliquam commodi nesciunt?",
          person: "Jenna -CEO",
        },
        {
          img: "../src/assets/images/person3.jpg",
          text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quaerat officia ipsum distinctio ut esse ratione nobis amet voluptate aperiam quam? Sed libero aliquam commodi nesciunt?",
          person: "Mark -Founder",
        },
      ],
      currentSlide: 0,
      selected: 0,
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
    assignCheckedSlide() {
      clearInterval(this.intervalId);
      this.currentSlide = this.selected % this.slides.length;
    },
  },
  watch: {
    selected(oldValue, newValue) {
      if (oldValue !== newValue) {
        this.assignCheckedSlide();
      }
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

    <div class="slider-ultimate-container w-full">
      <div class="slider-container mr-auto ml-auto">
        <transition-group name="fade" mode="in-out">
          <div
            v-for="(slide, index) in slides"
            :key="index"
            v-show="currentSlide === index"
            class="slider mr-auto ml-auto pb-12 mt-6 bg-white rounded"
          >
            <div class="slider-content-container">
              <app-avatar :image="slide.img"></app-avatar>
            </div>
            <div class="text-center paragraph-slider-container">
              <p class="">
                {{ slide.text }}
              </p>
              <p class="text-main-color font-bold">
                {{ slide.person }}
              </p>
            </div>
          </div>
        </transition-group>
        <div class="dots-ultimate-container mr-auto mt-5 ml-auto">
          <div class="dots-container mr-auto ml-auto">
            <input type="radio" class="mr-6" value="0" v-model="selected" />
            <input type="radio" class="mr-6" value="1" v-model="selected" />
            <input type="radio" value="2" class="mr-6" v-model="selected" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
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
  transition: display 0.5s linear;
}

.fade-leave-to {
  opacity: 0;
}

.fade-move {
  transition: opacity 1s linear;
}

/* response */
@media (max-width: 576px) {
  /* CSS rules here */
  .dots-ultimate-container {
    width: 90%;
  }
  .dots-container {
    width: 50%;
    text-align: center;
    margin-right: auto;
    margin-left: auto;
  }
  .slider-container {
    width: 100%;
  }
  .slider {
    width: 90%;
  }
  .slider-content-container {
    width: 100%;
  }

  .paragraph-slider-container {
    width: 100%;
  }
}
@media (min-width: 576px) and (max-width: 768px) {
  .dots-ultimate-container {
    width: 90%;
  }
  .dots-container {
    width: 50%;
    text-align: center;
    margin-right: auto;
    margin-left: auto;
  }
  .slider-container {
    width: 100%;
  }
  .slider {
    width: 90%;
  }
  .slider-content-container {
    width: 100%;
  }

  .paragraph-slider-container {
    width: 100%;
    padding-left: 2%;
    padding-right: 2%;
  }
}
@media (min-width: 768px) and (max-width: 992px) {
  /* CSS rules here */
  .dots-ultimate-container {
    width: 90%;
  }
  .dots-container {
    width: 50%;
    text-align: center;
    margin-right: auto;
    margin-left: auto;
  }
  .slider-container {
    width: 100%;
  }
  .slider {
    width: 90%;
  }
  .slider-content-container {
    width: 100%;
  }

  .paragraph-slider-container {
    width: 100%;
  }
}


@media (min-width: 992px) and (max-width: 1200px) {
  /* CSS rules here */
  .dots-ultimate-container {
    width: 90%;
  }
  .dots-container {
    width: 50%;
    text-align: center;
    margin-right: auto;
    margin-left: auto;
  }

  .slider-container {
    width: 100%;
  }
  .slider {
    width: 90%;
  }
  .slider-content-container {
    width: 100%;
  }

  .paragraph-slider-container {
    width: 100%;
  }
}

@media (min-width: 1200px) {
  .dots-ultimate-container {
    width: 90%;
  }
  .dots-container {
    width: 50%;
    text-align: center;
    margin-right: auto;
    margin-left: auto;
  }

  .slider-container {
    width: 100%;
  }
  .slider {
    width: 40%;
  }
  .slider-content-container {
    width: 100%;
  }

  .paragraph-slider-container {
    width: 100%;
  }
}

</style>

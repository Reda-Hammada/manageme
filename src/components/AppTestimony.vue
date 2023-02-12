<script>
import AppAvatar from "@/components/AppAvatar.vue";
export default {
  name: "AppTestimony",
  components: {
    AppAvatar,
  },
  data(){
    return{
      slides:[
        {
          img:'../assets/images/phases.png',
          text:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quaerat officia ipsum distinctio ut esse ratione nobis amet voluptate aperiam quam? Sed libero aliquam commodi nesciunt?",
          person:1
        },
        {
          img:'../assets/images/tasks.png',
          text:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quaerat officia ipsum distinctio ut esse ratione nobis amet voluptate aperiam quam? Sed libero aliquam commodi nesciunt?",
          person:2
        },
        {
          img:'../assets/images/boards.png',
          text:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quaerat officia ipsum distinctio ut esse ratione nobis amet voluptate aperiam quam? Sed libero aliquam commodi nesciunt?",
          person:3
        },
      ],
      currentSlide:0,
      intervalId:null
    }
  },
  mounted() {
    this.intervalId = setInterval(this.nextSlide, 2000)
  },
  beforeDestroy() {
    clearInterval(this.intervalId)
  },
  methods:{
      nextSlide(){
          this.currentSlide = (this.currentSlide + 1) % this.slides.length
      }
  }
};
</script>
<template>
  <section class="w-full mb-12 mt-12   ">
    <div class="text-center mt-6 ">
      <h2 class="text-main-color font-bold text-2xl">What people say about us </h2>
    </div>
     <!--Slider-->

      <div class="flex w-[500px] mr-auto ml-auto h-[300px]  overflow-hidden  justify-center">
        <div v-for="(slide, index) in slides" :key="index" 
        class="w-full h-full pb-12 mt-6 bg-white rounded  mr-auto ml-auto"
        :style="{ transform: `translateX(-${250 * currentSlide}%)` }">
        <transition-group name="slide">

          <div class="w-full">
            <app-avatar :image="slide.img"></app-avatar>
          </div>
          <div>
            <p class="pl-32 pr-32">
              {{ slide.text }}
            </p>
            <p>
              {{ slide.person }}
            </p>
          </div>
        </transition-group>

        </div>
      </div>

  
  </section>
</template>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: opacity 1s;
}

.slide-enter,
.slide-leave-to {
  opacity: 0;
}


</style>

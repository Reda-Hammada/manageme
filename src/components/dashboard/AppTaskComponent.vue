<script>
export default {
  name: "AppTaskComponent",
  props: {
    Task: {
      type: String,
      required: true,
    },
  },


};
</script>
<template>
  <div class=" ">
    <div class="text-center mt-5 bg-white font-bold pt-8 mb-5 w-[100%] h-[100px]">
        {{ Task }}
    </div>
  </div>
</template>

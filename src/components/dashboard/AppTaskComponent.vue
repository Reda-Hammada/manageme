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
  <div
    class="text-start pl-2 bg-color  mr-auto ml-auto pt-2 bg-bg-color mb-5 w-[90%] h-[40px]"
  >
    {{ Task }}
  </div>
</template>

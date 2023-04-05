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
    class="text-start pl-2 pb-3 bg-color  mr-auto ml-auto pt-3 bg-bg-color mb-5 w-[90%] h-fit"
  >
    {{ Task }}
  </div>
</template>
v   
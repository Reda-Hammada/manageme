<script>
import AppAvatar from "@/components/AppAvatar.vue";
export default {
  name: "AppTestimony",
  components: {
    AppAvatar,
  },
};
</script>
<template>
  <section>
    <div>
      <app-avatar :image="'../assets/images/illustrator.png'"></app-avatar>
      <div>
        <h2>What people say about us:</h2>
      </div>
      <div>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quaerat
          officia ipsum distinctio ut esse ratione nobis amet voluptate aperiam
          quam? Sed libero aliquam commodi nesciunt?
        </p>
      </div>
    </div>
  </section>
</template>

<style></style>

<script>
export default {
  name: "AppAbout",
};
</script>

<template>
  <section class="about-ultimate-container bg-white pb-12 w-full">
    <div class="about-container mr-auto ml-auto text-center">
      <h2 class="text-2xl font-bold text-main-color">About us</h2>
      <div class="text-center mr-auto ml-auto">
        <p class="text-xl mt-3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </div>
  </section>
</template>

<style>
@media (max-width: 576px) {
  .about-ultimate-container {
    width: 100%;
    margin-top: 10%;
  }
  .about-container {
    width: 80%;
    padding-top: 2%;

  }
}

@media (min-width: 576px) and (max-width: 768px) {
  .about-ultimate-container {
    width: 80%;
    margin-top: 10%;
  }
  .about-container {
    width: 60%;
    padding-top: 2%;

  }
}

@media (min-width: 992px) and (max-width: 1200px) {
  .about-ultimate-container {
    width: 80%;
    margin-top: 10%;
  }
  .about-container {
    width: 60%;
    padding-top: 2%;
  }
}

@media (min-width: 1200px) {
  .about-ultimate-container {
    width: 80%;
    margin-top: 10%;
  }
  .about-container {
    width: 60%;
    padding-top: 2%;
  }
}
</style>

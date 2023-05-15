<script>
export default {
  name: "AppWhy",
};
</script>

<template>
  <!--Why to choose manage me section-->
  <section class="w-full mt-28 mb-12 why-ultimate-container">
    <div class="w-[80%] mr-auto ml-auto">
      <div class="text-center mt-6">
        <h2 class="font-bold text-main-color text-2xl">
          Why to choose Manageme
        </h2>
      </div>
      <div class="text-center mt-3 text-xl">
        <p>With Manageme you can manage your projects and tasks effortlessly</p>
      </div>
    </div>
    <div class="features-container flex justify-between mr-auto ml-auto mt-12">
      <div class="boards-container">
        <div class="text-center h-[300px] rounded pt-6 pl-3 pr-3 bg-white">
          <h3 class="pb-5 text-main-color font-bold text-xl">
            Multiple boards
          </h3>
          <div class="w-[30%] mb-3 mr-auto ml-auto">
            <div class="text-center">
              <img src="../assets/images/boards.png" alt="subtasks icon" />
            </div>
          </div>
          <p class="text-xl">
            Manageme provides multiple boards to manage your various projects in
            one dashboard
          </p>
        </div>
      </div>
      <div class="phases-container">
        <div class="text-center h-[300px] rounded pt-5 pl-3 pr-3 bg-white">
          <h3 class="pb-5 text-main-color font-bold text-xl">
            Multiple task phases
          </h3>
          <div class="w-[30%] mb-3 mr-auto ml-auto">
            <div class="">
              <img src="../assets/images/phases.png" alt="subtasks icon" />
            </div>
          </div>
          <p class="text-xl">
            you can create your own custom task management phases
          </p>
        </div>
      </div>
      <div class="subtask-container">
        <div class="text-center h-[300px] rounded pt-5 pl-3 pr-3 bg-white">
          <h3 class="pb-5 text-main-color font-bold text-xl">
            Each task can have subtasks
          </h3>
          <div class="w-[30%] mb-3 mr-auto ml-auto">
            <div class="text-center">
              <img src="../assets/images/tasks.png" alt="subtasks icon" />
            </div>
          </div>
          <p class="text-xl">
            you can create multiple subtasks for your tasks for a better project
            management
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
@media (max-width: 576px) {
  /* CSS rules here */

  .why-ultimate-container {
    margin-top: 10%;
    width: 100%;
  }
  .features-container {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .boards-container {
    width: 90%;
    margin: auto;
    height: fit-content;
    padding-top: 2%;
    padding-bottom: 5%;
  }
  .phases-container {
    width: 90%;
    margin: auto;
    height: fit-content;
    padding-top: 2%;
    padding-bottom: 5%;
  }
  .subtask-container {
    width: 90%;
    margin: auto;
    height: fit-content;
    padding-top: 2%;
    padding-bottom: 5%;
  }
}

@media (min-width: 576px) and (max-width: 768px) {
  /* CSS rules here */

  .why-ultimate-container {
    margin-top: 10%;
    width: 100%;
    height: fit-content;
  }
  .features-container {
    width: 100%;
    flex-direction: column;
  }
  .boards-container {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 12%;
  }
  .phases-container {
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 12%;
  }
  .subtask-container {
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 12%;
  }
}
@media (min-width: 768px) and (max-width: 992px) {
  /* CSS rules here */
  .why-ultimate-container {
    width: 100%;
  }
  .features-container {
    width: 100%;
    flex-direction: column;

  }
  .boards-container {
    width: 50%;
    margin: auto;
    margin-bottom: 5%;
  }
  .phases-container {
    width: 50%;
    margin: auto;
    margin-bottom: 5%;
  }
  .subtask-container {
    width: 50%;
    margin: auto;
  }
}

@media (min-width: 992px) and (max-width: 1200px) {
  /* CSS rules here */
  .why-ultimate-container {
    width: 100%;
  }
  .features-container {
    width: 100%;
  }
  .boards-container {
    width: 25%;
    margin: auto;
  }
  .phases-container {
    width: 25%;
    margin: auto;
  }
  .subtask-container {
    width: 25%;
    margin: auto;
  }
}
@media (min-width: 1200px) {
  /* CSS rules here */
  .why-ultimate-container {
    width: 100%;
  }
  .features-container {
    width: 100%;
  }
  .boards-container {
    width: 25%;
    margin: auto;
  }
  .phases-container {
    width: 25%;
    margin: auto;
  }
  .subtask-container {
    width: 25%;
    margin: auto;
  }
}
</style>

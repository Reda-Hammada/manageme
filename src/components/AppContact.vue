<script>
export default {
  name: "AppContact",
  data() {
    return {
      contactSchema: {
        fullname: "required",
        email: "required|email",
        subject: "required",
        message: "required",
      },
    };
  },
};
</script>
<template>
  <section class="w-full pt-6 pb-0 bg-white">
    <div class="dropus-container text-center m-auto">
      <h3 class="text-main-color mb-3 text-2xl font-bold">Drop us a message</h3>
      <div class="dropus-paragraph-container mr-auto ml-auto text-xl">
        <p class="">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam erat
          libero, bibendum in libero tempor, luctus volutpat ligula. Integer
          fringilla porttitor pretium.
        </p>
      </div>
    </div>
    <div class="contactus-form-ultimate-container mr-auto ml-auto">
      <div class="mt-5 text-center">
        <div class="form-container">
          <vee-form :validation-schema="contactSchema">
            <div class="w-full">
              <!--full name-->
              <vee-field name="fullname" v-slot="{ field, errors }">
                <input
                  class="border-4 w-[400px] h-[40px] rounded-b-lg pl-2"
                  type="text"
                  v-bind="field"
                  name="full name"
                  placeholder="fullname"
                />
                <!--error fullname-->
                <div v-for="error in errors" :key="error">
                  <span class="text-start text-red-500">{{ error }}</span>
                </div>
              </vee-field>
            </div>
            <!--email-->
            <div>
              <vee-field v-slot="{ field, errors }" name="email">
                <input
                  type="email"
                  class="h-[40px] border-4 mt-5 w-[400px] rounded-b-lg pl-2"
                  name="email"
                  placeholder="Email"
                  v-bind="field"
                />
                <!--email error-->
                <div v-for="error in errors" :key="error">
                  <span class="text-red-500">{{ error }}</span>
                </div>
              </vee-field>
            </div>
            <!--subject-->
            <div>
              <vee-field v-slot="{ field, errors }" name="subject">
                <input
                  type="text"
                  class="h-[40px] border-4 mt-5 w-[400px] rounded-b-lg pl-2"
                  name="subject"
                  placeholder="subject"
                  v-bind="field"
                />
                <!--subject Errors-->
                <div v-for="error in errors" :key="error">
                  <span class="text-red-500">{{ error }}</span>
                </div>
              </vee-field>
            </div>
            <!--message-->
            <div>
              <vee-field name="message" v-slot="{ field, errors }">
                <textarea
                  name="message"
                  placeholder="Message"
                  class="h-200 resize-none border-4 mt-5 w-[400px] rounded-b-lg pl-2"
                  v-bind="field"
                >
                </textarea>
                <!--message errors-->
                <div v-for="error in errors" :key="error">
                  <span class="text-red-500">{{ error }}</span>
                </div>
              </vee-field>
            </div>
            <div class="mt-3 pb-5">
              <div>
                <input
                  class="bg-main-color h-[35px] cursor-pointer text-bold text-white rounded-b-lg w-[170px]"
                  type="submit"
                  value="Send message"
                />
              </div>
            </div>
          </vee-form>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
@media (min-width: 1200px) {
  .dropus-paragraph-container {
    width: 60%;
  }
}
</style>

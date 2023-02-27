import axios from "axios";
<script>
  export default{ 
    name:'AppNav',
    
  data(){
    return{
      userImage:JSON.parse(localStorage.userData),
      isClicked:false,
    }
  },
  methods:{
    logOut() {
      localStorage.removeItem("user_token");
      localStorage.removeItem("userData");
      this.$router.push({ name: "Home" });
    },
    toggleSettingContainer(){
      this.isClicked = !this.isClicked;
    }
  }
  }
</script>

<template>
    <div>
       <header>
        <nav class="flex justify-between ">
            <div class="w-[60%]">
                <h1 class="font-bold   pt-2 pl-2 text-2xl">Dashboard:</h1>
            </div>
            <div class="w-[30%] cursor-pointer">
              <div @click="toggleSettingContainer"
                   class="w-[13%] mr-auto ml-auto mt-1">
                  <img  class="rounded-full"
                        src='../../assets/images/person1.jpg'
                        alt="user image"/> 
              </div>
            </div>
            <div  v-show="isClicked === true"
                  class=" absolute right-[11.2%]  mt-[4.4%] w-[2%] h-[30px] bg-white border border-hidden origin-center rotate-45"></div>
            <div  v-show="isClicked  === true"
                  class="absolute mt-[4.5%]  rounded-lg bg-white right-[7%] w-[10%] h-[120px]">
              <div class="text-center w-full pt-5">
                  <a class="font-bold  text-lg text-main-color ">
                    settings
                  </a>
                  <div class="mt-3">
                    <button class="bg-main-color text-white font-bold w-[120px] h-[30px] rounded-full"
                          v-on:click="logOut">
                     Log out
                  </button>
                  </div>
              </div>
            </div>
        </nav>
        
       </header>
    </div>
</template>
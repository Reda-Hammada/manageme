import axios from "axios";
<script>
  export default{ 
    name:'AppNav',
    
  data(){
    return{

    }
  },
  methods:{
    logOut() {
      localStorage.removeItem("user_token");
      localStorage.removeItem("userData");
      this.$router.push({ name: "Home" });
    },
  }
  }
</script>

<template>
    <div>
       <header>
        <nav class="flex justify-between ">
            <div>
                <h1 class="font-bold   pt-2 pl-2 text-2xl">Dashboard:</h1>
            </div>
            <div>
              <button class="bg-main-color mr-12 mt-2 text-white font-bold w-[120px] h-[30px] rounded-full"
                      v-on:click="logOut">
                 Log out
              </button>
            </div>
        </nav>
       </header>
    </div>
</template>
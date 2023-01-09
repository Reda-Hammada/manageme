<script>
  import AppHeader from '@/components/AppHeader.vue';
  import AppAuth from '@/components/AppAuth.vue';

  export default {
    name:"App",
    components:{
     AppHeader,
     AppAuth,
     },


     data(){
      return {
        tab:'Login'
      }
     },
     methods:{
       changeTab(argument){
        
         switch(argument){
          case 'logIn':
            this.tab = 'Login'
            break;
          case 'signUp':
            this.tab = 'Register'
            break;
          default:
            this.tab = 'Login'
            break;
        
         }
       }
     }
  }
</script>

<template>
  <app-header @change-tab="changeTab" :tab="tab"></app-header>
  <app-auth  :tab='tab'></app-auth>
</template>
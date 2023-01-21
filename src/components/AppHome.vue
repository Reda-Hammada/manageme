<script>
  import AppHeader from '@/components/AppHeader.vue';
  import AppAuth from '@/components/AppAuth.vue';
  import AppHero from './AppHero.vue';

  export default {
    name:"AppHome",
    components:{
     AppHeader,
     AppAuth,
     AppHero,
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
  <app-auth @change-tab="changeTab" :tab='tab'></app-auth>
  <app-hero></app-hero>
</template>
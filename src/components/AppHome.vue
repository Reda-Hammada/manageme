<script>
  import AppHeader from '@/components/AppHeader.vue';
  import AppAuth from '@/components/AppAuth.vue';
  import AppHero from './AppHero.vue';
  import AppWhy from '@/components/AppWhy.vue'
  import AppAbout from '@/components/AppAbout.vue';

  export default {
    name:"AppHome",
    components:{
     AppHeader,
     AppAuth,
     AppHero,
     AppWhy,
     AppAbout
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
  <app-why></app-why>
  <app-about></app-about>
</template>
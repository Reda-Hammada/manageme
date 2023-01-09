<script>
 import {useHiddenStore} from '@/stores/hidden.js'
 import {mapWritableState} from 'pinia'

export default {  

    name:"AppHeader",
    el: '#app',

    props:{
        tab:{
            type:String,
            Required:true,
        },
       
    },
    emits:['change-tab'],
    data(){
        return{

        }
    },
    computed:{
        ...mapWritableState(useHiddenStore,['isHidden'])

    },
    methods:{
        // toggle form 
         ToggleForm(argument){
            this.isHidden = !this.isHidden
            // pass the argument to parent component either login or signup
            this.$emit('change-tab',argument)    
        },

       
    }
    
}
</script>
<template>
    <!--navbar-->
    <header >
        <nav class="flex justify-evenly pt-5 w-full">
            <div class=""> 
                <h1 class="text-main-color font-bold text-3xl">Manageme</h1>
            </div>
            <!--navbar lists and links-->
            <div class="">
                <ul class="mt-2">
                    <li class="inline mr-4 hover:text-main-color cursor-pointer font-bold ">Home</li>
                    <li class="inline mr-4 hover:text-main-color cursor-pointer font-bold ">Features</li>
                    <li class="inline mr-4 hover:text-main-color cursor-pointer font-bold ">About us</li>
                    <li class="inline mr-4 hover:text-main-color cursor-pointer font-bold ">Contact us</li>
                </ul>
            </div>
            <!--sign up and login up button-->
            <div class="mt-2 ">
                <button  @click="ToggleForm('logIn') " class="mr-7 w-28 rounded h-10 bg-button-color text-white ">Sign in</button>
                <button  @click="ToggleForm('signUp')" class=" w-28 w-28 rounded	h-10 bg-button-color text-white ">Sign up</button>
            </div>
        </nav>
    </header>
    <!--navbar-->

</template>
<style>

</style>
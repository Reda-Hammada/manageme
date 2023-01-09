<script>
 import {useHiddenStore} from '@/stores/hidden.js'
 import {mapState,mapWritableState} from 'pinia'
export default {

    name:"AppHeader",
    components:{

    },
    data(){
        return{
            tab : 'Login'
        }
    },
    computed:{
        ...mapWritableState(useHiddenStore,['isHidden'])

    },
    methods:{
         ToggleForm(){
            this.isHidden = !this.isHidden
            console.log(this.isHidden)

            switch(this.tab){
                case 'Login':
                    this.tab = 'Register'
                    break;
                case 'Register':
                    this.tab = 'Login'
                    break;
                default:
                    this.tab ='Login'   
            }

            
        },

        ToggleTab(){

            switch(this.tab){
                case 'Login':
                    this.tab = 'Register'
                    break;
                case 'Register':
                    this.tab = 'Login'
                    break;
                default:
                    this.tab ='Login'   
            }

            console.log(this.tab)
            
            
        }
    }
    
}
</script>
<template>
    <header >
        <nav class="flex justify-evenly pt-5 w-full">
            <div class=""> 
                <h1 class="text-main-color font-bold text-3xl">Manageme</h1>
            </div>
            <div class="">
                <ul class="mt-2">
                    <li class="inline mr-4 hover:text-main-color cursor-pointer font-bold ">Home</li>
                    <li class="inline mr-4 hover:text-main-color cursor-pointer font-bold ">Features</li>
                    <li class="inline mr-4 hover:text-main-color cursor-pointer font-bold ">About us</li>
                    <li class="inline mr-4 hover:text-main-color cursor-pointer font-bold ">Contact us</li>
                </ul>
            </div>
            <div class="mt-2 ">
                <button @click="ToggleForm " class="mr-7 w-28 rounded h-10 bg-button-color text-white ">Sign in</button>
                <button @click="ToggleForm" class=" w-28 w-28 rounded	h-10 bg-button-color text-white ">Sign up</button>
            </div>
        </nav>
    </header>
</template>
<style>

</style>
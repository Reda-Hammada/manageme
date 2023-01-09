<script>
 import {useHiddenStore} from '@/stores/hidden.js'
 import {mapState,mapWritableState} from 'pinia'
 
 export default{
    name:"AppAuth",
    props:{
       tab:{
         
       },
   
    },
    data(){
      return{
         schema:{
            
         },
      }
    },
    computed:{
      ...mapState(useHiddenStore,['isHidden']),
      ...mapWritableState(useHiddenStore,['isHidden'])
    },
    methods:{
      toggleTab(argument){
         this.$emit('change-tab',argument)    

      }
    }
    
 }
</script>

<template>
   <!--Auth Login & Register-->
   <div class="absolute opacity-75 bg-black w-full  h-full bottom-0 " 
    v-show="isHidden === true" >
      <div class="bg-white rounded opacity-100 w-2/6  mr-auto ml-auto  opacity-100"
           :class="{'h-3/6 mt-32':tab ==='Login','h-5/6 mt-14':tab ==='Register'}">
         <span 
         @click='isHidden = !isHidden' 
         class="text-2xl font-bold text-black cursor-pointer hover:text-main-color"
         >X
        </span>

         <div class="text-center mb-7 ">
            <button @click="toggleTab('logIn')"
                   class="mr-12" :class='{"hover:text-main-color bg-white": tab==="Register","w-28 w-28 rounded	h-10 bg-button-color text-white ":tab ==="Login"}' >
                     Sign in
                  </button>
            <button  @click="toggleTab('signUp')"
                   :class='{"text-main-color bg-white": tab==="Login","w-28 w-28 rounded	h-10 bg-button-color text-white ":tab ==="Register"}'>
               Sign up
            </button>
        </div>
      
         <!--Login-->
         <vee-form v-show="tab === 'Login'">
            <div>
               <h2 class="text-main-color text-center">{{ tab }}</h2>

               <label class="">email</label>
               <vee-field name="email"
                          type="text"
                          placeholder="Enter your email"
                          />
        
            </div>
            <div>
               <label>Password</label>
               <vee-field name="password" 
                          type="password"
                          placeholder="Enter your password"
                          />
            </div>
         </vee-form>
         <!--Register-->
         <vee-form v-show="tab === 'Register'">

            <div>
               <h2 class="text-main-color">{{ tab }}</h2>

               <label>email</label>
               <vee-field name="email"
                          type="text"
                          placeholder="Enter your email"
                          />
        
            </div>
            <div>
               <label>Password</label>
               <vee-field name="password" 
                          type="password"
                          placeholder="Enter your password"
                          />
            </div>
         </vee-form>
      </div>
   </div>
 
</template>


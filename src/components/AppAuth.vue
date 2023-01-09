<script>
 import {useHiddenStore} from '@/stores/hidden.js'
 import {mapState,mapWritableState} from 'pinia'
 
 export default{
    name:"AppAuth",
    data(){
      return{
         tab:'Login',
         schema:{
            
         },
      }
    },
    computed:{
      ...mapState(useHiddenStore,['isHidden']),
      ...mapWritableState(useHiddenStore,['isHidden'])
    }
    
 }
</script>

<template>
   <!--Auth Login & Register-->
   <div class="absolute opacity-50 bg-black w-full  h-full bottom-0 " 
    v-show="isHidden === true" >
      <div class="bg-gray-500  w-1/2 mr-auto ml-auto mt-40">
         <span @click='isHidden = !isHidden' class="text-4xl bg-black text-black">Xredererw</span>

         <div>

         </div>
         <!--Login-->
         <vee-form v-show="tab === 'Login'">
            <div>
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
         <!--Register-->
         <vee-form v-show="tab === 'Register'">
            <div>
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


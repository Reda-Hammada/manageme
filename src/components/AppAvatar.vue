<script>
    export default{
        name:'AppAvatar',
        props:{
            image:{
                type:String, Object ,
                required:true
            }
        }


    }
</script>

<template>
    <div class="w-[20%] mr-auto ml-auto pt-3 pb-4">
        <img :src='image'
             alt='a person'
             />
             
    </div>
</template>

<style>

</style>
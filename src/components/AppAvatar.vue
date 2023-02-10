<script>
    export default{
        name:'AppAvatar',
        props:{
            image:{
                type:String,
                required:true
            }
        }


    }
</script>

<template>
    <div>
        <img :src='image'
             alt='a person'
             />
    </div>
</template>

<style>

</style>
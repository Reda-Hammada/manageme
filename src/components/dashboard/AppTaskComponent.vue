<script>
export default{
    name:'AppTaskComponent',
    Props:{
        Task:{
            type:String,
            required:true,
        },
    },

    created(){
        alert(Task);
    }

}
</script>
<template>
     <div>
        {{ Task }}
     </div>

</template>
<script>
export default {
    name:"AppHeader",
    
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
            <div class="mt-3  ">
                <button class="mr-7 w-28 rounded h-10 bg-button-color text-white font-bold">Sign in</button>
                <button class=" w-28 w-28 rounded	h-10 bg-button-color text-white font-bold">Sign up</button>
            </div>
        </nav>
    </header>
</template>
<style>

</style>
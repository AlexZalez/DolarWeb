<script setup>
    import axios from 'axios';
    import {ref, onMounted} from 'vue';

    const precio = ref('');

    function valor() {
        axios.get('https://pydolarvenezuela-api.vercel.app/api/v1/dollar/bcv').then(res =>{
            console.log(res.data.monitors.usd.price);
            precio.value = res.data.monitors.usd.price;
        });
        return
    }

    onMounted(()=>{
        valor();
    })
</script>

<template>
    <div class="h-screen flex justify-center items-center">
        <div class="flex flex-col bg-green-800 rounded-3xl px-6 py-3 text-white">
            <div class=" font-bold text-center">Dolar BCV</div>
            <div class="flex">
                <div class="">1$ = </div>
                <div class="">{{ ` ${precio.substring(0,5)}BsS` }}</div>
            </div>
        </div>
    </div>
</template>



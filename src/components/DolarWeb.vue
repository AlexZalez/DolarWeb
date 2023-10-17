<script setup>
    import axios from 'axios';
    import {ref, onMounted, computed} from 'vue';

    const precio = ref('');
    const isLoading = ref(true)
    const setIsLoading = (state) => {
            isLoading.value = state;
    }
    
    const dolarON = ref(false);
    const dolarIN = ref(null);

    const bolivarON = ref(false);
    const bolivarVAL = computed(()=>{
        let newVal = precio.value * dolarIN.value;
        return `${newVal.toFixed(2)} Bs`;
    })

    function valor() {
        axios.get('https://pydolarvenezuela-api.vercel.app/api/v1/dollar/bcv')
        .then(res =>{
            console.log(res.data.monitors.usd.price);
            precio.value = res.data.monitors.usd.price;
        })
        .catch(error => {

        })
        .finally(() => {
            setIsLoading(false)
        });
        return
    }
    onMounted(()=>{
        valor();
    })
</script>

<template>
    <div class="h-screen flex justify-center items-center">
        <div v-if="isLoading" class="flex flex-col bg-green-800 rounded-3xl px-6 py-3 text-white">
            <div>
                CARGANDO
            </div>
        </div>
        <div v-else class="flex flex-col bg-green-800 rounded-3xl px-6 py-3 text-white">
            <div class=" font-bold text-center">Dolar BCV</div>
            <div class="flex">
                <div class="group">
                    <div @click="dolarON = !dolarON" v-if="!dolarON" class="flex">
                        <div class="group-hover:bg-white/50 px-1 py-0.5 rounded-lg cursor-pointer">1$</div>
                        <div class="mr-1">=</div>
                    </div>
                    
                    <div v-else class="flex">
                        <div class="flex">
                            <input type="text" v-model="dolarIN" class="myIN">
                            <div>$</div>
                        </div>
                        <div class="mx-1">=</div>
                    </div>
                </div>
                <div class="">
                    <div @click="bolivarON = !bolivarON" v-if="dolarON">{{ bolivarVAL }}</div>
                    <div v-else>{{ `${precio} Bs` }}</div>
                </div>
            </div>

        </div>
    </div>
</template>

<style>

    .myIN{
        @apply bg-transparent outline-none w-6
    }

</style>



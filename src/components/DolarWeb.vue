<script setup>
import axios from 'axios';
import {ref, onMounted, reactive, computed, nextTick, watch} from 'vue';
import { storeToRefs } from 'pinia';
import { useDolarStore } from '@/store/dolar.js'

const useDolar = useDolarStore();

const { getDolarAction } = useDolar

const { datetime, dolars } = storeToRefs(useDolar)

const dolarInput = ref(false)

const selectDolar = ref(null)

const amount = ref(1)

const calcAmount = computed(()=>{
    
    if (selectDolar.value == null) {
        return 0
    }

    let res = selectDolar.value.price * amount.value
    
    return parseFloat(Math.round(res * 100) / 100).toFixed(2);
})
    
const loading = reactive({
    dolar: false
})    

onMounted(()=>{
    loading.dolar = true
    getDolarAction()
    .then(response => {
        loading.dolar = false
    })
    .catch(error => {
        console.log(error);
        loading.dolar = false
    })
})

const onUpdate = ()=>{
    amount.value = 1
}

const setState = (input, schema) =>{
    
    if (input == 'dolar') dolarInput.value = schema == 'focus'
    
}
    
</script>

<template>
    <div class="h-screen flex justify-center items-center">
        <div class="bg-green-300 min-w-[400px] min-h-[400px]
            relative rounded-lg px-6 pb-3 pt-16 shadow-xl shadow-black/30">

            <div class="rounded-full w-32 h-32 bg-green-600 
                absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2
                flex justify-center items-center"
            >
                <span class="font-semibold text-[5rem] pb-3 text-white">$</span>
            </div>
            <div class="bg-green-500 rounded h-[300px] mt-4 p-6 ">
                <div v-if="loading.dolar" class="flex items-center justify-center h-full">
                    <div>
                        <svg class="animate-spin -ml-1 mr-3 h-12 w-12 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </div>
                </div>
                <div class="flex flex-col gap-4" v-else>
                    <select
                        @change="onUpdate()" 
                        v-model="selectDolar" 
                        class="w-full p-2 rounded bg-green-200"
                    >
                        <option :value="null" selected disabled hidden>Selecciona una tasa</option>
                        <template v-for="dolar in dolars">
                            <option :value="dolar">
                                {{ dolar.title }}
                            </option>
                        </template>
                    </select>

                    <div class="w-full p-2 rounded bg-green-200 text-end" >
                        {{ `${calcAmount} Bs` }}
                    </div>

                    <div class="flex gap-1 w-full p-2 rounded bg-green-200 outline outline-2 outline-green-600" 
                        :class="{'bg-gray-200 text-gray-600': selectDolar == null, 'outline-2 outline-green-900': dolarInput}"
                    >
                        <input 
                            class="focus:outline-none w-full text-end bg-green-200 disabled:bg-gray-200 " 
                            type="number"
                            v-model="amount"
                            :disabled="selectDolar == null"
                            @focus="setState('dolar', 'focus')"
                            @blur="setState('dolar', 'blur')"
                        >
                        <div>$</div>
                    </div>


                </div>

            </div>
        </div>
        
    </div>
    <h1>ysmael UwU Prueba 2</h1>
</template>

<style scoped>
input[type='number'] {
    -moz-appearance:textfield;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}

</style>



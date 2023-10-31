<script setup>
    import axios from 'axios';
    import {ref, onMounted, computed, nextTick, watch} from 'vue';

    

    const precio = ref('');
    const isLoading = ref(true)
    const setIsLoading = (state) => {
            isLoading.value = state;
    }
    
    const dolarON = ref(false);
    const dolarEL = ref(null);
    const dolarIN = ref('0.00');
    watch(dolarIN, (newX, oldX)=>{
        if (newX.match(/[^0-9.]/)) {
            let procesed = newX.replace(/[^0-9.]/, '');
            dolarIN.value = procesed;
        }
    })

    const bolivarON = ref(false);
    const bolivarVAL = computed(()=>{
        let newVal = precio.value * Number(dolarIN.value);
        return `${newVal.toFixed(2)} Bs`;
    })

    function valor() {
        axios.get('https://pydolarvenezuela-api.vercel.app/api/v1/dollar/page?page=bcv')
        .then(res =>{
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


    const Agregar = (e) => {
        e.preventDefault()
        
        if (e.keyCode == 8) {
            
            let inCrud = dolarIN.value.replace('.','');
            let finish;

            if (inCrud.length <= 3) {
                let inProces = inCrud.substring(0,inCrud.length-1);
                finish = 0+'.'+inProces.substring(inCrud.length-3,inCrud.length-1);
            }

            if (inCrud.length > 3) {
                let inProces = inCrud.substring(0,inCrud.length-1);
                finish = inProces.substring(0,inCrud.length-3)+'.'+inProces.substring(inCrud.length-3,inCrud.length-1);
            }
            dolarIN.value = finish;
            return;
        }
        
        if(!isNaN(e.key)){
                        
            if (dolarIN.value == '0.00') {
                dolarIN.value = '0.0'+e.key;
                return;
            }

            if (dolarIN.value.match(/^(0\.0)+([1-9])/)) {
                let dlrStart = dolarIN.value.match(/(0\.0)+([1-9])/)[2];
                let dlrEnd = '0.'+dlrStart+e.key;
                dolarIN.value = dlrEnd;
                console.log('1');
                return;
            }

            if (dolarIN.value.match(/^(0\.)+([1-9])+([0-9])/)) {
                let notDot = dolarIN.value.replace('.','');
                let inProces = notDot.substring(1,notDot.length)+e.key;
                let finish = inProces.substring(0,inProces.length-2)+'.'+inProces.substring(inProces.length-2, inProces.length);
                dolarIN.value = finish;
                return;
            }

            let notDot = dolarIN.value.replace('.','');
            let inProces = notDot+e.key;
            let finish = inProces.substring(0,inProces.length-2)+'.'+inProces.substring(inProces.length-2, inProces.length);
            dolarIN.value = finish;
            return;
        }
        
    }

    async function activateD (){
        dolarON.value = !dolarON.value;
        await nextTick();
        dolarEL.value.focus();
    }
</script>

<template>
    <div class="h-screen flex justify-center items-center">
        <div v-if="isLoading" class="flex flex-col bg-green-800 rounded-3xl px-6 py-3 text-white">
            <div>
                CARGANDO
            </div>
        </div>
        <div v-else class="flex flex-col bg-green-800 rounded-3xl px-6 py-3 max-w-[14em] text-white">
            <div class=" font-bold text-center">Dolar BCV</div>
            <div class="flex">
                <div class="group">
                    
                    <!-- BOTON PARA CAMBIAR DOLAR -->
                    <div @click="activateD" v-if="!dolarON" class="flex">
                        <div class="group-hover:bg-white/50 px-1 py-0.5 rounded-lg cursor-pointer">1.00$</div>
                        <div class="mr-1">=</div>
                    </div>
                    
                    <!-- Input para Dolar -->
                    <div v-else class="flex">
                        <div class="flex">
                            <input ref="dolarEL" v-model="dolarIN" type="text" @keydown="Agregar" class="myIN">
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
        @apply outline-none max-w-[4em] bg-green-700 rounded-lg text-end px-1 py-0.5
    }

</style>



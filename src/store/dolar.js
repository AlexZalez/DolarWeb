import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useDolarStore = defineStore('dolars', ()=>{
    const dolars = ref([]);
    const datetime = ref(null);

    const getDolarAction = ()=>{
        return new Promise((resolve, reject)=>{
            axios.get('https://pydolarve.org/api/v1/dollar?page=alcambio')
            .then(response => {
                const { datetime, monitors } = response.data;
                
                dolars.value = monitors
                
                datetime.value = datetime

                resolve()
            })
            .catch(error => {
                reject(error)
            })
        })
    }

    return {
        dolars,
        getDolarAction,
    }
})
<script setup>
import { storeToRefs } from 'pinia';

import { useAuthStore } from '@/stores';

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
const {movies} = storeToRefs(user);
</script>

<template>
    <div v-if="user">
        <h1>Hi {{user.username}}!</h1>
        
        <div><p><router-link to="/movies">Manages my movies</router-link></p></div>
        <div>
            <td>{{movies}}</td>
            
            


        </div>
        
        
    </div>
</template>
<style scoped>
td{
    text-align: center;
}



</style>

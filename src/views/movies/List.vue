<script setup>
import { storeToRefs } from 'pinia';

import { useMovieStore } from '@/stores';

const moviesStore = useMovieStore();
const { movies } = storeToRefs(moviesStore);

moviesStore.getAll();


</script>

<template>
    <h1>Movies</h1>
    <router-link to="/movies/add" class="btn btn-sm btn-success mb-2">Add Movies</router-link>
    <table class="table table-striped">
        <thead>
            <tr>
                <th style="width: 20%">Movies Title</th>
                <th style="width: 20%">Genre</th>
                <th style="width: 30%">Description</th>
                <th style="width: 20%">Rating</th>
            </tr>
        </thead>
        <tbody>
            <template v-if="movies.length">
                <tr v-for="movie in movies" :key="movie.id">
                    <td>{{ movie.FilmName }}</td>
                    <td>{{ movie.GenreName}}</td>
                    <td>{{ movie.Description }}</td>
                    <td>{{ movie.Rating }}</td>
                    <td style="white-space: nowrap">
                        <router-link :to="`/movies/edit/${movie.id}`" class="btn btn-sm btn-primary mr-1">Edit</router-link>
                        <button @click="moviesStore.delete(movie.id)" class="btn btn-sm btn-danger btn-delete-movie" :disabled="movie.isDeleting">
                            <span v-if="movie.isDeleting" class="spinner-border spinner-border-sm"></span>
                            <span v-else>Delete</span>
                        </button>
                    </td>
                </tr>
            </template>
            <tr v-if="movies.loading">
                <td colspan="4" class="text-center">
                    <span class="spinner-border spinner-border-lg align-center"></span>
                </td>
            </tr>
            <tr v-if="movies.error">
                <td colspan="4">
                    <div class="text-danger">Error loading movies: {{movies.error}}</div>
                </td>
            </tr>  
      
                     
        </tbody>
    </table>
</template>

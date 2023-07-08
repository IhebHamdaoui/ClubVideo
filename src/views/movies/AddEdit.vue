<script setup>
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';

import { useMovieStore, useAlertStore,genreList } from '@/stores';
import { router } from '@/router';
//Vue.component('star-rating', VueStarRating.default);

const moviesStore =useMovieStore ();
const alertStore = useAlertStore();

const genreStore= genreList();
const {genres} = storeToRefs(genreStore)


const route = useRoute();
const id = route.params.id;

let title = 'Add Movie';
let movie = null;
if (id) {
    // edit mode
    title = 'Edit Movie';
    ({ movie } = storeToRefs(moviesStore));
    moviesStore.getById(id);
}

const schema = Yup.object().shape({
    FilmName: Yup.string()
        .required('Le nom du film est requis'),
    GenreName: Yup.object().shape({genreList})
        .required('le genre du film est requis'),
    Rating: Yup.string()
        .required('moviename is required'),
    Description:Yup.string()
        .required('une description est nécéssaire')

});

async function onSubmit(values) {
    try {
        let message;
        if (movie) {
            await moviesStore.update(movie.value.id, values)
            message = 'Film mise à jour';
        } else {
            await moviesStore.register(values);
            message = 'Film rajouté';
        }
        await router.push('/movies');
        alertStore.success(message);
    } catch (error) {
        alertStore.error(error);
    }
};


</script>

<template>
    <h1>{{title}}</h1>
    <template v-if="!(movies?.loading || movies?.error)">
        <Form @submit="onSubmit" :validation-schema="schema" :initial-values="movies" v-slot="{ errors, isSubmitting }">
            <div class="form-row">
                <div class="form-group col">
                    <label>Nom du film</label>
                    <Field name="FilmName" type="text" class="form-control" :class="{ 'is-invalid': errors.firstName }" />
                    <div class="invalid-feedback">{{ errors.firstName }}</div>
                </div>
                <div class="form-group col">
                    <label>Genre</label>
                    <Field name="lastName" type="text" class="form-control" :class="{ 'is-invalid': errors.lastName }" />
                    <div class="invalid-feedback">{{ errors.lastName }}</div>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col">
                <label>Description </label>
                <Field name="Description" type="" class="form-control" :class="{ 'is-invalid': errors.lastName }" />
            </div>
            </div>
             <div class="form-group col">
                    <label>
                        Rating out of 5
                        <em v-if="movie">(Leave blank to keep the same password)</em>
                    </label>

            </div>
            <div class="rating">
                        <input type=”radio” name=”rating” value=”5″ id=”5″><label for=”5″>☆</label>
                        <input type=”radio” name=”rating” value=”4″ id=”4″><label for=”4″>☆</label>
                        <input type=”radio” name=”rating” value=”3″ id=”3″><label for=”3″>☆</label>
                        <input type=”radio” name=”rating” value=”2″ id=”2″><label for=”2″>☆</label>
                        <input type=”radio” name=”rating” value=”1″ id=”1″><label for=”1″>☆</label>
            </div>
           

            

            <div class="form-group">
                <button class="btn btn-primary" :disabled="isSubmitting">
                    <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
                    Save
                </button>
                <router-link to="/movies" class="btn btn-link-caution">Cancel</router-link>
            </div>
        </Form>
    </template>
    <template v-if="movie?.loading">
        <div class="text-center m-5">
            <span class="spinner-border spinner-border-lg align-center"></span>
        </div>
    </template>
    <template v-if="movie?.error">
        <div class="text-center m-5">
            <div class="text-danger">Error loading movie: {{movie.error}}</div>
        </div>
    </template>
</template>

<style scoped>
.rating {
display: flex;
flex-direction: row-reverse;
justify-content: center;
}
.rating > input{
 display:none;
}
.rating > label {
position: relative;
width: 1.1em;
font-size: 4vw;
color: #0c0c0c;
cursor: pointer;
}
.rating > label::before label::after{
content: “2605”;

position: absolute;
opacity: 1;
color: #b4a911;
}
.rating > label:hover:before,
.rating > label:hover ~ label:before {
opacity: 1 !important;
color: #b4a911;
fill: #b4a911;
}
.rating > input:checked ~ label:before{
opacity:1;
color: #b4a911;
}
.rating:hover > input:checked ~ label:before{
opacity: 0.4;
color: #b4a911;
 }
</style>
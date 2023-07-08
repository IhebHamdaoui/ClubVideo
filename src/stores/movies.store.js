import { defineStore } from 'pinia';

import { fetchWrapper } from '@/helpers';
import { useAuthStore } from '@/stores';

const baseUrl = `${import.meta.env.VITE_API_URL}/movies`;

export const useMovieStore = defineStore({
    id: 'movies',
    state: () => ({
        movies: {},
        movie: {}
    }),
    actions: {
            async getAll() {
            this.movies = { loading: true };
            try {
                this.movies = await fetchWrapper.get(baseUrl);    
            } catch (error) {
                this.movies = { error };
            }
        },
        async getById(id) {
            this.movie = { loading: true };
            try {
                this.movie = await fetchWrapper.get(`${baseUrl}/${id}`);
            } catch (error) {
                this.movie = { error };
            }
        },
        async update(id, params) {
            await fetchWrapper.put(`${baseUrl}/${id}`, params);

            // update stored movie if the logged in movie updated their own record
            const authStore = useAuthStore();
            if (id === authStore.movie.id) {
                // update local storage
                const movie = { ...authStore.movie, ...params };
                localStorage.setItem('movie', JSON.stringify(movie));

                
                authStore.movie = movie;
            }
        },
        async delete(id) {
            
            this.movies.find(x => x.id === id).isDeleting = true;

            await fetchWrapper.delete(`${baseUrl}/${id}`);

          
            this.movies = this.movies.filter(x => x.id !== id);

            
            const authStore = useAuthStore();
            if (id === authStore.movie.id) {
                authStore.logout();
            }
        }
    }
});


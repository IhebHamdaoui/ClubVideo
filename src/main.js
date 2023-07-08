import { createApp } from 'vue';
import { createPinia } from 'pinia';
import StarRating from 'vue-star-rating';

import App from './App.vue';
import { router } from './router';

// setup fake backend
import { fakeBackend } from './helpers';
import { fakeMovieBackend } from './helpers';

fakeBackend();
fakeMovieBackend();

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');

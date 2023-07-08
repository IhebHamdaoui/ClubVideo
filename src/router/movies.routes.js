import { Layout, List, AddEdit } from '@/views/movies';

export default {
    path: '/movies',
    component: Layout,
    children: [
        { path: '', component: List },
        { path: 'add', component: AddEdit },
        { path: 'edit/:id', component: AddEdit }
    ]
};

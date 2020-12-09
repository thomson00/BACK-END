import Vue from 'vue';
import VueRouter from 'vue-router';
import { getCookie } from '../utils/cookie';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import NotFound from '../views/NotFound.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/notfound',
        name: 'NotFound',
        component: NotFound
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    let token = getCookie('admin_token');
    if (to.path !== '/login' && !token) {
        next({ path: '/login' });
    } else {
        next();
    }
});

export default router;

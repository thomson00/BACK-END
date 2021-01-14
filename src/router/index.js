import Vue from 'vue';
import VueRouter from 'vue-router';
import { getCookie } from '../utils/cookie';
import store from '../store/index';
import { getUserPermission } from '../api/request';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import NotFound from '../views/NotFound.vue';

Vue.use(VueRouter);

const secondRoute = [
    {
        path: '/'
    },
    {
        path: 'MemberManagement',
        name: 'MemberManagement',
        component: () => import('../views/MemberManagement/index.vue')
    },
    {
        path: 'FundingManagement',
        name: 'FundingManagement',
        component: () => import('../views/FundingManagement/index.vue')
    },
    {
        path: 'RebateReportManagement',
        name: 'RebateReportManagement',
        component: () => import('../views/RebateReportManagement/index.vue')
    },
    {
        path: 'OrdersReportManagement',
        name: 'OrdersReportManagement',
        component: () => import('../views/OrdersReportManagement/index.vue')
    },
    {
        path: 'PromotionManagement',
        name: 'PromotionManagement',
        component: () => import('../views/PromotionManagement/index.vue')
    },
    {
        path: 'MarketingManagement',
        name: 'MarketingManagement',
        component: () => import('../views/MarketingManagement/index.vue')
    },
    {
        path: 'CRMSettings',
        name: 'CRMSettings',
        component: () => import('../views/CRMSettings/index.vue')
    },
    {
        path: 'UserManagement',
        name: 'UserManagement',
        component: () => import('../views/UserManagement/index.vue')
    }
];

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        children: secondRoute
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

router.beforeEach(async (to, from, next) => {
    let token = getCookie('admin_token');
    if (to.path !== '/login' && !token) {
        next({ path: '/login' });
    } else {
        const res = await getUserPermission();
        if (res) {
            let { role } = res;
            const permissionList = res.permissions.map(item => {
                return item.name;
            });
            store.commit('setPermission', { permissionList, role });
        }
        next();
    }
});

export default router;

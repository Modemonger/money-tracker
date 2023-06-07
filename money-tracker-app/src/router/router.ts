import Input from '../views/Input.vue';
import Login from '../views/Login.vue';
import List from '../views/List.vue';
import Signup from '../views/Signup.vue';
import Analytics from '../views/Analytics.vue';
import Profile from '../views/Profile.vue';
import { createRouter, createWebHistory, RouteRecordRaw, NavigationGuard } from 'vue-router';
import pinia from '../stores/store';
import { useSessionStore } from '../stores/sessionStore';

const routes: RouteRecordRaw[] = [
    { 
        name: 'Login',
        path: '/login', 
        component: Login,
        meta: {
            requiresAuth: false,
        },
    },
    { 
        name: 'Signup',
        path: '/signup', 
        component: Signup,
        meta: {
            requiresAuth: false,
        },
    },
    { 
        name: 'AddNote',
        path: '/add-note', 
        component: Input,
        meta: {
            requiresAuth: true,
        },
    },
    { 
        name: 'Listing',
        path: '/listing', 
        component: List,
        meta: {
            requiresAuth: true,
        },
    },
    { 
        name: 'Analytics',
        path: '/analytics', 
        component: Analytics,
        meta: {
            requiresAuth: true,
        },
    },
    { 
        name: 'Profile',
        path: '/profile', 
        component: Profile,
        meta: {
            requiresAuth: true,
        },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

const guards: NavigationGuard[] = [
    ((to, from, next) => {
        const sessionStore = useSessionStore(pinia);
        if (to.matched.length === 0) {
            next({ name: 'Signup' })
        } else if (!sessionStore.isAuthenticated && to.meta.requiresAuth === true) {
            next({ name: 'Login' });
        } else if (sessionStore.isAuthenticated && to.meta.requiresAuth === false) {
            next({ name: 'AddNote' });
        } else if (sessionStore.isAuthenticated && to.meta.requiresAuth === false) {
            next({ name: 'Analytics' });
        } else {
            next();
        }
    }),
];

guards.forEach((guard) => {
    router.beforeEach(guard);
})

export default router;
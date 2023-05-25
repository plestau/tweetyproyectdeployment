/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */


/**
 * Next, we will create a fresh Vue application instance. You may then begin
 * registering components with the application instance so they are ready
 * to use in your application's views. An example is included for you.
 */

import { createApp, h } from 'vue';
import { createInertiaApp, Link } from '@inertiajs/inertia-vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { InertiaProgress } from '@inertiajs/progress';
import { createRouter, createWebHistory } from 'vue-router';
import { ZiggyVue } from '../../vendor/tightenco/ziggy/dist/vue.m';

const app = createApp({});

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('./Pages/Home.vue'),
    },
    {
        path: '/notifications',
        name: 'notifications',
        component: () => import('./Pages/Notifications.vue'),
    },
    {
        path: '/messages',
        name: 'messages',
        component: () => import('./Pages/Messages.vue'),
    },
    {
        path: '/profile',
        name: 'profile',
        component: () => import('./Pages/Profile.vue'),
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('./Pages/Auth/Register.vue'),
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('./Pages/Auth/Login.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => import(`./Pages/${name}.vue`),
    resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob('./Pages/**/*.vue')),
    setup({ el, App, props, plugin }) {
        const app = createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(router)
            .use(ZiggyVue)
            .component('InertiaLink', Link)
            .mount(el);

        InertiaProgress.init({ color: '#4B5563' });

        return app;
    },
});


/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// Object.entries(import.meta.glob('./**/*.vue', { eager: true })).forEach(([path, definition]) => {
//     app.component(path.split('/').pop().replace(/\.\w+$/, ''), definition.default);
// });

/**
 * Finally, we will attach the application instance to a HTML element with
 * an "id" attribute of "app". This element is included with the "auth"
 * scaffolding. Otherwise, you will need to add an element yourself.
 */


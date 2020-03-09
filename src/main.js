import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import './plugins/bootstrap-vue'
import Index from '@/components/Admin/LopHoc/Index';
import SinhVien from '@/components/Admin/SinhVien/SinhVien';
import MonHoc from '@/components/Admin/MonHoc/MonHoc';
import LopHoc from '@/components/Admin/LopHoc/LopHoc';
import Sv from '@/components/User/Index/Sv';
import QLSV from '@/components/QLSV';
import Login from '@/components/User/Login';
import SV from '@/components/SV';

Vue.config.productionTip = false
Vue.config.productionTip = false

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        {
            path: '/admin',
            component: QLSV,
            name: 'homeAdmin',
            beforeEnter: (to, from, next) => {
                if (!localStorage.getItem('tokenAdmin')) {
                    return next({
                        name: 'loginAdmin'
                    })
                }
                next()
            },
            children: [
                {
                    path: '/admin/sinhvien',
                    component: SinhVien,
                    name: 'sinhvien'
                },
                {
                    path: '/admin/monhoc',
                    component: MonHoc,
                    name: 'monhoc'
                },
                {
                    path: '/admin/lophoc',
                    component: Index,
                    name: 'lophoc'
                }
            ]
        },

        {
            path: '/loginAdmin',
            component: () =>import("@/components/Admin/LoginAdmin.vue"),
            name: 'loginAdmin',
            beforeEnter: (to, from, next) => {
                if (localStorage.getItem('tokenAdmin')) {
                    return next({
                        name: 'homeAdmin'
                    })
                }
                next()
            }
        },
        {
            path: '/lophoc/xem/:classCode',
            component: LopHoc,
            name: 'lophocId'
        },

        {
            path: '/',
            component: SV,
            name: 'home',
            beforeEnter: (to, from, next) => {
                if (!localStorage.getItem('token')) {
                    return next({
                        name: 'Login'
                    })
                }
                next()
            },
            children: [
                {
                    path: '/sv',
                    component: Sv,
                    name: 'sv',

                },
                {
                    path: '/studentClass',
                    component: () => import('@/components/User/StudentClass.vue'),
                    name: 'studentClass',

                },
                {
                    path: '/detailSubject',
                    component: () => import('@/components/User/DetailSubject.vue'),
                    name: 'detailSubject',

                },
            ]
        },

        {
            path: '/login',
            component: Login,
            name: 'Login',
            beforeEnter: (to, from, next) => {
                if (localStorage.getItem('token')) {
                    return next({
                        name: 'home'
                    })
                }
                next()
            }
        },

    ],
    mode: 'history'
});

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')

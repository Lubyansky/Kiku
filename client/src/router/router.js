import { createRouter, createWebHistory } from "vue-router";
import store from '@/store'
import Main from "@/pages/Main"
import Profile from "@/pages/Profile/Profile"
import Articles from "@/pages/Articles"
import Article from "@/pages/Article"
import ArticleManagement from "@/pages/Article_Management"
import ArticleEditing from "@/pages/Article_Editing"
import AdminPanel from "@/pages/Admin_Panel"
import License from "@/pages/License"
import Error from "@/pages/Error"
import Test from "@/pages/Test"


const routes = [
    {
        path: '/',
        name: 'main',
        component: Main
    },
    {
        path: '/articles',
        name: 'articles',
        component: Articles
    },
    {
        path: '/profile/:id',
        name: 'profile',
        component: Profile,
    },
    {
        path: '/articles/:id',
        name: 'article',
        component: Article
    },
    {
        path: '/articles/management',
        name:'article_management',
        component: ArticleManagement
    },
    {
        path: '/articles/change',
        name:'article_editing',
        component: ArticleEditing
    },
    {
        path: '/admin-panel',
        name:'admin_panel',
        component: AdminPanel
    },
    {
        path: '/license',
        name:'license',
        component: License
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'error',
        component: Error
    },
    {
        path: '/test',
        name: 'Test',
        component: Test
    }
]

const router = createRouter({
    routes,
    history: createWebHistory()
})

router.beforeResolve(async (to, from, next) => {
    if(!store.state.user.isLogin){
        await store.dispatch('user/Authorization')
    }
    next()
})

export default router;
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index'
import { Toast } from 'vant';
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',
    component: () => import('@/views/layout'),
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/layout/home')
      },
      {
        path: 'sort',
        name: 'sort',
        component: () => import('@/views/layout/sort')
      },
      {
        path: 'release',
        name: 'release',
        component: () => import('@/views/layout/release'),
        meta: {
          needLogin: true
        }
      },
      {
        path: 'my',
        name: 'my',
        component: () => import('@/views/layout/my')
      },
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login')
  },
  {
    path: '/reg',
    component: () => import('@/views/reg')
  },
  {
    path: '/articles',
    component: () => import('@/views/articles')
  },
  {
    path: '/list',
    name: 'list',
    component: () => import('@/views/list')
  },
  {
    path: '/revise',
    name: 'revise',
    component: () => import('@/views/reviseInfo')
  },
  {
    path: '/save',
    name: 'save',
    component: () => import('@/views/save'),
    meta: {
      needLogin: true
    }
  },
  {
    path: '/zan',
    name: 'zan',
    component: () => import('@/views/zan'),
    meta: {
      needLogin: true
    }
  },
  {
    path: '/myarticle',
    name: 'myarticle',
    component: () => import('@/views/myArticle'),
    meta: {
      needLogin: true
    }
  }

]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // console.log(to);
  if (to.meta.needLogin) {
    if (store.state.token) {
      next()
    } else {
      router.push({
        path: `/login`,
        query:{
          url:to.name
        }
      }
      )
      Toast('请先登录')
    }
  } else {
    next()

  }
})


export default router

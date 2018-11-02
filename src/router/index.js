import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Sprint from '@/components/Sprint'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/sprint/:id',
      name: 'Sprint',
      component: Sprint
    }
  ]
})

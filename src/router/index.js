import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/components/Index';
import Note from '@/components/Note';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '',
      name: 'Index',
      component: Index
    },
    {
      path:'/note',
      name:'Note',
      component: Note
    }
  ]
});

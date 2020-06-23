import Vue from 'vue';
import Router from 'vue-router';
import Note from '@/components/Note';
import BrowseNotes from '../components/BrowseNotes'

Vue.use(Router);

export default new Router({
  routes: [

    {
      path:'/',
      name:'Note',
      component: Note
    },
    {
      path:'/notes',
      name:'BrowseNotes',
      component: BrowseNotes
    }
  ]
});

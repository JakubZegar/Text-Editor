<template>
    <nav class="navbar fixed-top navbar-toggleable-md navbar-expand-lg scrolling-navbar double-nav">
      <ul class="nav navbar-nav nav-flex-icons ml-auto">
        <li v-for="item in navItems" :key="item.index" class="nav-item">
            <router-link :to="item.href"  class='nav-link nav-buttons' >
                <i :class="item.iconClass"></i>
                <span class="clearfix d-none d-sm-inline-block">
                    {{ item.name }}
                </span>
            </router-link >            
        </li>
      </ul>
    </nav>
</template>

<script >

    export default {
        name:'navbar',

        data() {
            return {
                navItems: [
                    {
                        name:'Home page',
                        iconClass: 'fas fa-home',
                        href: '/',
                    },
                    {
                        name:'Create a new note',
                        iconClass: 'far fa-sticky-note',
                        href: '/note',
                    },
                    {
                        name:'Browse notes',
                        iconClass: 'far fa-list-alt',
                        href: '/notes',
                    },
                ]
            };
        },
    }


</script>

<style scoped>

    .nav-buttons{
        
        color:white;
    }

    .nav-buttons:hover{
        color: rgb(0, 146, 214);
    }

    
</style>
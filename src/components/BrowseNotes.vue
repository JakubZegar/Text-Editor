<template>
        <div class=" col-8">
            <navbar/>
            <div class=" notes">
                
                <div class="column col-4 my-6 singleNote" v-for="(note, index) in notes" :key="index">
                    <div class="card text-dark">
                        <mdb-view gradient="aqua" cascade>
                        <div class="card-header">
                            <h2 class="card-title h5">{{ note.title }}</h2>
                        </div>
                        </mdb-view>
                        <div class="card-body">
                            {{ regex(note.note) }}
                        </div>
                        <div class="card-footer">
                            <router-link :to="{name: 'Note'}">
                            <mdb-btn gradient="blue" class="btn btn-primary" @click="editNote(index)">Edit</mdb-btn>
                            </router-link>
                            <mdb-btn gradient="aqua" class="btn btn-secondary" @click="deleteNote(index)" >Delete</mdb-btn>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
</template>

<script>
import { mapGetters } from 'vuex'
import VueRouter from 'vue-router'
import Vue from 'vue'
import { mdbBtn, mdbView } from 'mdbvue';
import navbar from './Navbar';
Vue.use(VueRouter)
export default {
    name:'BrowseNotes',
    components:{
        navbar,
        mdbBtn,
        mdbView,
        },
    data() {
        return {
            isLoading: false,
            errors: [],
            noteLimit: 140,
            showSucces: false,
            notes: []
        }
    },
    computed: {
        ...mapGetters(["note", "editingMode", "editingIndex"]),
        titleErrors() {
            return this.errors.find(error => error.type === 'title');
        },
        noteErrors() {
            return this.errors.find(error => error.type === 'note');
        }
    },
    created() {
        if (localStorage.getItem('notes')) {
            this.notes = JSON.parse(localStorage.getItem('notes'));
        }
    },
    methods: {
        saveNote(){
            this.loading = true;
            this.showSucces = false;
            this.errors = [];
            this.loading = false;
        },
        editNote(index){
            this.$store.commit("SET_TITLE", this.notes[index].title)
            this.$store.commit("SET_NOTE", this.notes[index].note)
            this.$store.dispatch("startEditing")
            

            this.showSucces = false;
            this.editingMode = true;
            this.$store.commit("SET_EDITING_INDEX", index)

            this.errors = [];
            this.note.title = this.notes[index].title;
            this.note.note = this.notes[index].note;
        },
        cancelEdit(){
            this.editingMode = false;
            this.editingIndex = null;
            this.errors = [];
            this.note = {title: '', note:''};
        },
        deleteNote(index) {
            this.notes.splice(index,1);
            localStorage.setItem('notes', JSON.stringify(this.notes));
        },
        clearMessage() {
            this.showSucces = false;
        },

        regex(note){
            const regex = /[<][^>]{0,8}[>]/gi
            
            return(note.replaceAll(regex,' '))
        }
    }
}
</script>

<style scoped>
    .notes{
        display: flex;
        flex-direction:row;
        justify-content:space-between;
        flex-wrap: wrap;
        align-content:space-between;
    }

    .singleNote{
        padding-top: 5%;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to  {
        opacity: 0;
    }
    .card-header{
        color:white;
        font-weight: bold;
    }
    .card-footer{
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
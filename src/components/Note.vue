<template>

        <div class="column col-12" style="padding-top:60px;">
            <div class="card mt-12 text-dark sticky">
                <div class="card-header">
                    <h2 class="card-title h5">{{ editingMode ? 'Edit' : 'Add' }} note</h2>
                </div>
                <form class="card-body" action="" method="post" @submit.prevent="saveNote">
                    <div class="toast toast-success" v-show="showSucces">
                        <button type="button" class="btn btn-clear float-right" @click="clearMessage"></button>
                        Note has been saved
                    </div>

                    <!-- Title  -->
                    <div class="form-group" :class="{ 'has-error': errors.some(e => e.type === 'title')}">
                        <mdb-input type="text" size="lg" label="Title" outline v-model="note.title"/>
                        <p class="form-input-hint" v-if="titleErrors">{{ titleErrors.text }}</p>
                    </div>

                    <!-- Text -->
                    <div class="form-group" :class="{ 'has-error': errors.some(e => e.type === 'note')}">
                        <mdb-input class="textArea" type="textarea" size="sm" label="Text" rows="10"  outline v-model="note.note" />
                        <p class="form-input-hint" v-if="noteErrors">{{ noteErrors.text }}</p>
                    </div>

                    <button type="submit" class="btn btn-primary" :class="{loading: isLoading}">{{ editingMode ? 'Update' : 'Save' }} note</button>
                    <button type="button" class="btn" @click="cancelEdit" v-show="editingMode">Cancel</button>
                </form>
            </div>
        </div>
</template>

<script>
import { mdbInput } from 'mdbvue';

export default {
    name:'Note',
    components:{
        mdbInput,
    },
    data() {
        return {
            isLoading: false,
            errors: [],
            noteLimit: 4096,
            editingMode: false,
            editingIndex: null,
            showSucces: false,
            note: {
                title: '',
                note: ''
            },
            notes: []
        }
    },
    computed: {
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
            if (this.note.title == '' || this.note.note == '' || this.note.note.length > this.noteLimit) {
                if (this.note.title == '') {
                    this.errors.push({
                        type: 'title',
                        text: 'Title should not be empty'
                    })
                }
                if (this.note.note == '') {
                    this.errors.push({
                        type: 'note',
                        text: 'Note should not be empty'
                    })
                }
                if (this.note.note.length > this.noteLimit) {
                    this.errors.push({
                        type: 'note',
                        text: 'Note should be less than '+ this.noteLimit +' characters'
                    })
                }
            } else {
                if (this.editingMode) {
                    this.notes[this.editingIndex] = this.note;
                } else {
                    this.notes.push(this.note);
                }
                this.showSucces = true;
                localStorage.setItem('notes', JSON.stringify(this.notes));
                this.cancelEdit();
            }
            this.loading = false;
        },
        editNote(index){
            this.showSucces = false;
            this.editingMode = true;
            this.editingIndex = index;
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
        }
    }
}
</script>

<style scoped>
    .textArea{
        resize: none;
    };

    .card{
        color:black;
    };
</style>
<template>
        <div class=" col-8">
            <div class=" notes">
                
                <div class="column col-4 my-6 singleNote" v-for="(note) in notes" :key="note.index">
                    <div class="card text-dark">
                        <div class="card-header">
                            <h2 class="card-title h5">{{ note.title }}</h2>
                        </div>
                        <div class="card-body">
                            {{ note.note }}
                        </div>
                        <div class="card-footer">
                            <button class="btn btn-primary" @click="editNote(index)">Edit</button>
                            <button class="btn btn-secondary" @click="deleteNote(index)">Delete</button>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
</template>

<script>
export default {
    data() {
        return {
            isLoading: false,
            errors: [],
            noteLimit: 140,
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
</style>
<template>
       <div class="column col-8">
            <div class="columns notes">
                <div class="column col-4 my-2" v-for="(note, index) in notes" :key="note.index">
                    <div class="card text-dark">
                        <div class="card-header">
                            <h2 class="card-title h5">{{ note.title }}</h2>
                        </div>
                        <div class="card-body">
                            {{ note.note }}
                        </div>
                        <div class="card-footer">
                            <button class="btn btn-primary" @click="editNote(index)"><i class="icon icon-edit"></i></button>
                            <button class="btn btn-error" @click="deleteNote(index)"><i class="icon icon-delete"></i></button>
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
        
    }
}
</script>
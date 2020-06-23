<template>
    <div class="container">
        <navbar/>
        <div class="form-group" :class="{ 'has-error': errors.some(e => e.type === 'title')}">
            <mdb-input type="text" size="lg" label="Title" outline v-model="note.title"/>
            <p class="form-input-hint" v-if="titleErrors">{{ titleErrors.text }}</p>
        </div>

        <div class="editor">
            <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
                <div class="menubar">

                    <mdb-btn outline="primary" class="menubar__button" :class="{ 'is-active': isActive.bold() }" @click="commands.bold" >
                        <mdb-icon icon="bold" />
                    </mdb-btn>

                    <mdb-btn outline="primary" class="menubar__button" :class="{ 'is-active': isActive.italic() }" @click="commands.italic">
                        <mdb-icon icon="italic" />
                    </mdb-btn>

                    <mdb-btn outline="primary" class="menubar__button" :class="{ 'is-active': isActive.strike() }" @click="commands.strike">
                        <mdb-icon icon="strikethrough" />
                    </mdb-btn>

                    <mdb-btn outline="primary" class="menubar__button" :class="{ 'is-active': isActive.underline() }" @click="commands.underline">
                        <mdb-icon icon="underline" />
                    </mdb-btn>

                    <mdb-btn outline="primary" class="menubar__button" :class="{ 'is-active': isActive.code() }" @click="commands.code">
                        <mdb-icon icon="code" />
                    </mdb-btn>

                    <mdb-btn outline="primary" class="menubar__button" :class="{ 'is-active': isActive.heading({ level: 1 }) }"  @click="commands.heading({ level: 1 })">
                        <b>H1</b>
                    </mdb-btn>

                    <mdb-btn outline="primary" class="menubar__button" :class="{ 'is-active': isActive.heading({ level: 2 }) }"  @click="commands.heading({ level: 2 })">
                        <b>H2</b>
                    </mdb-btn>

                    


                    <mdb-btn outline="primary" class="menubar__button" :class="{ 'is-active': isActive.bullet_list() }" @click="commands.bullet_list">
                        <mdb-icon icon="list-ul" />
                    </mdb-btn>

                    <mdb-btn outline="primary" class="menubar__button" :class="{ 'is-active': isActive.ordered_list() }"  @click="commands.ordered_list">
                        <mdb-icon icon="list-ol" />
                    </mdb-btn>

                    <mdb-btn outline="primary" class="menubar__button" @click="commands.horizontal_rule" >
                        <mdb-icon icon="ruler-horizontal" />
                    </mdb-btn>

                    <mdb-btn outline="primary" class="menubar__button" @click="commands.undo" >
                        <mdb-icon icon="undo" />
                    </mdb-btn>

                    <mdb-btn outline="primary" class="menubar__button" @click="commands.redo" >
                        <mdb-icon icon="redo" />
                    </mdb-btn>

                </div>
            </editor-menu-bar>
        <div class="textField">
            <editor-content class="editor__content" :editor="editor" />
        </div>

        <mdb-btn gradient="blue" type="submit" class="btn btn-primary" @click="saveNote" :class="{loading: isLoading}" rounded>{{ editingMode ? 'Update' : 'Save' }} note</mdb-btn>
        <mdb-btn gradient="peach" type="button" class="btn" @click="cancelEdit" v-show="editingMode">Cancel</mdb-btn>
        </div>
    </div>
</template>

<script>
import { mdbIcon } from "mdbvue";
import { mdbInput } from 'mdbvue';
    import { mdbBtn } from 'mdbvue';
    import navbar from './Navbar';
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
} from 'tiptap-extensions'
import { mapGetters } from 'vuex'


export default {
    name:'Note',
    components:{
        EditorContent,
        EditorMenuBar,
        mdbIcon,
        mdbInput,
        mdbBtn,
        navbar,
    },
    data() {
        return {
            editor: new Editor({
                    extensions: [
                    new Blockquote(),
                    new BulletList(),
                    new CodeBlock(),
                    new HardBreak(),
                    new Heading({ levels: [1, 2, 3] }),
                    new HorizontalRule(),
                    new ListItem(),
                    new OrderedList(),
                    new TodoItem(),
                    new TodoList(),
                    new Link(),
                    new Bold(),
                    new Code(),
                    new Italic(),
                    new Strike(),
                    new Underline(),
                    new History(),
                    ],
                        content:'',
                        onUpdate: ({  getHTML }) => { //getJSON
                this.note.note = getHTML()
                this.$store.commit("SET_NOTE", getHTML() )
            
                },
            }),
    
            isLoading: false,
            errors: [],
            showSucces: false,

            notes: []
        }
    },
    mounted() {
        this.editor.setContent(this.note.note)

    },
    beforeDestroy() {
        this.editor.destroy()
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

            } else {
                if (this.editingMode) {
                    this.notes[this.editingIndex] = this.note;
                    this.editor.setContent('');
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
            this.editor.content = this.notes[index].note;
        },
        cancelEdit(){
            this.editor.setContent('')
            this.$store.commit("SET_TITLE", '')
            this.$store.commit("SET_NOTE", '')
            this.editingMode = false;
            this.editingIndex = null;
            this.errors = [];
            this.note = {title: '', note:''};
            this.$store.dispatch("endEditing")
        },
        deleteNote(index) {
            this.notes.splice(index,1);
            localStorage.setItem('notes', JSON.stringify(this.notes));
        },


        clearMessage() {
            this.showSucces = false;
        },
        clearContent() {
            this.editor.clearContent(true)
            this.editor.focus()
            },
            setContent() {
                // you can pass a json document
                this.editor.setContent({
                    type: 'doc',
                    content: [{
                    type: 'paragraph',
                    content: [
                        {
                        type: 'text',
                        text: 'This is some inserted text. 👋',
                        },
                    ],
                    }],
                }, true)
                // HTML string is also supported
                // this.editor.setContent('<p>This is some inserted text. 👋</p>')
                this.editor.focus()
        },
    }
}
</script>

<style lang="scss" scoped>
    .container{
        
        max-width: 80%;
        background-color: white;
        border-radius:15px;
        padding:20px;
        margin-top: 30px;
        border-width: 2px;
        border-color: black;
        border-style: solid;
    }

    .menubar{
        display: flex;
        flex-flow: row;
        justify-content: space-between;
    }

    .menubar_button{
        width:100px;
    }

    .textField{
        height: 300px;
        padding:20px;
        border-width: 2px;
        border-radius:15px;
        border-color: rgba(255,255,255, 0.05);;
        border-style: solid;
    }
    .actions {
    max-width: 30rem;
    margin: 0 auto 2rem auto;
    }
    .export {
    max-width: 30rem;
    margin: 0 auto 2rem auto;
    pre {
        padding: 1rem;
        border-radius: 5px;
        font-size: 0.8rem;
        font-weight: bold;
        background: rgba(255,255,255, 0.05);
        color: rgba(255,255,255, 0.8);
    }
    code {
        display: block;
        white-space: pre-wrap;
    }
    }
    .textArea{
        resize: none;
    };

    .card{
        color:black;
    };
    .editor{
        height:400%;
    }
</style>
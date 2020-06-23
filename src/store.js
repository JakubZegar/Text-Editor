import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    note:{
      title:'',
      note:'',
    },
    editingMode:false,
    editingIndex:null,
  },
  mutations: {
    SET_TITLE(state, title){
      state.note.title = title
    },
    SET_NOTE(state,note){
      state.note.note = note
    },
    SET_EDITING_INDEX(state,index){
      state.editingIndex = index
    }
    
  
  },
  actions: {
    startEditing(){
      this.state.editingMode = true;
    },
    endEditing(){
      this.state.editingMode = false;
    }
  },

  getters:{
    note(state){
      return state.note;
    },

    editingMode(state){
      return state.editingMode;
    },

    editingIndex(state){
      return state.editingIndex;
    }
  }
})

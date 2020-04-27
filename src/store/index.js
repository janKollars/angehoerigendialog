import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const initialState = {
  answers: {},
  updshowNotes: false,
  newNotes: '',
  notes: '',
  prevQuestionLabel: ''
};

export default new Vuex.Store({
  state: { ...initialState },
  getters: {
    getFieldCompletion: state => fieldId => {
      return state.answers[fieldId]?.done;
    },
    getFieldValue: state => fieldId => {
      return state.answers[fieldId]?.value;
    },
    getSectionCompletion: state => sectionId => {
      for (const key in state.answers) {
        if (
          key.startsWith(`${sectionId}-`) &&
          state.answers[key].done !== true
        ) {
          return false;
        }
      }
      return true;
    },
    getShowNotes: state => {
      return state.updshowNotes;
    },
    getNewNotes: state => {
      return state.newNotes;
    },
    getNotes: state => {
      return state.notes;
    },
    getPrevQuestionLabel: state => {
      return state.prevQuestionLabel;
    }
  },
  mutations: {
    resetState(state) {
      Object.assign(state, { ...initialState });
    },
    /**
     * Update the completion state of fields
     * @param {*} state
     * @param {Object} data
     * @param {string[]} data.fieldIds - The list of the answer IDs to receive the value
     * @param {boolean} data.value - The value to be set
     */
    updateAnswerCompletion(state, { fieldIds, value }) {
      for (const fieldId of fieldIds) {
        if (!Object.hasOwnProperty.call(state.answers, fieldId)) {
          Vue.set(state.answers, fieldId, {});
        }
        Vue.set(state.answers[fieldId], 'done', value);
      }
    },
    updateAnswerValue(state, { fieldId, value }) {
      if (!Object.hasOwnProperty.call(state.answers, fieldId)) {
        Vue.set(state.answers, fieldId, {});
      }
      Vue.set(state.answers[fieldId], 'value', value);
    },
    updateShowNotes(state, newVal) {
      state.updshowNotes = newVal;
    },
    saveNewNotes(state, newVal) {
      state.newNotes = newVal;
    },
    saveNotes(state, newVal) {
      state.notes = newVal;
    },
    savePrevQuestionLabel(state, newVal) {
      state.prevQuestionLabel = newVal;
    }
  },
  strict: process.env.NODE_ENV !== 'production',
  plugins: [createPersistedState()]
});

import { createStore } from "vuex";

export const store = createStore({
  state: {
    json: '',
    template: ''
  },
  mutations: {
    setJsonValue(state, value) {
      state.json = value
    },

    setTemplateValue(state, value) {
      state.template = value
    }
  }
})
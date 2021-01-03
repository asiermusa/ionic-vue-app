import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
  state () {
    return {
      count: 0
    }
  },
  mutations: {
    INCREMENT (state, value) {
      state.count = value
    }
  }
})

export default store
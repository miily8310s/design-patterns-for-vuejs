import axios from "axios";
import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      user: undefined,
    };
  },
  mutations: {
    updateUser(state: { user: any }, user: any) {
      state.user = user;
    },
  },
  actions: {
    login: async (
      { commit }: { commit: any },
      { username, password }: { username: string; password: string }
    ) => {
      const response = await axios.post("/login", { username, password });
      commit("updateUser", response.data);
    },
  },
});

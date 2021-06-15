import Vue from 'vue'
import Vuex from 'vuex'
import MainStore from '@/layout/components/tabs/MainStore';

import state from "./state";
import mutations from "./mutations";
import getters from "./getters";
import actions from "./actions";

Vue.use(Vuex)

export default new Vuex.Store({
  state: state,
  mutations: mutations,
  getters: getters,
  actions: actions,
  modules: {
    MainStore,
  }
})

import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import mutations from './mutations';

Vue.use(Vuex);

const state = {
    cartList: {} // 加入购物车的商品列表
};

export default new Vuex.Store({
  state,
  getters,
  mutations
});

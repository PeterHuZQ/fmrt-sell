import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import mutations from './mutations';

Vue.use(Vuex);

const state = {
    cartList: {}, // 加入购物车的商品列表
    selectType: 2, // 选择评价类型：ALL、POSITIVE、NEGATIVE
    onlyContent: false  // 选择是否只看有内容的评价
};

export default new Vuex.Store({
  state,
  getters,
  mutations
});

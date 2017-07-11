import * as types from './mutation-types';

export default {
    // 加入购物车
    [types.ADD_SHOPCART](state, {food_id, name, price}) {
        let cart = state.cartList;
        if (!cart[food_id]) {
            cart[food_id] = {
                food_id: food_id,
                name: name,
                price: price,
                count: 1
            };
        } else {
            cart[food_id]['count']++;
        }
        state.cartList = { ...cart };
    },
    // 移出购物车
    [types.REDUCE_SHOPCART](state, {food_id}) {
        let cart = state.cartList;
        cart[food_id]['count']--;
        state.cartList = { ...cart };
    },
    // 清空购物车
    [types.EMPTY_SHOPCART](state) {
        state.cartList = {};
    },

    // 记录当前选择的评价类型
    [types.SELECTTYPE_RATING](state, {type}) {
        state.selectType = type;
    },

    // 记录当前选择是否只看有内容的评价
    [types.ONLYCONTENT_RATING](state) {
        state.onlyContent = !state.onlyContent;
    }
};

import * as types from './mutation-types';

export default {
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
    [types.REDUCE_SHOPCART](state, {food_id, name, price}) {
        let cart = state.cartList;
        cart[food_id]['count']--;
        state.cartList = { ...cart };
    },
    [types.EMPTY_SHOPCART](state) {
        state.cartList = {};
    }
};

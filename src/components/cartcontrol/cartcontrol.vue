<template>
    <div class="cartcontrol">
        <!--减少-->
        <div class="cart-decrease icon-remove_circle_outline" v-show="selectFoods[food.food_id]?selectFoods[food.food_id].count>0:false" @click.stop="decreaseCart"></div>
        <!--数量-->
        <div class="cart-count" v-show="selectFoods[food.food_id]?selectFoods[food.food_id].count:''">{{selectFoods[food.food_id]?selectFoods[food.food_id].count:''}}</div>
        <!--增加-->
        <div class="cart-add icon-add_circle" @click.stop="addCart"></div>
    </div>
</template>

<script type="text/ecmascript-6">
    import * as types from '../../store/mutation-types';
    import {mapState} from 'vuex';

    export default {
        props: {
            food: {
                type: Object
            }
        },
        computed: {
            ...mapState([
                'cartList'
            ]),
            // 监听cartList变化，更新当前商铺的购物车信息selectFoods
            selectFoods: function () {
                return Object.assign({}, this.cartList);
            }
        },
        methods: {
            addCart(event) {
                // 防止PC端被多次点击
                if (!event._constructed) {
                   return;
                }
                this.$store.commit(types.ADD_SHOPCART, { food_id: this.food.food_id, name: this.food.name, price: this.food.price });
            },
            decreaseCart(event) {
                // 防止PC端被多次点击
                if (!event._constructed) {
                    return;
                }
                this.$store.commit(types.REDUCE_SHOPCART, { food_id: this.food.food_id });
            }
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .cartcontrol
        font-size: 0
        .cart-decrease
            display: inline-block
            // 增加被点击区域
            padding: 6px
            line-height: 24px
            font-size: 24px
            color: rgb(0, 160, 220)
        // 数量样式
        .cart-count
            display: inline-block
            vertical-align: top
            width: 12px
            padding-top: 6px
            line-height: 24px
            text-align: center
            font-size: 10px
            color: rgb(147, 153, 159)
        .cart-add
            display: inline-block
            // 增加被点击区域
            padding: 6px
            line-height: 24px
            font-size: 24px
            color: rgb(0, 160, 220)
</style>

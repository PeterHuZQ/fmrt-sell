<template>
    <div class="cartcontrol">
        <!--减少-->
        <div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0" @click="decreaseCart"></div>
        <!--数量-->
        <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
        <!--增加-->
        <div class="cart-add icon-add_circle" @click="addCart"></div>
    </div>
</template>

<script type="text/ecmascript-6">
    import Vue from 'vue';

    export default {
        props: {
            food: {
                type: Object
            }
        },
        methods: {
            addCart(event) {
                // 防止PC端被多次点击
                if (!event._constructed) {
                   return;
                }
                if (!this.food.count) {
                   Vue.set(this.food, 'count', 1);
                } else {
                   this.food.count++;
                }
            },
            decreaseCart(event) {
                // 防止PC端被多次点击
                if (!event._constructed) {
                    return;
                }
                if (this.food.count) {
                    this.food.count--;
                }
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

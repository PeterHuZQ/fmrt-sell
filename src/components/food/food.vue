<template>
    <div v-show="showFlag" class="food" ref="food">
        <div class="food-content">
            <!--商品图片-->
            <div class="image-header">
                <img :src="food.image">
                <div class="back" @click="hide">
                    <i class="icon-arrow_lift"></i>
                </div>
            </div>
            <!--商品信息-->
            <div class="content">
                <h1 class="title">{{food.name}}</h1>
                <div class="detail">
                    <span class="sell-count">月售{{food.sellCount}}份</span>
                    <span class="rating">好评率{{food.rating}}</span>
                </div>
                <div class="price">
                    <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                    <!--购买按钮组件-->
                    <cartcontrol :food="food"></cartcontrol>
                </div>
                <div class="buy" v-show="(selectFoods[food.food_id]?selectFoods[food.food_id].count===0:true)" @click.stop="addFirst">加入购物车</div>
            </div>
            <!--分割线组件split-->
            <split v-show="food.info"></split>
            <!--商品介绍-->
            <div class="info" v-show="food.info">
                <h1 class="title">商品介绍</h1>
                <p class="text">{{food.info}}</p>
            </div>
            <!--分割线组件split-->
            <split></split>
            <!--商品评价-->
            <div class="rating">
                <h1 class="title">商品评价</h1>
                <!--商品评价组件-->
                <ratingselect :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings"></ratingselect>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import * as types from '../../store/mutation-types';
    import {mapState} from 'vuex';

    import BScroll from 'better-scroll';
    import cartcontrol from '../cartcontrol/cartcontrol.vue';
    import split from '../split/split.vue';
    import ratingselect from '../ratingselect/ratingselect.vue';

    // const POSITIVE = 0;
    // const NEGATIVE = 1;
    const ALL = 2;

    export default {
        props: {
            food: {
                type: Object
            }
        },
        data() {
            return {
                // 用于表示商品详情页是收起还是展开状态
                showFlag: false,
                // 传给商品评价组件ratingselect的默认参数，选择评价类型：ALL、POSITIVE、NEGATIVE
                selectType: ALL,
                onlyContent: true,
                desc: {
                    all: '全部',
                    positive: '推荐',
                    negative: '吐槽'
                }
            };
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
            // 展现商品详情组件food
            show() {
                this.showFlag = true;
                // 传给商品评价组件ratingselect的参数
                this.selectType = ALL;
                this.onlyContent = false;
                // 初始化better-scroll
                this.$nextTick(() => {
                    if (!this.scroll) {
                        this.scroll = new BScroll(this.$refs.food, {
                            click: true
                        });
                    } else {
                        this.scroll.refresh();
                    }
                });
            },
            // 点击返回按钮触发
            hide() {
                this.showFlag = false;
            },
            // 点击事件：加入购物车
            addFirst(event) {
                // 防止PC端多次点击
                if (!event._constructed) {
                    return;
                }
                this.$store.commit(types.ADD_SHOPCART, { food_id: this.food.food_id, name: this.food.name, price: this.food.price });
            }
        },
        components: {
            // 注册组件
            'cartcontrol': cartcontrol,
            'split': split,
            'ratingselect': ratingselect
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl"

    .food
        position: fixed
        left: 0
        top: 0
        bottom: 48px
        z-index: 30
        width: 100%
        background: #fff
        .image-header
            position: relative
            width: 100%
            height: 0
            padding-top: 100%
            img
                position: absolute
                top: 0
                left: 0
                width: 100%
                height: 100%
            .back
               position: absolute
               top: 10px
               left: 0
               .icon-arrow_lift
                  display: block
                  // 增加按钮的点击区域
                  padding: 10px
                  font-size: 20px
                  color: #fff
        .content
            position: relative
            padding: 18px
            .title
                margin: 0
                line-height: 14px
                margin-bottom: 8px
                font-size: 14px
                font-weight: 700
                color: rgb(7, 17, 27)
            .detail
                margin-bottom: 18px
                line-height: 10px
                height: 10px
                font-size: 0
                .sell-count, .rating
                    font-size: 10px
                    color: rgb(147, 153, 159)
                .sell-count
                    margin-right: 12px
            .price
                font-weight: 700
                line-height: 24px
                .now
                    margin-right: 8px
                    font-size: 14px
                    color: rgb(240, 20, 20)
                .old
                    text-decoration: line-through
                    font-size: 10px
                    color: rgb(147, 153, 159)
            .cartcontrol-wrapper
                position: absolute
                right: 12px
                bottom: 12px
            .buy
                position: absolute
                right: 18px
                bottom: 18px
                z-index: 10
                height: 24px
                line-height: 24px
                padding: 0 12px
                box-sizing: border-box
                border-radius: 12px
                font-size: 10px
                color: #fff
                background: rgb(0, 160, 220)
        .info
            padding: 18px
            .title
                margin: 0
                line-height: 14px
                margin-bottom: 6px
                font-size: 14px
                color: rgb(7, 17, 27)
            .text
                line-height: 24px
                padding: 0 8px
                font-size: 12px
                color: rgb(77, 85, 93)
        .rating
            padding-top: 18px
            .title
                margin: 0
                line-height: 14px
                margin-left: 18px
                font-size: 14px
                color: rgb(7, 17, 27)
</style>

<template>
    <div class="seller" ref="seller">
      <div class="seller-content">
        <div class="overview">
            <h1 class="title">{{seller.name}}</h1>
            <!-- 描述区块 -->
            <div class="desc border-1px">
                <!--star组件-->
                <star :size="36" :score="seller.score"></star>
                <span class="text">({{seller.ratingCount}})</span>
                <span class="text">月售{{seller.sellCount}}单</span>
            </div>
            <ul class="remark">
                <li class="block">
                    <h2>起送价</h2>
                    <div class="content">
                        <span class="stress">{{seller.minPrice}}</span>元
                    </div>
                </li>
                <li class="block">
                    <h2>商家配送</h2>
                    <div class="content">
                        <span class="stress">{{seller.deliveryPrice}}</span>元
                    </div>
                </li>
                <li class="block">
                    <h2>平均配送时间</h2>
                    <div class="content">
                        <span class="stress">{{seller.deliveryTime}}</span>分钟
                    </div>
                </li>
            </ul>
        </div>
        <!--分割线组件-->
        <split></split>
        <!-- 通告与活动区块 -->
        <div class="bulletin">
            <!-- 标题 -->
            <h1 class="title">公告与活动</h1>
            <!-- 文本 -->
            <div class="content-wrapper border-1px">
                <p class="content">{{seller.bulletin}}</p>
            </div>
            <!--优惠活动列表-->
            <ul v-if="seller.supports" class="supports">
                <li class="support-item border-1px" v-for="item in seller.supports" :key="item.id">
                    <!--图片-->
                    <span class="icon" :class="classMap[item.type]"></span>
                    <!--文字-->
                    <span class="text">{{item.description}}</span>
                </li>
            </ul>
        </div>
        <!--分割线组件-->
        <split></split>
      </div>
    </div>
</template>

 <script type="text/ecmascript-6">
    import BScroll from 'better-scroll';
    import star from '../star/star.vue';
    import split from '../split/split.vue';

    export default {
        props: {
            seller: {
                type: Object
            }
        },
        created() {
            this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
        },
        updated: function () {
            // 一进来就可以滚动屏幕
            this.$nextTick(() => {
                // 初始化better-scroll
                this._initScroll();
            });
        },
        mounted: function () {
            // tab切换时，可以滚动屏幕
            this.$nextTick(() => {
                // 初始化better-scroll
                this._initScroll();
            });
        },
        methods: {
            // 初始化better-scroll
            _initScroll() {
                if (!this.scroll) {
                    this.scroll = new BScroll(this.$refs.seller, {
                        click: true
                    });
                } else {
                    this.scroll.refresh();
                }
            }
        },
        components: {
            'star': star,
            'split': split
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl"

    .seller
        position: absolute
        top: 174px
        bottom: 0
        left: 0
        width: 100%
        overflow: hidden
        .overview
            position: relative
            padding: 18px
            .title
                width: 100%
                display: block
                margin: 0
                margin-bottom: 8px
                line-height: 14px
                color: rgb(7, 17, 27)
                font-size: 14px
            .desc
                padding-bottom: 18px
                border-1px(rgba(7, 17, 27, 0.1))
                font-size: 0
                .star
                    display: inline-block
                    margin-right: 8px
                    vertical-align: top
                .text
                    display: inline-block
                    margin-right: 12px
                    line-height: 18px
                    vertical-align: top
                    font-size: 10px
                    color: rgb(77, 85, 93)
            .remark
                display: flex
                padding-top: 18px
                .block
                    flex: 1
                    text-align: center
                    border-right: 1px solid rgba(7, 17, 27, 0.1)
                    &:last-child
                        border: none
                    h2
                        margin-bottom: 4px
                        line-height: 10px
                        font-size: 10px
                        color: rgb(147, 153, 159)
                    .content
                        line-height: 24px
                        font-size: 10px
                        color: rgb(7, 17, 27)
                        .stress
                            font-size: 24px
        .bulletin
            padding: 18px 18px 0 18px
            .title
                width: 100%
                display: block
                margin: 0
                margin-bottom: 8px
                line-height: 14px
                color: rgb(7, 17, 27)
                font-size: 14px
            .content-wrapper
                padding: 0 12px 16px 12px
                border-1px(rgba(7, 17, 27, 0.1))
                .content
                    line-height: 24px
                    font-size: 12px
                    color: rgb(240, 20, 20)
            .supports
                .support-item
                    padding: 16px 12px
                    border-1px(rgba(7, 17, 27, 0.1))
                    font-size: 0
                    &:last-child
                        border-none()
                .icon
                    display: inline-block
                    width: 16px
                    height: 16px
                    vertical-align: top
                    margin-right: 6px
                    background-size: 16px 16px
                    background-repeat: no-repeat
                    &.decrease
                        bg-image('decrease_4')
                    &.discount
                        bg-image('discount_4')
                    &.guarantee
                        bg-image('guarantee_4')
                    &.invoice
                        bg-image('invoice_4')
                    &.special
                        bg-image('special_4')
                    .text
                        line-height: 16px
                        font-size: 12px
                        color: rgb(7, 17, 27)       
</style>

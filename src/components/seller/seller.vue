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
            <!-- 收藏 -->
            <div class="favorite" @click="toggleFavorite">
                <!-- 图标 -->
                <span class="icon-favorite" :class="{'active':favorite}"></span>
                <span class="text">{{favoriteText}}</span>
            </div>
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
        <!-- 商家实景区块 -->
        <div class="pics">
            <h1 class="title">商家实景</h1>
            <div class="pic-wrapper" ref="picWrapper">
                <ul class="pic-list" ref="picList">
                    <li class="pic-item" :key="pic.id" v-for="pic in seller.pics">
                        <img :src="pic" width="120" height="90">
                    </li>
                </ul>
            </div>
        </div>
        <!--分割线组件-->
        <split></split>
        <!-- 商家信息区块 -->
        <div class="info">
            <h1 class="title border-1px">商家信息</h1>
            <ul>
                <li class="info-item" :key="info.id" v-for="info in seller.infos">{{info}}</li>
            </ul>
        </div>
      </div>
    </div>
</template>

 <script type="text/ecmascript-6">
    import BScroll from 'better-scroll';
    import star from '../star/star.vue';
    import split from '../split/split.vue';

    import {saveToLocal, loadFromLocal} from '../../common/js/store';
    export default {
        props: {
            seller: {
                type: Object
            }
        },
        data() {
            return {
                favorite: (() => {
                    // 从前端本地缓存读取
                    return loadFromLocal(this.seller.id, 'favorite', false);
                })()
            };
        },
        computed: {
            favoriteText() {
                return this.favorite ? '已收藏' : '收藏';
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
                // 商家实景左右滚动
                this._initPics();
            });
        },
        mounted: function () {
            // tab切换时，可以滚动屏幕
            this.$nextTick(() => {
                // 初始化better-scroll
                this._initScroll();
                // 商家实景左右滚动
                this._initPics();
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
            },
            // 商家实景左右滚动
            _initPics() {
                if (this.seller.pics) {
                    let picWidth = 120;
                    let margin = 6;
                    let width = (picWidth + margin) * this.seller.pics.length - margin;
                    this.$refs.picList.style.width = width + 'px';
                    if (!this.picScroll) {
                        this.picScroll = new BScroll(this.$refs.picWrapper, {
                            scrollX: true,
                            eventPassthrough: 'vertical'
                        });
                    } else {
                        this.picScroll.refresh();
                    }
                }
            },
            // 点击事件：收藏
            toggleFavorite(event) {
                // 防止PC端被多次点击
                if (!event._constructed) {
                    return;
                }
                this.favorite = !this.favorite;
                // 存储到前端本地缓存
                saveToLocal(this.seller.id, 'favorite', this.favorite);
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
            .favorite
                position: absolute
                width: 50px
                right: 11px
                top: 18px
                text-align: center
                .icon-favorite
                    display: block
                    margin-bottom: 4px
                    line-height: 24px
                    font-size: 24px
                    color: #d4d6d9
                    &.active
                        color: rgb(240, 20, 20)
                .text
                    padding: 0
                    line-height: 10px
                    font-size: 10px
                    color: rgb(77, 85, 93)
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
        .pics
            padding: 18px
            .title
                width: 100%
                display: block
                margin: 0
                margin-bottom: 12px
                line-height: 14px
                color: rgb(7, 17, 27)
                font-size: 14px
            .pic-wrapper
                width: 100%
                overflow: hidden
                white-space: nowrap
                .pic-list
                    font-size: 0
                .pic-item
                    display: inline-block
                    margin-right: 6px
                    width: 120px
                    height: 90px
                    &:last-child
                        margin: 0
        .info
            padding: 18px 18px 0 18px
            color: rgb(7, 17, 27)
            .title
                width: 100%
                display: block
                margin: 0
                padding-bottom: 12px
                line-height: 14px
                border-1px(rgba(7, 17, 27, 0.1))
                font-size: 14px
            .info-item
                padding: 16px 12px
                line-height: 16px
                border-1px(rgba(7, 17, 27, 0.1))
                font-size: 12px
                &:last-child
                    border-none()       
</style>

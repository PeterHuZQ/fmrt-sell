<template>
    <div class="header">
        <!--内容相关-->
        <div class="content-wrapper">
            <!--左边头像-->
            <div class="avatar">
                <img width="64" height="64" :src="seller.avatar">
            </div>
            <!--右边内容区-->
            <div class="content">
                <!--名称-->
                <div class="title">
                    <!--牌子-->
                    <span class="brand"></span>
                    <!--名字-->
                    <span class="name">{{seller.name}}</span>
                </div>
                <!--描述-->
                <div class="description">
                    {{seller.description}}/{{seller.deliveryTime}}分钟送达
                </div>
                <!--活动-->
                <div v-if="seller.supports" class="support">
                    <span class="icon" :class="classMap[seller.supports[0].type]"></span>
                    <span class="text">{{seller.supports[0].description}}</span>
                </div>
            </div>
            <!--活动个数-->
            <div v-if="seller.supports" class="support-count" @click="showDetail">
                <!--文字-->
                <span class="count">{{seller.supports.length}}个</span>
                <!--小的向右箭头-->
                <i class="icon-keyboard_arrow_right"></i>
            </div>
        </div>
        <!--公告区-->
        <div class="bulletin-wrapper" @click="showDetail">
            <!--图片、文字-->
            <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
            <!--小的向右箭头-->
            <i class="icon-keyboard_arrow_right"></i>
        </div>
        <!--背景图-->
        <div class="background">
            <img width="100%" height="100%" :src="seller.avatar">
        </div>
        <!--公告及活动详情-->
        <div class="detail" v-show="detailShow">
            <!--sticky-footers布局-->
            <!--外层容器wrapper-->
            <div class="detail-wrapper clearfix">
                <!--内容-->
                <div class="detail-main">
                    <!--名称-->
                    <h1 class="name">{{seller.name}}</h1>
                    <div class="star-wrapper">
                        <!--star组件-->
                        <star :size="48" :score="seller.score"></star>
                    </div>
                    <!--title组件,优惠信息-->
                    <flex-title :message="message1"></flex-title>
                    <!--优惠活动列表-->
                    <ul v-if="seller.supports" class="supports">
                        <li class="support-item" v-for="item in seller.supports" :key="item.id">
                            <!--图片-->
                            <span class="icon" :class="classMap[item.type]"></span>
                            <!--文字-->
                            <span class="text">{{item.description}}</span>
                        </li>
                    </ul>
                    <!--title组件,商家公告-->
                    <flex-title :message="message2"></flex-title>
                    <!--商家公告内容-->
                    <div class="bulletin">
                        <p class="content">{{seller.bulletin}}</p>
                    </div>
                </div>
            </div>
            <!--关闭按钮-->
            <div class="detail-close" @click="hideDetail">
                <i class="icon-close"></i>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import star from '../star/star.vue';
    import flextitle from '../flex-title/flex-title.vue';

    export default {
        props: {
            seller: {
                type: Object
            }
        },
        data() {
            return {
                detailShow: false,
                message1: '优惠信息',
                message2: '商家公告'
            };
        },
        methods: {
            // 点击展示公告及活动详情的方法
            showDetail() {
                this.detailShow = true;
            },
            // 点击X关闭公告及活动详情的方法
            hideDetail() {
                this.detailShow = false;
            }
        },
        created() {
            this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
        },
        components: {
            'star': star,
            'flex-title': flextitle
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl"

    .header
        position: relative
        overflow: hidden
        color: #fff
        background: rgba(7, 17, 27, 0.5)
        .content-wrapper
            position: relative
            padding: 24px 12px 18px 24px
            font-size: 0
            .avatar
                display: inline-block
                vertical-align: top
                img
                   border-radius: 2px
            .content
                display: inline-block
                margin-left: 16px
                .title
                    margin: 2px 47px 8px 0
                    .brand
                        display: inline-block
                        vertical-align: top
                        width: 38px
                        height: 18px
                        bg-image('brand')
                        background-size: 30px 18px
                        background-repeat: no-repeat
                    .name
                        margin-left: 6px
                        font-size: 16px
                        line-height: 18px
                        font-weight: bold
                .description
                    margin-bottom: 10px
                    line-height: 12px
                    font-size: 12px
                .support
                    // 图片
                    .icon
                        display: inline-block
                        vertical-align: top
                        width: 12px
                        height: 12px
                        margin-right: 4px
                        background-size: 12px 12px
                        background-repeat: no-repeat
                        &.decrease
                            bg-image('decrease_1')
                        &.discount
                            bg-image('discount_1')
                        &.guarantee
                            bg-image('guarantee_1')
                        &.invoice
                            bg-image('invoice_1')
                        &.special
                            bg-image('special_1')
                    // 文字
                    .text
                        line-height: 12px
                        font-size: 10px
            .support-count
                position: absolute
                right: 12px
                bottom: 14px
                padding: 0 8px
                height: 24px
                line-height: 24px
                // 圆角
                border-radius: 14px
                background: rgba(0, 0, 0, 0.2)
                text-align: center
                .count
                    vertical-align: top
                    font-size: 10px
                .icon-keyboard_arrow_right
                    margin-left: 2px
                    line-height: 24px
                    font-size: 10px
        .bulletin-wrapper
            position: relative
            height: 28px
            line-height: 28px
            padding: 0 22px 0 12px
            // 不折行，显示...
            white-space: nowrap
            overflow: hidden
            text-overflow: ellipsis
            background: rgba(7, 17, 27, 0.2)
            .bulletin-title
                display: inline-block
                vertical-align: top
                margin-top: 8px
                width: 22px
                height: 12px
                bg-image('bulletin')
                background-size: 22px 12px
                background-repeat: no-repeat
            .bulletin-text
                vertical-align: top
                margin: 0 4px
                font-size: 10px
            .icon-keyboard_arrow_right
                position: absolute
                font-size: 10px
                right: 12px
                top: 8px
        .background
            position: absolute
            top: 0
            left: 0
            width: 100%
            height: 100%
            z-index: -1
            // 模糊滤镜效果
            filter: blur(10px)
        .detail
            position: fixed
            z-index: 100
            top: 0
            left: 0
            width: 100%
            height: 100%
            // 内容超过屏幕高度可以滚动
            overflow: auto
            background: rgba(7, 17, 27, 0.8)
            // IOS手机上设置背景模糊
            backdrop-filter: blur(10px)
            // sticky-footers布局
            .detail-wrapper
                width: 100%
                min-height: 100%
                .detail-main
                    margin-top: 64px
                    padding-bottom: 64px
                    .name
                        line-height: 16px
                        text-align: center
                        font-size: 16px
                        font-weight: 700
                    .star-wrapper
                        margin-top: 18px
                        padding: 2px 0
                        // 居中
                        text-align: center
                    // 优惠活动列表
                    .supports
                        width: 80%
                        margin: 0 auto
                        .support-item
                            padding: 0 12px
                            margin-bottom: 12px
                            font-size: 0
                            &:last-child
                                margin-bottom: 0
                            // 图片
                            .icon
                                display: inline-block
                                width: 16px
                                height: 16px
                                vertical-align: top
                                margin-right: 6px
                                background-size: 16px 16px
                                background-repeat: no-repeat
                                &.decrease
                                    bg-image('decrease_2')
                                &.discount
                                    bg-image('discount_2')
                                &.guarantee
                                    bg-image('guarantee_2')
                                &.invoice
                                    bg-image('invoice_2')
                                &.special
                                    bg-image('special_2')
                            // 文字
                            .text
                                line-height: 16px
                                font-size: 12px
                    // 商家公告内容
                    .bulletin
                        width: 80%
                        // 水平居中
                        margin: 0 auto
                        .content
                            padding: 0 12px
                            line-height: 24px
                            font-size: 12px 
            .detail-close
                position: relative
                width: 32px
                height: 32px
                margin: -64px auto 0 auto
                clear: both
                font-size: 32px
</style>

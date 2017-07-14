<template>
    <div class="ratings" ref="ratings">
        <div class="ratings-content">
            <div class="overview">
                <div class="overview-left">
                    <h1 class="score">{{seller.score}}</h1>
                    <div class="title">综合评分</div>
                    <div class="rank">高于周边商家{{seller.rankRate}}%</div>
                </div>
                <div class="overview-right">
                    <div class="score-wrapper">
                        <span class="title">服务态度</span>
                        <!--star组件-->
                        <star :size="36" :score="seller.serviceScore"></star>
                        <span class="score">{{seller.serviceScore}}</span>
                    </div>
                    <div class="score-wrapper">
                        <span class="title">商品评分</span>
                        <!--star组件-->
                        <star :size="36" :score="seller.foodScore"></star>
                        <span class="score">{{seller.foodScore}}</span>
                    </div>
                    <div class="delivery-wrapper">
                        <span class="title">送达时间</span>
                        <span class="delivery">{{seller.deliveryTime}}分钟</span>
                    </div>
                </div>
            </div>
            <!--分割线组件-->
            <split></split>
            <!--商品评价组件-->
            <ratingselect :ratings="ratings"></ratingselect>
            <div class="rating-wrapper">
                <ul>
                    <!--needShow方法判断这条评价是否显示-->
                    <li v-show="needShow(rating.rateType,rating.text)" :key="rating.id" v-for="rating in ratings" class="rating-item">
                        <!--头像-->
                        <div class="avatar">
                            <img width="28" height="28" :src="rating.avatar">
                        </div>
                        <!--内容-->
                        <div class="content">
                            <!--用户名-->
                            <h1 class="name">{{rating.username}}</h1>
                            <!--评分-->
                            <div class="star-wrapper">
                                <!--star组件-->
                                <star :size="24" :score="rating.score"></star>
                                <!--送达时间-->
                                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
                            </div>
                            <!--内容文本-->
                            <p class="text">{{rating.text}}</p>
                            <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                                <!--图标-->
                                <span class="icon-thumb_up"></span>
                                <!--推荐-->
                                <span class="item" :key="item.id" v-for="item in rating.recommend">{{item}}</span>
                            </div>
                            <!--时间-->
                            <div class="time">
                                {{rating.rateTime | formatDate}}
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {mapState} from 'vuex';

    import BScroll from 'better-scroll';
    import {formatDate} from '../../common/js/date';

    import star from '../star/star.vue';
    import split from '../split/split.vue';
    import ratingselect from '../ratingselect/ratingselect.vue';

    const ALL = 2;
    const ERR_OK = 0;

    export default {
        props: {
            seller: {
                type: Object
            }
        },
        data() {
            return {
                ratings: []
            };
        },
        computed: {
            // 监听selectType、onlyContent变化
            ...mapState([
                'selectType',      // 选择评价类型
                'onlyContent'      // 选择是否只看有内容的评价
            ])
        },
        created() {
            this.$http.get('/api/ratings').then((response) => {
                response = response.body;
                if (response.errno === ERR_OK) {
                    this.ratings = response.data;
                    // console.log(this.ratings);
                    this.$nextTick(() => {
                        // 初始化better-scroll
                        this._initScroll();
                    });
                }
            });
        },
        methods: {
            // 初始化better-scroll
            _initScroll() {
                this.scroll = new BScroll(this.$refs.ratings, {
                    click: true
                });
            },
            needShow(type, text) {
                if (this.onlyContent && !text) {
                    return false;
                }
                if (this.selectType === ALL) {
                    return true;
                } else {
                    return type === this.selectType;
                }
            }
        },
        filters: {
            formatDate(time) {
                let date = new Date(time);
                return formatDate(date, 'yyyy-MM-dd hh:mm');  // 调用引入的JS模块
            }
        },
        components: {
            'star': star,
            'split': split,
            'ratingselect': ratingselect
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl"

    .ratings
        position: absolute
        top: 174px
        bottom: 0
        left: 0
        width: 100%
        overflow: hidden
        .overview
            display: flex
            padding: 18px 0
            .overview-left
                flex: 0 0 137px
                padding: 6px 0
                width: 137px
                border-right: 1px solid rgba(7, 17, 27, 0.1)
                text-align: center
                .score
                    margin-bottom: 6px
                    line-height: 28px
                    font-size: 24px
                    color: rgb(255, 153, 0)
                .title
                    margin: 0
                    display: block
                    width: 100% 
                    margin-bottom: 8px
                    line-height: 12px
                    font-size: 12px
                    color: rgb(7, 17, 27)
                .rank
                    line-height: 10px
                    font-size: 10px
                    color: rgb(147, 153, 159)
            .overview-right
                flex: 1
                padding: 6px 0 6px 24px
                .score-wrapper
                    margin-bottom: 8px
                    font-size: 0
                    .title
                        margin: 0
                        width: 23% 
                        display: inline-block
                        line-height: 18px
                        vertical-align: top
                        font-size: 12px
                        color: rgb(7, 17, 27)
                    .star
                        display: inline-block
                        margin: 0 12px
                        vertical-align: top
                    .score
                        display: inline-block
                        line-height: 18px
                        vertical-align: top
                        font-size: 12px
                        color: rgb(255, 153, 0)
                .delivery-wrapper
                    font-size: 0
                    .title
                        margin: 0
                        width: 23% 
                        display: inline-block
                        line-height: 18px
                        font-size: 12px
                        color: rgb(7, 17, 27)
                    .delivery
                        margin-left: 12px
                        font-size: 12px
                        color: rgb(147, 153, 159)
        .rating-wrapper
            padding: 0 18px
            .rating-item
                display: flex
                padding: 18px 0
                border-1px(rgba(7, 17, 27, 0.1))
                .avatar
                    flex: 0 0 28px
                    width: 28px
                    margin-right: 12px
                    img
                        border-radius: 50%
                .content
                    position: relative
                    flex: 1
                    .name
                        margin-bottom: 4px
                        line-height: 12px
                        font-size: 10px
                        color: rgb(7, 17, 27)
                    .star-wrapper
                        margin-bottom: 6px
                        font-size: 0
                        .star
                            display: inline-block
                            margin-right: 6px
                            vertical-align: top
                        .delivery
                            display: inline-block
                            vertical-align: top
                            line-height: 12px
                            font-size: 10px
                            color: rgb(147, 153, 159)
                    .text
                        margin-bottom: 8px
                        line-height: 18px
                        color: rgb(7, 17, 27)
                        font-size: 12px
                    .recommend
                        line-height: 16px
                        font-size: 0
                        .icon-thumb_up, .item
                            display: inline-block
                            margin: 0 8px 4px 0
                            font-size: 9px
                        .icon-thumb_up
                            color: rgb(0, 160, 220)
                        .item
                            padding: 0 6px
                            border: 1px solid rgba(7, 17, 27, 0.1)
                            border-radius: 1px
                            color: rgb(147, 153, 159)
                            background: #fff
                    .time
                        position: absolute
                        top: 0
                        right: 0
                        line-height: 12px
                        font-size: 10px
                        color: rgb(147, 153, 159)
</style>

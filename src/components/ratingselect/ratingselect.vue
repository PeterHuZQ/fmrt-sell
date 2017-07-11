<template>
    <div class="ratingselect">
        <!--选择评价类型-->
        <div class="rating-type border-1px">
            <span @click="select(2,$event)" class="block positive" :class="{'active':selectType===2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
            <span @click="select(0,$event)" class="block positive" :class="{'active':selectType===0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
            <span @click="select(1,$event)" class="block negative" :class="{'active':selectType===1}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
        </div>
        <!--选择是否只看有内容的评价-->
        <div @click="toggleContent" class="switch" :class="{'on':onlyContent}">
            <!--图标按钮-->
            <span class="icon-check_circle"></span>
            <span class="text">只看有内容的评价</span>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import * as types from '../../store/mutation-types';
    import {mapState} from 'vuex';

    const POSITIVE = 0;
    const NEGATIVE = 1;

    export default {
        props: {
            ratings: {
                type: Array,
                default() {
                    return [];
                }
            },
            // 评价类型文字描述
            desc: {
                type: Object,
                default() {
                    return {
                        all: '全部',
                        positive: '满意',
                        negative: '不满意'
                    };
                }
            }
        },
        computed: {
            ...mapState([
                'selectType',   // 选择评价类型
                'onlyContent'   // 选择是否只看有内容的评价
            ]),
            positives() {
                // 遍历ratings数组
                return this.ratings.filter((rating) => {
                    return rating.rateType === POSITIVE;
                });
            },
            negatives() {
                // 遍历ratings数组
                return this.ratings.filter((rating) => {
                    return rating.rateType === NEGATIVE;
                });
            }
        },
        methods: {
            // 点击事件: 选择评价类型
            select(type, event) {
                // 防止PC端多次点击
                if (!event._constructed) {
                    return;
                }
                this.$store.commit(types.SELECTTYPE_RATING, { type: type });
            },
            // 点击事件: 选择是否只看有内容的评价
            toggleContent(event) {
                if (!event._constructed) {
                    return;
                }

                this.$store.commit(types.ONLYCONTENT_RATING);
            }
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl"

    .ratingselect
        .rating-type
            padding: 18px 0
            margin: 0 18px
            border-1px(rgba(7, 17, 27, 0.1))
            font-size: 0
            .block
                display: inline-block
                padding: 8px 12px
                margin-right: 8px
                line-height: 16px
                // 圆角
                border-radius: 1px
                // 字体大小
                font-size: 12px
                color: rgb(77, 85, 93)
                // block选中的样式
                &.active
                    // 字体颜色
                    color: #fff
                .count
                    margin-left: 2px
                    font-size: 8px
                &.positive
                    background: rgba(0, 160, 220, 0.2)
                    // positive选中的样式
                    &.active
                        background: rgb(0, 160, 220)
                &.negative
                    background: rgba(77, 85, 93, 0.2)
                    // negative选中的样式
                    &.active
                        background: rgb(77, 85, 93)
        .switch
            padding: 12px 18px
            line-height: 24px
            border-bottom: 1px solid rgba(7, 17, 27, 0.1)
            color: rgb(147, 153, 159)
            font-size: 0
            &.on
                .icon-check_circle
                   color: #00c850
            .icon-check_circle
                display: inline-block
                vertical-align: top
                margin-right: 4px
                font-size: 24px
            .text
                display: inline-block
                vertical-align: top
                font-size: 12px
</style>

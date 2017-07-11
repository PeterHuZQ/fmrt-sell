<template>
    <div class="goods">
        <!--左侧商品分类-->
        <div class="menu-wrapper" ref="menuWrapper">
            <ul>
                <li v-for="(item,index) in goods" :key="item.id" class="menu-item" :class="{'current':currentIndex===index}" @click="selectMenu(index,$event)">
                    <span class="text border-1px">
                        <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
                    </span>
                </li>
            </ul>
        </div>
        <!--右侧商品列表-->
        <div class="foods-wrapper" ref="foodsWrapper">
            <ul>
                <li v-for="item in goods" :key="item.id" class="food-list food-list-hook">
                    <h1 class="title">{{item.name}}</h1>
                    <ul>
                        <li v-for="food in item.foods" :key="food.food_id" class="food-item border-1px" @click="selectFood(food,$event)">
                            <!--商品图片-->
                            <div class="icon">
                                <img width="57" height="57" :src="food.icon">
                            </div>
                            <!--商品内容-->
                            <div class="content">
                                <!--商品名称-->
                                <h2 class="name">{{food.name}}</h2>
                                <!--商品描述-->
                                <p class="desc">{{food.description}}</p>
                                <!--额外信息-->
                                <div class="extra">
                                    <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                                </div>
                                <!--商品价格-->
                                <div class="price">
                                    <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                                </div>
                                <div class="cartcontrol-wrapper">
                                    <!--购买按钮组件-->
                                    <cartcontrol :food="food"></cartcontrol>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <!--购物车组件-->
        <shopcart :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
        <!--商品详情页组件-->
        <food :food="selectedFood" ref="food"></food>
    </div>
</template>

<script type="text/ecmascript-6">
    import BScroll from 'better-scroll';
    import shopcart from '../shopcart/shopcart.vue';
    import cartcontrol from '../cartcontrol/cartcontrol.vue';
    import food from '../food/food.vue';

    const ERR_OK = 0;

    export default {
        props: {
            seller: {
                type: Object
            }
        },
        data() {
            return {
                goods: [],
                listHeight: [],
                scrollY: 0,
                selectedFood: {}
            };
        },
        computed: {
            // 右侧商品列表上下滑动，计算左侧商品分类的索引
            currentIndex() {
                for (let i = 0; i < this.listHeight.length; i++) {
                    let height1 = this.listHeight[i];
                    let height2 = this.listHeight[i + 1];
                    if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
                        return i;
                    }
                }
                return 0;
            }
        },
        created() {
            this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];

            this.$http.get('/api/goods').then((response) => {
                response = response.body;
                if (response.errno === ERR_OK) {
                    this.goods = response.data;
                    // console.log(this.goods);
                    this.$nextTick(() => {
                        // 初始化better-scroll
                        this._initScroll();
                        // 计算高度
                        this._calculateHeight();
                    });
                }
            });
        },
        methods: {
            // 初始化better-scroll
            _initScroll() {
                this.menuScroll = new BScroll(this.$refs.menuWrapper, {
                    click: true
                });

                this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
                    click: true,
                    probeType: 3
                });
                // 在foodsScroll滚动的时候,实时拿到Y值(scrollY)
                this.foodsScroll.on('scroll', (pos) => {
                     this.scrollY = Math.abs(Math.round(pos.y));
                });
            },
            _calculateHeight() {
                let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
                let height = 0;
                this.listHeight.push(height);
                for (let i = 0; i < foodList.length; i++) {
                    let item = foodList[i];
                    height += item.clientHeight;
                    this.listHeight.push(height);
                }
            },
            // 点击事件：点击左侧商品分类，右侧会到相应位置的联动
            selectMenu(index, event) {
                // console.log(index);
                if (!event._constructed) {
                    return;
                }
                let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
                let el = foodList[index];
                this.foodsScroll.scrollToElement(el, 300);
            },
            // 点击事件: 展开商品详情页组件food.vue
            selectFood(food, event) {
                // 防止PC端多次点击
                if (!event._constructed) {
                    return;
                }
                this.selectedFood = food;
                // 调用子组件food.vue里的show()方法
                this.$refs.food.show();
            }
        },
        components: {
            'shopcart': shopcart,
            'cartcontrol': cartcontrol,
            'food': food
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl" 

    .goods
        display: flex
        position: absolute
        top: 174px
        bottom: 46px
        width: 100%
        // 超过部分要隐藏
        overflow: hidden
        // 左侧商品分类
        .menu-wrapper
            flex: 0 0 80px
            width: 80px
            background: #f3f5f7
            .menu-item
                display: table
                height: 56px
                width: 80px
                //padding: 0 12px
                line-height: 14px
                &.current
                    position: relative
                    z-index: 10
                    margin-top: -1px
                    background: #fff
                    font-weight: 700
                    .text
                        border-none()
                // 图片
                .icon
                    display: inline-block
                    vertical-align: top
                    width: 12px
                    height: 12px
                    margin-right: 2px
                    background-size: 12px 12px
                    background-repeat: no-repeat
                    &.decrease
                      bg-image('decrease_3')
                    &.discount
                      bg-image('discount_3')
                    &.guarantee
                      bg-image('guarantee_3')
                    &.invoice
                      bg-image('invoice_3')
                    &.special
                      bg-image('special_3')
                // 文字
                .text
                    display: table-cell
                    width: 56px
                    vertical-align: middle
                    border-1px(rgba(7, 17, 27, 0.1))
                    font-size: 12px
        // 右侧商品列表
        .foods-wrapper
            flex: 1
            .title
                margin: 0
                width: 100%
                padding-left: 14px
                height: 26px
                line-height: 26px
                border-left: 2px solid #d9dde1
                font-size: 12px
                color: rgb(147, 153, 159)
                background: #f3f5f7
            // Flex布局
            .food-item
                display: flex
                margin: 18px
                padding-bottom: 18px
                border-1px(rgba(7, 17, 27, 0.1))
                &:last-child
                    border-none()
                    margin-bottom: 0
                .icon
                    flex: 0 0 57px
                    margin-right: 10px
                .content
                    flex: 1
                    .name
                        margin: 2px 0 8px 0
                        height: 14px
                        line-height: 14px
                        font-size: 14px
                        color: rgb(7, 17, 27)
                    .desc, .extra
                        line-height: 10px
                        font-size: 10px
                        color: rgb(147, 153, 159)
                    .desc
                        line-height: 12px
                        margin-bottom: 8px
                    .extra
                        .count
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
                    // 购买按钮组件cartcontrol的样式
                    .cartcontrol-wrapper
                        position: absolute
                        right: 0
                        bottom: 12px               
</style>

<template>
  <div>
    <v-header :seller="seller"></v-header>
    <!-- 导航. -->
    <v-tab></v-tab>
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view :seller="seller"></router-view>
  </div>
</template>

 <script type="text/ecmascript-6">
  import {urlParse} from './common/js/util';
  import header from './components/header/header.vue';
  import tab from './components/tab/tab.vue';

  const ERR_OK = 0;

  export default {
    data() {
      return {
        seller: {
          id: (() => {
            let queryParam = urlParse();
            // console.log(queryParam);
            return queryParam.id;
          })()
        }
      };
    },
    created() {
      this.$http.get('/api/seller?id=' + this.seller.id).then(response => {
            // get body data
            response = response.body;
            // console.log(response);
            if (response.errno === ERR_OK) {
                // this.seller = response.data;
                // console.log(this.seller);
                // 给seller对象扩展属性的方法
                this.seller = Object.assign({}, this.seller, response.data);
                // console.log(this.seller.id);
            }
      }, response => {
            // error callback
      });
    },
    components: {
      'v-header': header,
      'v-tab': tab
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  
</style>

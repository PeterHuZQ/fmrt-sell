<template>
  <div>
    <v-header :seller="seller"></v-header>
    <!-- 导航. -->
    <v-tab></v-tab>
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from './components/header/header.vue';
  import tab from './components/tab/tab.vue';

  const ERR_OK = 0;

  export default {
    data() {
      return {
        seller: {}
      };
    },
    created() {
      this.$http.get('/api/seller').then(response => {
            // get body data
            response = response.body;
            // console.log(response);
            if (response.errno === ERR_OK) {
                this.seller = response.data;
                // console.log(this.seller);
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

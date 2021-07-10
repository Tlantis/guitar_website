<template>
  <div id="app">
    <!-- 路由占位符 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  created () {
    // 通过Vuex从后端获取和弦列表
    this.$store.dispatch('getChordsList')
    this.$store.commit('initializationChordsListOptions')
  }
}
</script>

<style>
</style>

<template>
  <div>
    <div class="w">
      <el-row type="flex" class="row-bg" justify="space-around">
        <el-col :span="24"><div class="grid-content ">C调常用和弦</div></el-col>
        <el-col :span="3"  v-for="item in chord" :key="item.id_chord">
            <div class="grid-content bg-purple-light" @click="chordPush(item)">
              <chord-child :title='chord[item.id_chord-1]'></chord-child>
            </div>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="space-around">
        <el-col :span="24"><div class="grid-content ">D调常用和弦</div></el-col>
        <el-col :span="3"  v-for="item in chord" :key="item.id_chord"><div class="grid-content bg-purple-light"><chord-child :title='chord[item.id_chord-1]'></chord-child></div></el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="space-around">
        <el-col :span="24"><div class="grid-content ">E调常用和弦</div></el-col>
        <el-col :span="3"  v-for="item in chord" :key="item.id_chord"><div class="grid-content bg-purple-light"><chord-child :title='chord[item.id_chord-1]'></chord-child></div></el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="space-around">
        <el-col :span="24"><div class="grid-content ">F调常用和弦</div></el-col>
        <el-col :span="3"  v-for="item in chord" :key="item.id_chord"><div class="grid-content bg-purple-light"><chord-child :title='chord[item.id_chord-1]'></chord-child></div></el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="space-around">
        <el-col :span="24"><div class="grid-content ">G调常用和弦</div></el-col>
        <el-col :span="3"  v-for="item in chord" :key="item.id_chord"><div class="grid-content bg-purple-light"><chord-child :title='chord[item.id_chord-1]'></chord-child></div></el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="space-around">
        <el-col :span="24"><div class="grid-content ">A调常用和弦</div></el-col>
        <el-col :span="3"  v-for="item in chord" :key="item.id_chord"><div class="grid-content bg-purple-light"><chord-child :title='chord[item.id_chord-1]'></chord-child></div></el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="space-around">
        <el-col :span="24"><div class="grid-content ">B调常用和弦</div></el-col>
        <el-col :span="3"  v-for="item in chord" :key="item.id_chord"><div class="grid-content bg-purple-light"><chord-child :title='chord[item.id_chord-1]'></chord-child></div></el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import ChordChild from './Chord/ChordChild.vue'
import { mapState } from 'vuex'
export default {
  components: {
    ChordChild
  },
  computed: {
    ...mapState(['chord'])
  },
  methods: {
    // 和弦详细跳转函数
    chordPush (item) {
      // console.log(item)
      // name 和 params 搭配
      // path 和 query 搭配
      this.$router.push({ name: 'eg', params: item })
    }
  }
}
</script>

<style lang="less" scoped>
  .el-row {
    margin-bottom: 20px;
    flex-wrap: wrap;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: rgb(51, 51, 51);
  }
  .bg-purple-light {
    background: rgb(167, 167, 167);
    &:hover{
      background: rgb(68, 68, 68);
      cursor:pointer;
    }
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
  }
</style>

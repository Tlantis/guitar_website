<template>
  <div>
    <div style="background: rgb(240, 240, 240);">
      <div class="w choice">
        <div>
          和弦选项
        <el-cascader :key="cascaderKey" v-if="cascader" :options="ChordsListOptions" ref="cascader" clearable filterable @change="chordChoise()"></el-cascader>
        </div>
        <div>
          <el-button type="info"  class="addChordButton" @click="cascaderKeyChange">cascaderKey</el-button>
        </div>
        <div>
          <el-button type="info"  class="addChordButton" @click="dialogVisible = true;">添加自定义和弦</el-button>
        </div>
      </div>
    </div>
    <div class="score">
      <div class="w">
        吉他谱
        <chord-child v-if="showChord" :title="showChord"></chord-child>
      </div>
    </div>
    <el-dialog title="添加和弦" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <div v-show="token">
        <add-chord></add-chord>
      </div>
      <div v-show="token == null">
        请先登录
      </div>
        <span v-show="token" slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button @click=" $store.commit('addChord/initializationAddChord')">重 置</el-button>
          <el-button type="primary" @click="dialogVisible = false; addChordConfirm()">确 定</el-button>
        </span>
        <span v-show="token == null" slot="footer" class="dialog-footer">
          <el-button type="primary">登 录</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import AddChord from './AddChord'
import ChordChild from './Chord/ChordChild'
import { mapState, mapGetters } from 'vuex'
export default {
  components: {
    AddChord,
    ChordChild
  },
  data () {
    return {
      dialogVisible: false,
      options: [],
      cascader: true,
      cascaderKey: 0,
      showChord: null,
      token: null
    }
  },
  computed: {
    ...mapState(['ChordsListOptions']),
    ...mapState(['chord']),
    ...mapGetters(['dtitle'])
  },
  created () {
    this.$store.commit('setChordsListOptions', ['chord', '0'])
  },
  updated () {
    if (window.sessionStorage.token) { // 实时获取token值来判断 后期维护.
      this.token = window.sessionStorage.token
    } else {
      this.token = null
    }
    if (this.token) { // 如果登录了
      this.$store.commit('setChordsListOptions', ['customChord', '1']) // 执行设置自定义和弦的函数
    }
  },
  watch: {
    token () {
      console.log('调用cascaderKeyChange')
      this.cascaderKeyChange()
    }
  },
  methods: {
    cascaderKeyChange () {
      this.cascaderKey += 1
      console.log('cascaderKeyChange发生变化' + this.cascaderKey)
    },
    chordChoise () { // cascader选中显示和弦事件
      if (!this.$refs.cascader.getCheckedNodes()[0]) { // 如果没有选中和弦
        this.showChord = null // 则清空showChord 取消组件渲染.
        return // 直接返回
      }
      this.showChord = this.$refs.cascader.getCheckedNodes()[0].data.info // 将选中的和弦赋值给show对象data
      // console.log(this.showChord)
    },
    handleClose (done) { // el-dialog关闭事件事件
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    addChordConfirm () { // 添加和弦确定事件
      this.$store.dispatch('addChord/addChordToDb') // 添加和弦到用户自定义和弦库操作
    }
  }
}
</script>

<style lang="less" scoped>
  .choice {
    display: flex;
    justify-content: space-between;
    height:60px;
    line-height: 60px;
  }
  .score {
    height: 600px;
    background: rgb(100, 100, 109);
  }
  .addChordButton {
    margin-left: 10px;
  }
  .el-dialog__footer{
    text-align: right;
  }
</style>

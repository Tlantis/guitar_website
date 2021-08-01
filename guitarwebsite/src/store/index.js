import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { Message } from 'element-ui'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    chord: [],
    chordList: { // 用于存放分类好的和弦数组
      C: [],
      D: [],
      E: [],
      F: [],
      G: [],
      A: [],
      B: []
    },
    ChordsListOptions: [], // Score组件中el-cascader联级选择器所需的数据
    customChord: [], // 用于渲染的自定义和弦数组
    customChordList: { // 用于存放分类好的自定义和弦数组
      C: [],
      D: [],
      E: [],
      F: [],
      G: [],
      A: [],
      B: []
    },
    customChordsListOptions: [] // Score组件中el-cascader联级选择器所需的自定义和弦数据
  },
  mutations: {
    ModifyChord (store, [data, res]) { // 初始化和弦信息函数 修改和弦符合页面渲染的格式modifyChord
      store[res] = []
      var modifyChord // 用来暂时存放该处理和弦
      for (var i = 0; i < data.length; i++) {
        modifyChord = {
          id_chord: '',
          name_chord: '',
          phonemicPoint_chord: [],
          pressHorizontally_chord: '',
          grade_chord: ''
        }
        // 将res中的data数据赋值给暂存data
        modifyChord.id_chord = data[i].id_chord
        modifyChord.name_chord = data[i].name_chord
        modifyChord.pressHorizontally_chord = data[i].pressHorizontally_chord
        modifyChord.grade_chord = data[i].grade_chord
        modifyChord.series = data[i].series
        modifyChord.series_id = data[i].series_id
        // 为phonemicPoint_chord数组赋值
        var phonemicPoint
        var phonemicPointModify = data[i].phonemicPoint_chord.split('.') // 分割成六条弦的数组
        var phonemicPointArray
        for (var j = 0; j < phonemicPointModify.length; j++) { // 该for循环赋值单个和弦的信息.
          phonemicPoint = { id: 0, point: '0', grades: [0, 0, 0, 0, 0], chordName: '' }
          phonemicPointArray = phonemicPointModify[j].split(' ')
          phonemicPoint.id = parseInt(phonemicPointArray[0])
          phonemicPoint.point = phonemicPointArray[1]
          phonemicPoint.grades = phonemicPointArray[2].split(',').map(Number)
          phonemicPoint.chordName = phonemicPointArray[3]
          modifyChord.phonemicPoint_chord.push(phonemicPoint)
        }
        store[res].push(modifyChord) // 将处理好的单个和弦数据push到data中.
      }
      this.commit('ModifychordList', res)
    },
    ModifychordList (store, res) { // 修改chordList函数将和弦分类放入和弦数组中 供setChordsListOptions使用
      console.log('调用了ModifychordList函数为customChordList赋值')
      store.customChordList = { // 清空customChordList重新赋值
        C: [],
        D: [],
        E: [],
        F: [],
        G: [],
        A: [],
        B: []
      }
      for (let i = 0; i < store[res].length; i++) { // 以series为依据分类存储和弦
        var series = store[res][i].series // 和弦系列(C系列)
        // var seriesId = store[res][i].series_id // 在系列中的id
        // store[res + 'List'][series][seriesId] = store[res][i] // 赋值操作
        store[res + 'List'][series].push(store[res][i])
      }
    },
    initializationChordsListOptions (store) { // 初始化ChordsListOptions操作
      var series = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
      for (let i = 0; i < series.length; i++) { // 循环 7 次
        store.ChordsListOptions[i] = { // 第一层 给 C和弦系列的value label 以及 children 赋值
          value: series[i], // series[0] 是C
          label: series[i] + '和弦',
          children: [{
            value: 'usually',
            label: '常用和弦',
            children: []
          }, {
            value: 'customChord',
            label: '自定义和弦',
            children: []
          }]
        }
      }
      store.ChordsListOptions.push({ key: 1 }) // 作为ChordsListOptions更新凭据
    },
    initializationChordsListOptionsCustomChordChildren (store) { // 清空ChordsListOptions自定义和弦
      console.log('调用了initializationChordsListOptionsCustomChordChildren')
      store.customChord = []
      store.customChord = []
      var series = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
      for (let i = 0; i < series.length; i++) { // 循环 7 次
        store.ChordsListOptions[i].children[1] = {
          value: 'customChord',
          label: '自定义和弦',
          children: []
        }
      }
      store.ChordsListOptions[7].key++ // 作为ChordsListOptions更新凭据
    },
    setChordsListOptions (store, [where, res]) { // 给Score组件中所需要的ChordsListOptions赋值
      console.log('调用了ChordsListOptions赋值函数')
      var series = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
      var chordList = store[where + 'List']
      for (let i = 0; i < series.length; i++) { // 循环 7 次
        for (let j = 0; j < chordList[series[i]].length; j++) { // 根据chordList.C 的长度进行循环
          if (chordList[series[i]][j] !== undefined) { // chordList.C[0] 是C和弦信息 如果存在
            // ChordsListOptions[0]是C和弦系列 children[0]是常用和弦 children[0]是第一个和弦 C
            // console.log(chordList[series[i]][j])
            // console.log(chordList[series[i]][j].name_chord)
            store.ChordsListOptions[i].children[res].children[j] = { // 第二层 给 C和弦系列下的每个和弦赋值
              value: chordList[series[i]][j].name_chord, // 值为每个和弦下的name_chord
              label: chordList[series[i]][j].name_chord,
              info: chordList[series[i]][j]
            }
          }
        }
      }
      store.ChordsListOptions[7].key++ // 作为ChordsListOptions更新凭据
    }
  },
  actions: {
    getChordsList (context) { // 获取和弦的异步函数
      // Vuex不是一个vue实例对象 因此不能使用Vue.prototype中的对象.
      axios.get('/chord/chordlist')
        .then(res => {
          if (res.status !== 200) {
            return this.$message.error('获取和弦失败')
          }
          const data = res.data.data
          const who = 'chord'
          context.commit('ModifyChord', [data, who]) // 调用ModifyChordlist处理和弦
        })
    },
    loginGetChordsList (context) { // 登录后获取自定义和弦的异步函数
      console.log('触发了loginGetChordsList函数')
      var username = {
        username: window.sessionStorage.username
      }
      const Qs = require('qs')
      var usernameJsonStr = Qs.stringify(username) // 将数据转变为json字符串
      axios.post('/chord/getCustomChordlist', usernameJsonStr)
        .then(res => {
          if (res.status !== 200) {
            return this.$message.error('获取和弦失败')
          }
          console.log(res)
          const data = res.data.data
          const who = 'customChord'
          context.commit('ModifyChord', [data, who]) // 调用ModifyChordlist处理和弦
          context.commit('setChordsListOptions', ['customChord', '1']) // 登录之后再调用ChordsListOptions赋值函数
        })
    }
  },
  getters: {
    dtitle: state => state.addChord.Chord, // 把addChord模块中的数据Chord包装成全局数据addChord
    updateChordsListOptions: state => state.ChordsListOptions[7].key
  },
  modules: {
    moduleUsers: {
      namespaced: true,
      state: {
        user: null
      },
      mutations: {
        getUser (store, user) {
          store.user = user
        },
        cleanUser (store) {
          store.user = null
        }
      },
      actions: {},
      getters: {}
    },
    // 子模块
    addChord: { // 添加和弦相关的模块
      namespaced: true, // 加锁 访问需要加子模块名字 addChord/getChord
      state: {
        Chord: { // 存放和弦信息的数组 修改完的和弦存放于此
          name_chord: 'C', // 和弦名称
          phonemicPoint_chord: [ // 和弦组成数组
            { id: 1, point: '0', grades: [0, 0, 0, 0, 0], EmptyScale: 5, chordName: '5' },
            { id: 2, point: '', grades: [1, 0, 0, 0, 0], EmptyScale: 12, chordName: '1' },
            { id: 3, point: '0', grades: [0, 0, 0, 0, 0], EmptyScale: 8, chordName: '8' },
            { id: 4, point: '', grades: [0, 1, 0, 0, 0], EmptyScale: 3, chordName: '5' },
            { id: 5, point: '', grades: [0, 0, 1, 0, 0], EmptyScale: 10, chordName: '1' },
            { id: 6, point: 'X', grades: [0, 0, 0, 0, 0], EmptyScale: 5, chordName: '0' }
          ],
          grade_chord: 1 // 品级
        },
        data: {} // 存放符合数据库格式的和弦数组
      },
      mutations: {
        initializationAddChord (store) { // 初始化和弦信息函数 将Chord还原 供Score组件中的重置按钮使用
          store.Chord = { // 存放和弦信息的数组
            name_chord: 'C', // 和弦名称
            phonemicPoint_chord: [ // 和弦组成数组
              { id: 1, point: '0', grades: [0, 0, 0, 0, 0], EmptyScale: 5, chordName: '5' },
              { id: 2, point: '', grades: [1, 0, 0, 0, 0], EmptyScale: 12, chordName: '1' },
              { id: 3, point: '0', grades: [0, 0, 0, 0, 0], EmptyScale: 8, chordName: '8' },
              { id: 4, point: '', grades: [0, 1, 0, 0, 0], EmptyScale: 3, chordName: '5' },
              { id: 5, point: '', grades: [0, 0, 1, 0, 0], EmptyScale: 10, chordName: '1' },
              { id: 6, point: 'X', grades: [0, 0, 0, 0, 0], EmptyScale: 5, chordName: '0' }
            ],
            grade_chord: '1', // 品级
            series: 'C',
            series_id: '1'
          }
        },
        formatChord (store) { // 格式化和弦对象 以方便存入数据库 在actions中的addChordToDb调用
          var data = { // 用于暂时存放可以放入数据库的和弦对象
            username: '',
            id_chord: 1,
            name_chord: 'C',
            phonemicPoint_chord: '1 0 0,0,0,0,0 E.2  1,0,0,0,0 C.3 0 0,0,0,0,0 G.4  0,1,0,0,0 C.5  0,0,1,0,0 C.6 X 0,0,0,0,0 ',
            pressHorizontally_chord: 0,
            grade_chord: '1',
            series: 'C',
            series_id: '1'
          }
          var phonemicPointChord = '' // 临时存储和弦组成数组字符串
          for (let i = 0; i < store.Chord.phonemicPoint_chord.length; i++) { // 循环和弦组成数组 将6条弦的详细合成一个字符串.
            var temporary = store.Chord.phonemicPoint_chord[i]
            phonemicPointChord = phonemicPointChord + temporary.id + ' ' + temporary.point + ' ' + temporary.grades + ' ' + temporary.chordName + '.'
          }
          phonemicPointChord = phonemicPointChord.substring(0, phonemicPointChord.lastIndexOf('.')) // 剔除最后一个.

          data.name_chord = store.Chord.name_chord
          data.phonemicPoint_chord = phonemicPointChord
          data.grade_chord = store.Chord.grade_chord
          data.series = store.Chord.name_chord.substring(0, 1).toUpperCase()
          data.username = window.sessionStorage.username // 获取用户名用于查询用户数据库.
          store.data = data
        }
      },
      actions: {
        addChordToDb (store) { // 添加和弦到数据库的异步操作 Score组件中的添加和弦 确认按钮使用
          store.commit('formatChord') // 调用格式化和弦函数 以方便存入数据库
          const Qs = require('qs')
          var ChordJsonStr = Qs.stringify(store.state.data) // 将数据转变为json字符串
          axios.post('/chord/setChordList', ChordJsonStr)
            .then(res => {
              // console.log(res.status)
              if (res.data.status !== 200) {
                return Message({
                  message: res.data.message,
                  type: 'warn'
                })
              }
              return Message({
                message: res.data.message,
                type: 'success'
              })
            })
        }
      },
      getters: {}
    }
  }
})

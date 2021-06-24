
// https://jp.vuejs.org/v2/examples/todomvc.html
var STORAGE_KEY = 'todos-vuejs-demo'
var todoStorage = {
  fetch: function () {
    var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    todos.forEach(function (todo, index) {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save: function (todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}

new Vue({
  el: '#app',

  data: {
    todos: [],
    current: -1,
    options: [
      { value: -1, label: 'すべて' },
      { value: 0, label: '作業中' },
      { value: 1, label: '完了' }
    ]
  },

  computed: {

    // ★STEP12
    computedTodos: function () {
      return this.todos.filter(function (el) {
        return this.current < 0 ? true : this.current === el.state
      }, this)
    },

    labels() {
      return this.options.reduce(function (a, b) {
        return Object.assign(a, { [b.value]: b.label })
      }, {})
      // キーから見つけやすいように、次のように加工したデータを作成
      // {0: '作業中', 1: '完了', -1: 'すべて'}
    }
  },

  // ★STEP8
  watch: {
    // オプションを使う場合はオブジェクト形式にする
    todos: {
      // 引数はウォッチしているプロパティの変更後の値
      handler: function (todos) {
        todoStorage.save(todos)
      },
      // deep オプションでネストしているデータも監視できる
      deep: true
    }
  },

  created() {
    // インスタンス作成時に自動的に fetch() する
    this.todos = todoStorage.fetch()
  },

  methods: {

    doAdd: function(event, value) {
      // ref で名前を付けておいた要素を参照
      var comment = this.$refs.comment
      var year = this.$refs.year
      var month = this.$refs.month
      var day = this.$refs.day
      var hour = this.$refs.hour
      var minute = this.$refs.minute
      // コメント入力がなければ何もしないで return
      if (!comment.value.length) {
        return
      }
      // { 新しいID, コメント, 作業状態, 年, 月, 日, 時間, 分 }
      // というオブジェクトを現在の todos リストへ push
      // 作業状態「state」はデフォルト「作業中=0」で作成
      this.todos.push({
        id: todoStorage.uid++,
        comment: comment.value,
        year: year.value,
        month: month.value,
        day: day.value,
        hour: hour.value,
        minute: minute.value,
        state: 0
      })
      // フォーム要素を空にする
      comment.value = ''
      year.value = ''
      month.value = ''
      day.value = ''
      hour.value = ''
      minute.value = ''
    },

    doChangeState: function (item) {
      item.state = !item.state ? 1 : 0
    },

    doRemove: function (item) {
      var index = this.todos.indexOf(item)
      this.todos.splice(index, 1)
    }

  }
})

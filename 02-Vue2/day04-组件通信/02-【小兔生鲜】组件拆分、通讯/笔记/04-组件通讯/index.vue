<template>
  <div>
    <h2>App组件</h2>
    <!-- 
      2、组件通讯
      组件通讯，是指组件与组件之间的数据传递。
      * 组件的数据独立的，无法直接访问其它组件的数据
      * 想用其它组件的数据 -> 组件通讯
      
      2.1、父传子语法：
        父：通过自定义子组件的属性的方式，向子组件传递数据

      2.2、子传父
      Vue 单向数据流：data & prop
      * data 和 prop 都是给组件提供数据的。
      * data 的数据由组件自己管理，组件本身可以随便改。
      * prop 的数据是父组件传递的，组件本身不能直接修改，要遵循【单向数据流】
      
      【单向数据流】父级 prop 的数据更新，会向下流动，影响子组件。这个数据流动是单向的。简单来说：就是谁的数据谁负责。
      
      子组件传递语法：
      子组件中： <button @click="$emit('事件名', 传递的数据)" />
      父组件中： <div @事件名="父组件方法" />
      

    -->
    
    <!-- <my-test :id="goodsList[0].id" :name="goodsList[0].name"></my-test> -->
    
    <!-- 值太多，直接传第一个对象
    <my-test :item="goodsList[0]"></my-test>
    <my-test :item="goodsList[1]"></my-test>
    <my-test :item="goodsList[2]"></my-test>
    -->
    <my-test
      v-for="item in goodsList"
      :key="item.id"
      :obj="item"
      @kanyidao="changePrice"
    ></my-test>
  </div>
</template>

<script>
import MyTest from './components/MyTest'

// Vue 的代码都必须写在此对象中
export default {
  name: 'abc-def',
  /**
   * 1、通过脚手架创建的项目，data必须是一个函数，该函数返回一个对象。
      一个组件的 data 选项必须是一个函数。-> 保证每个组件实例，维护独立的一份数据对象。
      每次创建新的组件实例，都会新执行一次data函数，从而得到一个新的对象。
   */
  data() {
    return {
      goodsList: [
        { id: 1, name: '方便面', price: 2.5, info: '好吃不贵' },
        { id: 2, name: '火腿肠', price: 2, info: '价钱合理' },
        { id: 3, name: '卤鸡蛋', price: 1.5, info: '我的最爱' }
      ]
    }
  },
  // 注册子组件
  components: {
    MyTest
  },
  created() {

  },
  mounted() {

  },
  methods: {
    // 子组件调用父组件的方法
    changePrice (id) {
      console.log(id)
      let row = this.goodsList.find(item => item.id === id)
      row.price--
    },
  },
  computed: {

  },
  watch: {

  }
}
</script>

<style lang="scss" scoped>

</style>
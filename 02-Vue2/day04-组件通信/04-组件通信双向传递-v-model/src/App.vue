<template>
  <div>
    <h3>需求1：不用v-model实现双向绑定</h3>
    <input type="text" :value="uname" @input="changeValue" />
    <p>结论：v-model 可以拆分为 :value + @input</p>
    <hr />

    <h3>需求2：实现输入框组件的v-model</h3>
    <!-- <MyInput v-model="age"></MyInput> -->
    <!-- <MyInput :value="age" @input="changeAge"></MyInput> -->
    <MyInput v-model="age"></MyInput>
    <p>结论：组件的v-model需要子组件的配合。</p>
    <p>结论：子组件需要接收value属性，并触发input事件</p>
    <hr />

    <h3>需求3：实现下拉框组件的v-model</h3>
    <MySelect v-model="address"></MySelect>
    <!-- <MySelect :value="address" @input="changeSelect"></MySelect> -->
    <p>下拉框的v-model相当于 :value + @input</p>

    <hr />
    <p>总结：v-model ==== :value + @input</p>
    <p>总结：父传子，为了把数据传给子组件，设置表单元素的默认值</p>
    <p>总结：子传父，为了把表单元素的值，传给父组件，修改data数据</p>
  </div>
</template>

<script>
import MyInput from './components/MyInput.vue'
import MySelect from './components/MySelect.vue'
export default {
  data () {
    return {
      address: '上海',
      age: 20,
      uname: 'zhangsan'
    }
  },
  components: {
    MyInput,
    MySelect
  },
  methods: {
    changeValue (e) {
      // 把输入框的值，赋值给uname
      this.uname = e.target.value
    },
    changeAge (val) {
      this.age = val
    },
    changeSelect (val) {
      this.address = val
    }
  }
}
</script>

<style lang="scss" scoped>
p {
  background-color: gold;
}
</style>

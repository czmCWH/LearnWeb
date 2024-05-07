<template>
  <div class="login_body">
    <div class="bg" />
    <div class="box">
      <div class="title">智慧园区-登录</div>
      <!-- 
        表单校验4要素：
        1、el-form :model 对应的值 是表单对象对应的数据对象
        2、el-form :rules 对应校验规则
        3、el-form-item prop 表示要校验那个字段
        4、表单元素(el-input、el-checkbox....) 需要绑定 v-model
       -->
      <el-form ref="form" :model="loginForm" :rules="rules">
        <el-form-item
          label="账号"
          prop="username"
        >
          <el-input v-model="loginForm.username" />
        </el-form-item>

        <el-form-item
          label="密码"
          prop="password"
        >
          <el-input v-model="loginForm.password" show-password/>
        </el-form-item>

        <el-form-item prop="remember">
          <el-checkbox v-model="rememberMe">记住我</el-checkbox>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" class="login_btn" @click="handleLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { loginAPI } from '@/api/user'
import { FORM_KEY } from '@/constants/KEY'
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rememberMe: true,
      rules: {
        username: [
          // ['blur', 'change'] 表示 失去焦点 和文本改变 都会触发校验规则
          { required: true, message: '用户名不可为空！', trigger: ['blur'] }
        ],
        password: [
          { required: true, message: '密码不能为空！', trigger: ['blur'] }
        ]
      }
    }
  },
  created() {
    const loginData = localStorage.getItem(FORM_KEY)
    if (loginData) {
      const { username, password} = JSON.parse(loginData)
      this.loginForm.username = username;
      this.loginForm.password = password;
    }
  }, 
  methods: {
    // 登录用户名和密码默认：admin；admin123
    handleLogin() {
      // this.$refs['form'] 获取form表单，并校验
      this.$refs.form.validate(async(flag) => {
        console.log('--czm 校验结果='+flag); 
        if (!flag) return; 

        // 校验通过，可以调用登录接口，请求成功把 token 保存到 Vuex 中'

        // 方式一：直接在组件里使用 Vuex 保存数据
        // const res = await loginAPI(this.loginForm);
        // console.log(res);
        // this.$store.commit('user/setToken', res.data.token);

        // 方式二：按照 Vuex 规则保存数据
        // this.$store.commit()触发 ---> mutaions
        // this.$store.dispatch()触发 ---> actions
        try {
          await this.$store.dispatch('user/loginAction', this.loginForm);
          // 选中记住我，存储用户名和密码到本地
          if (this.rememberMe) {
            localStorage.setItem(FORM_KEY, JSON.stringify(this.loginForm));
          } else {
            localStorage.removeItem(FORM_KEY);
          }
          // 登录成功，跳转到上次退出的页面
          console.log(this.$route.query.redirect)
          if (this.$route.query.redirect) {
            this.$router.push(this.$route.query.redirect);
          } else {
            this.$router.push('/');
          }
        } catch (error) {
          console.dir(error);
          // this.$message.error(error.response.data.msg)
        }
      }) 
    }
  }
}

</script>

<style scoped lang="scss">
  .login_body {
    display: flex;
  }
  .bg {
    width: 60vw;
    height: 100vh;
    background: url('~@/assets/login-bg.svg') no-repeat;
    background-position: right top;
    background-size: cover;
  }
  .box {
    margin: 200px 10% 0;
    flex: 1;
    .title {
      padding-bottom: 76px;
      font-size: 26px;
      font-weight: 500;
      color: #1e2023;
    }
    ::v-deep() {
      .ant-form-item {
        display: flex;
        margin-bottom: 62px;
        flex-direction: column;
      }
      .ant-form-item-label label {
        font-size: 16px;
        color: #8b929d;
      }
      .ant-input,
      .ant-input-password {
        border-radius: 8px;
      }
    }
  }
  .login_btn{
    width: 100%;
  }
</style>

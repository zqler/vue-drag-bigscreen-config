<template>
  <div class="login-main">
    <Card class="login-con" icon="log-in" title="欢迎登录">
      <login-form @on-success-valid="handleSubmit"></login-form>
    </Card>
  </div>
</template>

<script>
import { Card } from "ant-design-vue";
import storage from "store";
import { login } from "@apis/index";
import loginForm from "@components/login-form";
import { mapMutations } from "vuex";
export default {
  name: "Login",
  components: {
    Card,
    loginForm
  },
  props: {},
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      formInline: {
        userName: "",
        password: ""
      },
      rules: {
        userName: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    ...mapMutations({
      handleUserName: "handleUserName"
    }),
    async handleSubmit({ userName, password }) {
      const { data } = await login({ userName, password });
      if (data) {
        const { token, roleType, userName } = data;
        this.handleUserName({ token, roleType, userName });
        storage.set("userName", userName);
        storage.set("token", token);
        storage.set("roleType", roleType);
        this.$router.push({ name: "powerFlow" });
      }
    }
  }
};
</script>

<style lang="less">
.login-main {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url("../../assets/images/login_bg.jpg");
  background-size: cover;
  background-position: center;
  .ant-card-head-title {
    font-size: 18px;
    color: #fff;
    text-align: center;
  }
  .login-con {
    position: absolute;
    right: 30%;
    top: 50%;
    transform: translate(20%, -70%);
    width: 490px;
    height: 500px;
    background: rgba(15, 39, 106, 0.66);
    box-shadow: 0px 0px 60px 24px rgba(46, 125, 186, 0.5);
    border-radius: 8px;
    border: 2px solid rgba(255, 255, 255, 0.23);
    .ant-card-body {
      margin-top: 10px;
      padding: 24px 45px;
    }
  }
  .login-form {
    margin: 0 auto;
    .ant-form-item {
      margin-top: 20px;
      label {
        color: #fff;
      }
    }
    .ant-input {
      width: 390px;
      height: 50px;
      background: #193f88;
      font-size: 16px;
      color: #fff;
      border-radius: 4px;
      border: 1px solid #6b98d2;
    }
    .ant-input-suffix {
      .anticon {
        color: #fff;
      }
    }
  }

  .login-btn {
    margin-top: 20px;
    width: 390px;
    height: 50px;
  }
  .footer {
    text-align: center;
  }
}
</style>

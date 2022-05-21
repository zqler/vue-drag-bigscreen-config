<template>
  <div class="login-form">
    <FormModel ref="loginForm" :rules="rules" :model="formInline">
      <a-form-model-item label="用户名" prop="userName">
        <a-input
          ref="userName"
          v-model="formInline.userName"
          placeholder="用户名"
        >
          <a-icon
            slot="prefix"
            type="user"
            style="color:rgba(255,255,255,.5)"
          />
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="密码" prop="password">
        <a-input-password
          ref="password"
          v-model="formInline.password"
          type="password"
          placeholder="密码"
        >
          <a-icon
            slot="prefix"
            type="lock"
            style="color:rgba(255,255,255,.5)"
          />
        </a-input-password>
      </a-form-model-item>
    </FormModel>
    <div class="footer">
      <Button class="login-btn" type="primary" @click="handleSubmit">
        登录
      </Button>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Button, FormModel, Input, Icon, Card } from "ant-design-vue";
Vue.use(FormModel)
  .use(Input)
  .use(Icon);
export default {
  name: "loginForm",
  components: {
    FormModel,
    Button
  },
  props: {
    labelCol: {
      type: Object,
      default: () => ({ span: 4 })
    },
    wrapperCol: {
      type: Object,
      default: () => ({ span: 14 })
    },
    userNameRule: {
      type: Array,
      default: () => {
        return [{ required: true, message: "账号不能为空", trigger: "blur" }];
      }
    },
    passwordRule: {
      type: Array,
      default: () => {
        return [{ required: true, message: "密码不能为空", trigger: "blur" }];
      }
    }
  },
  computed: {
    rules() {
      return {
        userName: this.userNameRule,
        password: this.passwordRule
      };
    }
  },
  data() {
    return {
      formInline: {
        userName: "admin",
        password: ""
      }
    };
  },
  mounted() {
    if (this.formInline.userName === "") {
      this.$refs.userName.focus();
    } else if (this.formInline.password === "") {
      this.$refs.password.focus();
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          this.$emit("on-success-valid", {
            userName: this.formInline.userName,
            password: this.formInline.password
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    }
  }
};
</script>

<style></style>

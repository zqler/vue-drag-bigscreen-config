<template>
  <Modal
    v-model="visible"
    :title="isModify ? '修改用户' : '新增用户'"
    @ok="handleOk"
    @cancel="onCancel"
  >
    <FormModel
      class="user-form"
      ref="userForm"
      :rules="rules"
      :model="formvalidator"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-form-model-item label="用户名" prop="userName">
        <a-input v-model="formvalidator.userName" placeholder="用户名">
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="密码" prop="password">
        <a-input
          v-model="formvalidator.password"
          type="password"
          placeholder="密码"
        >
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="手机号码" prop="phone">
        <a-input v-model="formvalidator.phone" placeholder="手机号码">
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="用户角色" prop="roleType">
        <a-select placeholder="选择用户角色" v-model="formvalidator.roleType">
          <a-select-option
            :value="item.value"
            v-for="item in userType"
            :key="item.value"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="用户地址" prop="address">
        <a-input v-model="formvalidator.address" placeholder="用户地址">
        </a-input>
      </a-form-model-item>
    </FormModel>
  </Modal>
</template>

<script>
import Vue from "vue";
import {
  Button,
  Modal,
  Divider,
  FormModel,
  Input,
  Select
} from "ant-design-vue";
import { REGEXP_PHONE } from "@utils/validator";
Vue.use(FormModel)
  .use(Input)
  .use(Select);
export const userType = [
  {
    value: "1",
    name: "管理员"
  },
  {
    value: "2",
    name: "运维经理"
  },
  {
    value: "3",
    name: "运维人员"
  },
  {
    value: "4",
    name: "普通用户"
  }
];
export default {
  name: "UserName",
  components: {
    FormModel,
    Modal
  },
  props: {
    show: {
      type: Boolean,
      default: () => false
    },
    isModify: {
      type: Boolean,
      default: () => false
    },
    editData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    const validatorPhone = (rule, value, callback) => {
      console.log(value, !REGEXP_PHONE.test(value));
      if (value && !REGEXP_PHONE.test(value)) {
        return callback(new Error("请输入正确的手机号码"));
      }
      callback();
    };
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      title: "新增用户",
      visible: false,
      userType,
      formvalidator: {
        userName: "",
        password: "",
        phone: "",
        roleType: "",
        id: "",
        address: ""
      },
      rules: {
        userName: [
          {
            required: true,
            message: "用户名必填",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "密码必填",
            trigger: "blur"
          }
        ],
        phone: [
          {
            required: true,
            message: "手机号码必填",
            trigger: "blur"
          },
          {
            validator: validatorPhone,
            trigger: "change"
          }
        ],
        roleType: [
          {
            required: true,
            message: "必选",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleOk() {
      this.$refs.userForm.validate(valid => {
        if (valid) {
          this.$emit("update:show");
          this.$emit("handOk", this.formvalidator);
          this.$refs.userForm.resetFields();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    onCancel() {
      this.$emit("update:show");
      this.$refs.userForm.resetFields();
    }
  },
  watch: {
    show(newValue) {
      this.visible = newValue;
    },
    editData(newValue) {
      this.formvalidator = {
        ...newValue,
        roleType: newValue.roleType.toString()
      };
    }
  }
};
</script>

<style></style>

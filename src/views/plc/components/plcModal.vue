<template>
  <Modal
    v-model="visible"
    :title="isModify ? '修改PLC' : '新增PLC'"
    @ok="handleOk"
    @cancel="onCancel"
  >
    <FormModel
      class="user-form"
      ref="plcForm"
      :rules="rules"
      :model="formvalidator"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-form-model-item label="站点名" prop="name">
        <a-input v-model="formvalidator.name" placeholder="站点名"> </a-input>
      </a-form-model-item>
      <!-- <a-form-model-item label="IP地址" prop="ip">
        <a-input v-model="formvalidator.ip" placeholder="IP地址"> </a-input>
      </a-form-model-item> -->
      <a-form-model-item label="协议类型" prop="protocol">
        <a-select placeholder="选择协议类型" v-model="formvalidator.protocol">
          <a-select-option
            :value="item.value"
            v-for="item in protocolList"
            :key="item.value"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="plc索引" prop="index">
        <a-input v-model="formvalidator.index" placeholder="plc索引"> </a-input>
      </a-form-model-item>
      <a-form-model-item label="设备数量" prop="devCount">
        <a-input v-model="formvalidator.devCount" placeholder="设备数量">
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="用户" prop="userIds">
        <a-select
          placeholder="选择用户"
          mode="tags"
          v-model="formvalidator.userIds"
        >
          <a-select-option
            :value="item.id"
            v-for="item in userList"
            :key="item.id"
          >
            {{ item.userName }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
    </FormModel>
  </Modal>
</template>

<script>
import Vue from "vue";
import { REGEXP_IP, REGEXP_POSINT } from "@utils/validator";
import {
  Button,
  Modal,
  Divider,
  FormModel,
  Input,
  Select
} from "ant-design-vue";
import { protocolList } from "@utils/lang";
Vue.use(FormModel)
  .use(Input)
  .use(Select);

export default {
  name: "PlcModal",
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
    userList: {
      type: Array,
      required: true,
      default: () => []
    },
    editData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    const validatorIP = (rule, value, callback) => {
      if (value && !REGEXP_IP.test(value)) {
        return callback(new Error("请输入合法的IPV4地址"));
      }
      callback();
    };
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      title: "新增用户",
      visible: false,
      protocolList,
      formvalidator: {
        name: "",
        devCount: "",
        id: "",
        userIds: [],
        protocol: "",
        index: 0
      },
      rules: {
        name: [
          {
            required: true,
            message: "站点名必填",
            trigger: "blur"
          }
        ],
        devCount: [
          {
            required: true,
            message: "设备数量必填",
            trigger: "blur"
          },
          {
            pattern: REGEXP_POSINT,
            message: "设备数量为正整数",
            trigger: "blur"
          }
        ],
        index: [
          {
            required: true,
            message: "plc索引必填",
            trigger: "blur"
          },
          {
            pattern: REGEXP_POSINT,
            message: "plc索引为正整数",
            trigger: "blur"
          }
        ],
        protocol: [
          {
            required: true,
            message: "协议类型必选",
            trigger: "change"
          }
        ],
        userIds: [
          {
            required: true,
            message: "用户必选",
            trigger: "change"
          }
        ]
      }
    };
  },
  mounted() {
    // this.formvalidator = { ...this.editData };
  },
  methods: {
    handleOk() {
      this.$refs.plcForm.validate(valid => {
        if (valid) {
          this.$emit("update:show");
          this.$emit("handOk", this.formvalidator);
          this.$refs.plcForm.resetFields();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    onCancel() {
      this.$refs.plcForm.resetFields();
      this.$emit("update:show");
    }
  },
  watch: {
    show(newValue) {
      this.visible = newValue;
    },
    editData(newValue = {}) {
      let { userInfos = [] } = newValue;
      userInfos = userInfos.map(item => item.id);
      this.formvalidator = { ...newValue, userIds: userInfos };
    }
  }
};
</script>

<style></style>

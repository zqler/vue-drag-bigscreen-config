<template>
  <Modal
    v-model="visible"
    :title="isModify ? '修改设备' : '新增设备'"
    @ok="handleOk"
    @cancel="onCancel"
  >
    <FormModel
      ref="deviceForm"
      :rules="rules"
      :model="formvalidator"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-form-model-item label="设备名称" prop="deviceName">
        <a-input v-model="formvalidator.deviceName" placeholder="设备名称">
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="设备地址" prop="address">
        <a-input v-model="formvalidator.address" placeholder="设备地址">
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="设备编号" prop="deviceNumber">
        <a-input v-model="formvalidator.deviceNumber" placeholder="设备编号">
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="PLC站点" prop="plcId">
        <a-select placeholder="选择PLC站点" v-model="formvalidator.plcId">
          <a-select-option
            :value="item.id"
            v-for="item in plcList"
            :key="item.id"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
    </FormModel>
  </Modal>
</template>

<script>
import Vue from "vue";
import { REGEXP_IP } from "@utils/validator";
import {
  Button,
  Modal,
  Divider,
  FormModel,
  Input,
  Select
} from "ant-design-vue";
import { protocolList } from "@utils/lang";
import { REGEXP_POSINT } from "@utils/validator";
Vue.use(FormModel)
  .use(Input)
  .use(Select);

export default {
  name: "DeviceModal",
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
    plcList: {
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
      console.log(value, !REGEXP_IP.test(value));
      if (value && !REGEXP_IP.test(value)) {
        return callback(new Error("请输入合法的IPV4地址"));
      }
      callback();
    };
    const validatorAddress = (rule, value, callback) => {
      if (value > 255) {
        return callback(new Error("请输入1-255之间的值"));
      }
      callback();
    };

    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      visible: false,
      protocolList,
      formvalidator: {
        deviceName: "",
        id: "",
        deviceNumber: "",
        plcId: "",
        address: ""
      },
      rules: {
        deviceName: [
          {
            required: true,
            message: "设备名称必填",
            trigger: "blur"
          }
        ],
        address: [
          {
            required: true,
            message: "设备地址必填",
            trigger: "blur"
          },
          {
            pattern: REGEXP_POSINT,
            message: "设备地址为正整数",
            trigger: "blur"
          },
          {
            validator: validatorAddress,
            trigger: "blur"
          }
        ],
        deviceNumber: [
          {
            required: true,
            message: "设备编号必填",
            trigger: "blur"
          }
          // {
          //   pattern: REGEXP_POSINT,
          //   message: "设备编号为正整数",
          //   trigger: "blur"
          // }
        ],
        plcId: [
          {
            required: true,
            message: "PLC必选",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleOk() {
      this.$refs.deviceForm.validate(valid => {
        if (valid) {
          this.$emit("update:show");
          this.$emit("handOk", this.formvalidator);
          this.$refs.deviceForm.resetFields();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    onCancel() {
      this.$refs.deviceForm.resetFields();
      this.$emit("update:show");
    }
  },
  watch: {
    show(newValue) {
      this.visible = newValue;
    },
    editData(newValue) {
      this.formvalidator = { ...newValue };
    }
  }
};
</script>

<style></style>

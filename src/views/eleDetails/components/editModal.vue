<template>
  <a-modal v-model="show" title="用户信息" @ok="handleOk" @cancel="onClose">
    <template>
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item ref="name" label="姓名" prop="name">
          <a-input
            v-model="form.name"
            @blur="
              () => {
                $refs.name.onFieldBlur();
              }
            "
          />
        </a-form-model-item>
        <a-form-model-item ref="password" label="密码" prop="password">
          <a-input
            v-model="form.password"
            @blur="
              () => {
                $refs.password.onFieldBlur();
              }
            "
          />
        </a-form-model-item>
        <a-form-model-item label="区域" prop="region">
          <a-select v-model="form.region" placeholder="please select your zone">
            <a-select-option value="shanghai">
              Zone one
            </a-select-option>
            <a-select-option value="beijing">
              Zone two
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="日期" required prop="date1">
          <a-date-picker
            v-model="form.date1"
            format="YYYY-MM-DD hh:mm:ss"
            show-time
            type="date"
            placeholder="Pick a date"
            style="width: 100%;"
          />
        </a-form-model-item>
        <a-form-model-item label="Instant delivery" prop="delivery">
          <a-switch v-model="form.delivery" />
        </a-form-model-item>
        <a-form-model-item label="类型" prop="type">
          <a-checkbox-group v-model="form.type">
            <a-checkbox value="1" name="type">
              Online
            </a-checkbox>
            <a-checkbox value="2" name="type">
              Promotion
            </a-checkbox>
            <a-checkbox value="3" name="type">
              Offline
            </a-checkbox>
          </a-checkbox-group>
        </a-form-model-item>
        <a-form-model-item label="标签类型" prop="resource">
          <a-radio-group v-model="form.resource">
            <a-radio value="1">
              Sponsor
            </a-radio>
            <a-radio value="2">
              Venue
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="说明" prop="desc">
          <a-input v-model="form.desc" type="textarea" />
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 14, offset: 8 }">
          <a-button type="primary" @click="onSubmit">
            Create
          </a-button>
          <a-button style="margin-left: 10px;" @click="resetForm">
            Reset
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </template>
  </a-modal>
</template>
<script>
import Vue from "vue";
import {
  Modal,
  FormModel,
  Input,
  Select,
  DatePicker,
  Switch,
  Checkbox,
  Radio
} from "ant-design-vue";
Vue.use(Modal)
  .use(FormModel)
  .use(Input)
  .use(Select)
  .use(DatePicker)
  .use(Switch)
  .use(Checkbox)
  .use(Radio);

export default {
  props: {
    visible: { type: Boolean }
  },
  computed: {},
  data() {
    return {
      show: false,
      labelCol: { span: 8 },
      wrapperCol: { span: 14 },
      other: "",
      form: {
        name: "",
        password: "",
        region: undefined,
        date1: undefined,
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          },
          {
            min: 3,
            max: 20,
            message: "最小3个字符，最大20字符",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          {
            min: 3,
            max: 20,
            message: "最小3个字符，最大20字符",
            trigger: "blur"
          }
        ],
        region: [
          {
            required: true,
            message: "Please select Activity zone",
            trigger: "change"
          }
        ],
        date1: [
          { required: true, message: "Please pick a date", trigger: "change" }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "Please select at least one activity type",
            trigger: "change"
          }
        ],
        resource: [
          {
            required: true,
            message: "Please select activity resource",
            trigger: "change"
          }
        ],
        desc: [
          {
            required: true,
            message: "Please input activity form",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleOk(e) {
      console.log(e);
      this.$emit("close", false);
    },
    onClose(e) {
      console.log(e);
      this.$emit("close", false);
    },
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          console.log("submit!", this.form);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    }
  },
  watch: {
    visible: {
      handler(newValue) {
        console.log(newValue);
        this.show = newValue;
      }
    }
  }
};
</script>

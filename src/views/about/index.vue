<template>
  <div class="box">
    <Button @click="getTestCancelToken">测试</Button>
  </div>
</template>

<script>
import { getTestCancelToken } from "@apis";
import {
  Button,
  Table,
  Pagination,
  Divider,
  Notification,
  Modal
} from "ant-design-vue";
export default {
  name: "",
  components: {
    Button
  },
  data() {
    return {};
  },
  mounted() {
    this.getTestCancelToken();
  },
  methods: {
    async getTestCancelToken() {
      const { data, error } = await getTestCancelToken();
      if (data) {
        console.log(data);
      }
    }
  }
};
</script>

<style></style>

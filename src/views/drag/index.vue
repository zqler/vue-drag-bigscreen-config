<template>
  <div class="box">
    <div class="left">
      <Draggable
        v-model="myArray"
        group="people"
        @start="drag = true"
        @end="drag = false"
      >
        <div v-for="element in myArray" :key="element.id">
          {{ element.name }}
        </div>
      </Draggable>
    </div>
    <div class="right">
      <Draggable
        v-model="list"
        group="people"
        @start="drag = true"
        @end="drag = false"
      >
        <div v-for="element in list" :key="element.id">{{ element.name }}</div>
      </Draggable>
    </div>
    <Button type="primary">确定</Button>
  </div>
</template>

<script>
import Draggable from "vuedraggable";
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
    Button,
    Draggable
  },
  data() {
    return {
      myArray: [
        {
          id: 1,
          name: "test1"
        },
        {
          id: 2,
          name: "test2"
        },
        {
          id: 3,
          name: "test2"
        },
        {
          id: 4,
          name: "xq"
        }
      ],
      list: [
        {
          id: 6,
          name: "test5"
        },
        {
          id: 7,
          name: "fyl"
        }
      ]
    };
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

<style lang="less">
.box {
  display: flex;
}
.left {
  width: 200px;
  margin-right: 200px;
}
.right {
  width: 100px;
}
</style>

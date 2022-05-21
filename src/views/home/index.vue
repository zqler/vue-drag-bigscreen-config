<template>
  <div class="user-main">
    <div class="header">
      <div class="left">
        <Button type="primary" @click="onAdd">新增</Button>
        <!-- <Button
          class="del"
          type="danger"
          @click="onDel"
          :disabled="selectedRowKeys.length === 0"
          >删除</Button
        > -->
      </div>
      <div class="right">
        <a-input-search
          class="search"
          placeholder="请输入用户名或者电话号码"
          v-model="filter.match"
          enter-button
          :maxLength="64"
          allowClear
          @search="onSearch"
        />
      </div>
    </div>
    <Table
      class="table"
      :row-selection="rowSelection"
      :data-source="data"
      :columns="columns"
      :pagination="false"
      :loading="loading"
      :rowKey="record => record.id"
    >
      <span class="options" slot="options" slot-scope="text, record">
        <span class="edit" @click="onEdit(record)">编辑</span>
        <Divider type="vertical" />
        <span class="delete" @click="onDel(record.id)">删除</span>
      </span>
    </Table>
    <div class="page">
      <Pagination
        v-model="filter.pageNum"
        :pageSize="filter.pageSize"
        :total="total"
        :showSizeChanger="true"
        show-size-changer
        show-quick-jumper
        :show-total="total => `共 ${total} 条数据`"
        :pageSizeOptions="['10', '20', '50', '100']"
        @change="onPageChange"
        @showSizeChange="onShowSizeChange"
      />
    </div>
    <UserModal
      :show.sync="show"
      :isModify="isModify"
      :editData="selectData"
      @handOk="handOk"
    ></UserModal>
  </div>
</template>

<script>
// @ is an alias to /src

// import HelloWorld from "@/components/HelloWorld.vue";
import Vue from "vue";
import {
  Button,
  Table,
  Pagination,
  Divider,
  Notification,
  Modal,
  Input
} from "ant-design-vue";
import tableConlumns from "./tableColumns";
import { getAllUser, deleteUser, postUser, addUser } from "@apis";
import UserModal from "./components/userModal";
const userType = {
  "1": "管理员",
  "2": "运维经理",
  "3": "运维人员",
  "4": "普通用户"
};
Vue.use(Modal).use(Input);
export default {
  name: "Home",
  components: {
    Table,
    Pagination,
    Divider,
    UserModal,
    Button
  },
  computed: {
    rowSelection() {
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          this.selectedRowKeys = selectedRowKeys;
        }
      };
    }
  },
  mounted() {
    this.getUser();
  },
  methods: {
    onSearch() {
      this.filter.pageNum = 1;
      this.getUser();
    },
    async getUser() {
      const { data, error } = await getAllUser(this.filter);
      if (data) {
        const { total, userInfos } = data;
        this.data = userInfos;
        this.total = total;
      }
    },
    onAdd() {
      this.show = true;
      this.isModify = false;
      this.selectData = {};
    },
    onEdit(record) {
      this.show = true;
      this.isModify = true;
      this.selectData = record;
    },
    //获取表单信息提交接口
    async handOk(formData) {
      const desc = this.isModify ? "更新成功。" : "新增成功。";
      if (this.isModify) {
        const { data, error } = await postUser(formData);
        if (data) {
          this.onSearch();
          Notification.success({
            message: "提示",
            description: desc
          });
        }
      } else {
        const { data, error } = await addUser(formData);
        if (data) {
          this.onSearch();
          Notification.success({
            message: "成功",
            description: desc
          });
        }
      }
    },
    async onDel(id) {
      Modal.confirm({
        title: "提示?",
        content: "确定删除选中数据",
        okText: "确定",
        okType: "danger",
        cancelText: "取消",
        onOk: async () => {
          const { data } = await deleteUser({ id });
          if (data) {
            Notification.success({
              message: "提示",
              description: "删除成功。"
            });
            this.getUser();
          }
        },
        onCancel() {
          console.log("Cancel");
        }
      });
    },
    onPageChange(page, pageSize) {
      this.filter.pageNum = page;
      this.getUser();
    },
    onShowSizeChange(current, pageSize) {
      this.filter.pageNum = 1;
      this.filter.pageSize = pageSize;
      this.getUser();
    }
  },
  data() {
    return {
      data: [],
      show: false,
      isModify: false, //是否修改
      selectedRowKeys: [], //选中key
      selectData: {}, //当前选中列的数据
      userType,
      filter: {
        pageNum: 1,
        pageSize: 20,
        match: ""
      },
      total: 0,
      loading: false,
      columns: tableConlumns(this)
    };
  }
};
</script>
<style lang="less" scoped>
.user-main {
  .header {
    display: flex;
    margin: 10px 0 20px;
    .left {
      flex: 1;
    }
    .right {
      flex: 1;
      text-align: right;
    }
    .search {
      width: 300px;
    }
    .del {
      margin-left: 10px;
    }
  }
  .options {
    .edit {
      color: #005adb;
      cursor: pointer;
    }
    .delete {
      color: #005adb;
      cursor: pointer;
    }
  }
}
</style>

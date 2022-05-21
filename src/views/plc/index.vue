<template>
  <div class="plc-main">
    <div class="header">
      <div class="left">
        <Button type="primary" @click="onAdd">新增</Button>
        <Button
          class="del"
          type="danger"
          @click="onDel"
          :disabled="selectedRowKeys.length === 0"
          >删除</Button
        >
      </div>
      <div class="right">
        <a-input-search
          class="search"
          placeholder="请输入PLC站点名或者IP地址"
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
      <span slot="protocol" slot-scope="text">
        <span>{{
          protocolList.filter(item => item.value === text)[0].name
        }}</span>
      </span>
      <span slot="userInfos" slot-scope="text">
        <span v-for="item in text" :key="item.id">{{ item.userName }},</span>
      </span>
      <span class="options" slot="options" slot-scope="text, record">
        <span class="edit" @click="onEdit(record)">编辑</span>
        <Divider type="vertical" />
        <span class="delete" @click="onDel(record.id)">删除</span>
      </span>
    </Table>
    <!-- <div class="page">
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
    </div> -->
    <PlcModal
      :show.sync="show"
      :isModify="isModify"
      :userList="userList"
      :editData="selectData"
      @handOk="handOk"
    ></PlcModal>
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
  Modal
} from "ant-design-vue";
import tableConlumns from "./tableColumns";
import { getPlc, delPlc, addPlc, updatePlc, getAllUserList } from "@apis";
import PlcModal from "./components/plcModal";
import { protocolList } from "@utils/lang";
Vue.use(Modal);
export default {
  name: "Plc",
  components: {
    Table,
    Divider,
    PlcModal,
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
    this.getPlc();
  },
  methods: {
    onSearch() {
      this.filter.pageNum = 1;
      this.getPlc();
    },
    async getPlc() {
      this.loading = true;
      const { data, error } = await getPlc(this.filter);
      this.loading = false;
      if (data) {
        this.data = data;
      }
    },
    async getAllUser() {
      const { data, error } = await getAllUserList();
      if (data) {
        this.userList = data;
      }
    },
    onAdd() {
      this.show = true;
      this.isModify = false;
      this.getAllUser();
    },
    onEdit(record) {
      this.show = true;
      this.isModify = true;
      this.selectData = record;
      this.getAllUser();
    },
    //获取表单信息提交接口
    async handOk(formData) {
      this.loading = true;
      let { userIds = [] } = formData;
      userIds = userIds.length > 0 ? userIds.join(",") : "";
      if (this.isModify) {
        const { data, error } = await updatePlc({ ...formData, userIds });
        this.loading = false;
        if (data) {
          const desc = this.isModify ? "更新成功。" : "新增成功。";
          this.getPlc();
          Notification.success({
            message: "成功",
            description: desc
          });
        }
        return;
      }
      const { data, error } = await addPlc({ ...formData, userIds });
      this.loading = false;
      if (data) {
        const desc = this.isModify ? "更新成功。" : "新增成功。";
        this.onSearch();
        Notification.success({
          message: "成功",
          description: desc
        });
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
          console.log(this.selectedRowKeys);
          const ids = id ? [id] : this.selectedRowKeys;
          this.loading = true;
          const { data } = await delPlc({ ids });
          this.loading = false;
          if (data) {
            Notification.success({
              message: "成功",
              description: "删除成功。"
            });
            this.onSearch();
          }
        },
        onCancel() {
          console.log("Cancel");
        }
      });
    },
    onPageChange(page, pageSize) {
      this.filter.pageNum = page;
      this.getPlc();
    },
    onShowSizeChange(current, pageSize) {
      this.filter.pageNum = 1;
      this.filter.pageSize = pageSize;
      this.getPlc();
    }
  },
  data() {
    return {
      data: [],
      show: false,
      isModify: false, //是否修改
      selectedRowKeys: [], //选中key
      protocolList,
      userList: [], //存入用户信息
      selectData: {}, //当前选中数据
      filter: {
        pageNum: 1,
        pageSize: 20
      },
      total: 0,
      loading: false,
      columns: tableConlumns(this)
    };
  }
};
</script>
<style lang="less" scoped>
.plc-main {
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

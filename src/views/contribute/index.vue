<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="Title" width="300" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="Description">
        <template slot-scope="scope">
          {{ scope.row.cause }}
        </template>
      </el-table-column>
      <el-table-column label="Author" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.nickname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="URL">
        <template slot-scope="scope">
          {{ scope.row.action }}
        </template>
      </el-table-column>
      <el-table-column
        class-name="status-col"
        label="Publish"
        width="110"
        align="center"
      >
        <template slot-scope="scope">
          <el-button
            @click="open(scope.$index, scope.row.type)"
            size="small"
            type="success"
            icon="el-icon-check"
            circle
          ></el-button>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="created_at"
        label="Delete"
        width="110"
      >
        <template slot-scope="scope">
          <el-button
            @click="open(scope.$index)"
            size="small"
            type="danger"
            icon="el-icon-delete"
            circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList, getPub, delPub } from "@/api/contribute";

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger"
      };
      return statusMap[status];
    }
  },
  data() {
    return {
      list: null,
      listLoading: true
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      getList().then(response => {
        // console.log(response.data);
        this.list = response.data;
        this.listLoading = false;
      });
    },
    publish(index, type) {
      getPub(index, type).then(res => {
        // 发布之后重新渲染
        this.fetchData();
      });
    },
    del(index) {
      delPub(index).then(res => {
        // 删除之后重新渲染
        this.fetchData();
      });
    },
    open(index, type) {
      const pubstr = "此操作将修改GIS自主学习网内容？是否继续？";
      const delstr = "此操作将永久删除该内容, 是否继续?";
      this.$confirm(type ? pubstr : delstr, "提示", {
        cancelButtonText: "取消",
        confirmButtonText: "确定",
        type: "warning",
        center: true
      })
        .then(() => {
          if (type) {
            this.publish(index, type);
            this.$message({
              type: "success",
              message: "发布成功!"
            });
          } else {
            this.del(index);
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          }
        })
        .catch(() => {
          if (type) {
            this.$message({
              type: "info",
              message: "已取消发布"
            });
          } else {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          }
        });
    }
  }
};
</script>

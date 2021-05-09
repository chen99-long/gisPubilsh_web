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
      <el-table-column label="name" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column width="300" align="center" label="telphone/email">
        <template slot-scope="scope">
          {{ scope.row.tel }}
        </template>
      </el-table-column>
      <el-table-column label="advice">
        <template   slot-scope="scope">
          <div>
             <span v-html="scope.row.content"></span>
          </div>
        </template>
      </el-table-column>
      <el-table-column width="250" align="center" label="publishTime">
        <template slot-scope="scope">
          {{ scope.row.date }}
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
import { getList,delAdvice } from "@/api/advice";

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
    del(index) {
      delAdvice(index).then(res => {
        // 删除之后重新渲染
        this.fetchData();
      });
    },
    open(index) {
      const delstr = "此操作将永久删除该留言, 是否继续?";
      this.$confirm(delstr, "提示", {
        cancelButtonText: "取消",
        confirmButtonText: "确定",
        type: "warning",
        center: true
      })
        .then(() => {
            this.del(index);
            this.$message({
              type: "success",
              message: "删除成功!"
            });
     
        })
        .catch(() => {

            this.$message({
              type: "info",
              message: "已取消删除"
            });
       
        });
    }
  }
};
</script>

<template>
  <div class="app-container">
    <el-select v-model="value" @change="select" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
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
        align="center"
        prop="created_at"
        label="Edit"
        width="110"
      >
        <template slot-scope="scope">
          <el-button
            @click="
              dialogShow(scope.$index, {
                name: scope.row.name,
                cause: scope.row.cause,
                action: scope.row.action
              })
            "
            size="small"
            type="primary"
            icon="el-icon-edit"
            circle
          ></el-button>
          <el-dialog title="修改内容" :visible.sync="dialogFormVisible">
            <el-form>
              <el-form-item label="Title" :label-width="formLabelWidth">
                <el-input v-model="digForm.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="Description" :label-width="formLabelWidth">
                <el-input
                  type="textarea"
                  :rows="3"
                  placeholder="请输入内容"
                  v-model="digForm.cause"
                >
                </el-input>
              </el-form-item>
              <el-form-item label="URL" :label-width="formLabelWidth">
                <el-input
                  type="textarea"
                  :rows="3"
                  placeholder="请输入内容"
                  v-model="digForm.action"
                >
                </el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="edit"
                >确 定</el-button
              >
            </div>
          </el-dialog>
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
import { getList, delData,editData } from "@/api/data";
import LogoVue from '../../layout/components/Sidebar/Logo.vue';

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
      value: "0",
      key: "college",
      list: null,
      listLoading: true,
      options: [
        {
          value: "0",
          label: "GIS著名院校"
        },
        {
          value: "1",
          label: "GIS笔记分享"
        },
        {
          value: "2",
          label: "GIS视频资源"
        },
        {
          value: "3",
          label: "GIS好书分享"
        },
        {
          value: "4",
          label: "GIS常用数据"
        },
        {
          value: "5",
          label: "GIS招聘信息"
        }
      ],
      digForm: {
        index: "",
        name: "",
        cause: "",
        action: ""
      },
      dialogFormVisible: false,
      form: {
        name: "",
        cause: "",
        URL: ""
      },
      formLabelWidth: "120px"
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    dialogShow(index, obj) {
      this.dialogFormVisible = true;
      this.digForm.index = index;
      this.digForm.name = obj.name;
      this.digForm.cause = obj.cause;
      this.digForm.action = obj.action;
    },
    fetchData() {
      this.listLoading = true;
      getList().then(response => {
        // console.log(response.data);
        this.list = response.data.result[this.key];
        this.listLoading = false;
      });
    },
    edit() {
      editData(this.value,this.digForm).then(res=>{
        console.log(res);
      })
      this.fetchData();
     this.dialogFormVisible = false
    },
    del(index) {
      delData(index, this.value).then(res => {
        // 删除之后重新渲染
        this.fetchData();
      });
    },
    open(index) {
      const delstr = "此操作将永久删除该数据, 是否继续?";
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
    },
    select() {
      switch (this.value) {
        case "0":
          this.key = "college";
          break;
        case "1":
          this.key = "note";
          break;
        case "2":
          this.key = "video";
          break;
        case "3":
          this.key = "book";
          break;
        case "4":
          this.key = "data";
          break;
        case "5":
          this.key = "job";
          break;
        default:
          this.key = "college";
      }
      this.fetchData();
    }
  }
};
</script>

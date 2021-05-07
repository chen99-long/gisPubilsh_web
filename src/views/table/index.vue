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
      <el-table-column label="URL" >
        <template slot-scope="scope">
          {{ scope.row.action }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Publish" width="110" align="center">
        <template slot-scope="scope">

            <el-button @click="publish(scope.$index)" size="small" type="success" icon="el-icon-check" circle></el-button>

        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Delete" width="110">
        <template slot-scope="scope">
              <el-button @click="del(scope.$index)" size="small" type="danger" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList,getPub,delPub } from '@/api/table'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        // console.log(response.data);
        this.list = response.data
        this.listLoading = false
      })
    },
    publish(index) {
      console.log(index);
    },
    del(index) {
      delPub(index).then(res=>{
        console.log(res.data);
        // 删除之后重新渲染
        this.fetchData()
      })
    }
  }
}
</script>

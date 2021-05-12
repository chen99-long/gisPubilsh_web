<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="管理员姓名">
        <el-input v-model="form.nickname" />
      </el-form-item>
      <el-form-item label="投稿类型">
        <el-select v-model="form.type" placeholder="选择一个类型">
          <el-option label="GIS著名院校" value="0" />
          <el-option label="GIS笔迹分享" value="1" />
          <el-option label="GIS视频资源" value="2" />
          <el-option label="GIS好书分享" value="3" />
          <el-option label="GIS常用数据" value="4" />
          <el-option label="GIS招聘信息" value="5" />
        </el-select>
      </el-form-item>

      <el-form-item label="直接发布">
        <el-switch v-model="form.flag" />
      </el-form-item>

      <el-form-item label="投稿标题">
        <el-input v-model="form.name" />
      </el-form-item>

            <el-form-item label="内容链接">
        <el-input v-model="form.action" />
      </el-form-item>

  <el-form-item label="内容简介">
    <el-input type="textarea" v-model="form.cause"></el-input>
  </el-form-item>

 <el-form-item label="上传封面">
<el-upload action="#"
  class="upload-demo"
  drag
  :on-change="changeImg"
  :auto-upload=false
  >
  <i class="el-icon-upload"></i>
  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
  </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">发布</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {publish} from '@/api/publish'
import * as router from "vue-router"
import {getPub} from '@/api/contribute'

export default {
  data() {
    return {
      form: {
        nickname: '',
        type: '',
        flag: true,
        name: '',
        action:'',
        cause: '',
        cover_img:''
      }
    }
  },
  methods: {

    onSubmit() {
      var fd = new FormData();
      fd.append('nickname',this.form.nickname);
      fd.append('type',this.form.type);
      fd.append('name',this.form.name);
      fd.append('action',this.form.action);
      fd.append('cause',this.form.cause);
      fd.append('cover_img',this.form.cover_img);
      var that =this;
      publish(fd).finally(res=>{
        if(!that.form.flag){
           this.$message({
          message: '投稿成功！',
          type: 'success'
        });
        Object.keys(that.form).forEach(key=>{that.form[key]=''})
        }else if(that.form.flag){
          getPub(0,that.form.type);
         this.$message({
          message: '发布成功！',
          type: 'success'
        });
        Object.keys(that.form).forEach(key=>{that.form[key]=''})
        }
      })
    },
    changeImg(val){
        this.form.cover_img=val.raw;//把文件给到cover_img
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>


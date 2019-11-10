<template>
  <div class="app-container">
    <el-button>默认按钮</el-button>
    <el-button type="primary">主要按钮</el-button>
    <el-button type="success">成功按钮</el-button>
    <el-button type="info">信息按钮</el-button>
    <el-button type="warning">警告按钮</el-button>
    <el-button type="danger">危险按钮</el-button>
    <el-button type="danger">
      <i class="icon iconfont fsicon-zhaoxiangji"></i>icon按钮
    </el-button>
    <el-button disabled>禁用按钮</el-button>
    <el-button type="primary" disabled>禁用按钮</el-button>
    <div>
      <el-alert title="成功提示的文案" type="success" show-icon></el-alert>
      <el-alert title="消息提示的文案" type="info" show-icon></el-alert>
      <el-alert title="警告提示的文案" type="warning" show-icon></el-alert>
      <el-alert title="错误提示的文案" type="error" show-icon></el-alert>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  }
};
</script>

<style scoped>
.line {
  text-align: center;
}
</style>


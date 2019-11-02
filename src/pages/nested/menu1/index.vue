<template>
  <div style="padding:30px;">
    <el-alert :closable="false" title="menu 1">
      <div>父容器</div>
      <router-view />
    </el-alert>
  </div>
</template>

<template>
  <div class="icons-container">
    <el-tabs type="border-card">
      <el-tab-pane label="税局Icons Font">
        <div
          v-for="item of iconFont"
          :key="item"
          @click="handleClipboard(generateIconFont(item),$event)"
        >
          <el-tooltip placement="top">
            <div slot="content">{{ generateIconFont(item) }}</div>
            <div class="icon-item">
              <i :class="'icon iconfont ' + item" />
              <span>{{ item }}</span>
            </div>
          </el-tooltip>
        </div>
      </el-tab-pane>
      <el-tab-pane label="税局png">
        <div
          v-for="(item, index) of iconPng"
          :key="index"
          @click="handleClipboard(generateIconPng(item),$event)"
        >
          <el-tooltip placement="top">
            <div slot="content">{{ generateIconPng(item) }}</div>
            <div class="icon-item">
              <img :src="item.src" />
              <span>{{ item.name }}</span>
            </div>
          </el-tooltip>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import clipboard from "@ttkv/lib/utils/clipboard";
// import elementIcons from "./element-icons";
import iconFont from "./icon-font";
import iconPng from "./icon-png";

export default {
  data() {
    return {
      // elementIcons,
      iconFont,
      iconPng
    };
  },
  methods: {
    // generateElementIconCode(symbol) {
    //   return `<i class="el-icon-${symbol}" />`;
    // },
    generateIconFont(symbol) {
      return `<i class="icon iconfont ${symbol}"></i>`;
    },
    generateIconPng(symbol) {
      return `<img src="${symbol.src}" />`
    },
    handleClipboard(text, event) {
      clipboard(text, event);
    }
  }
};
</script>

<style lang="scss" scoped>
.icons-container {
  margin: 10px 20px 0;
  overflow: hidden;

  .icon-item {
    margin: 20px;
    height: 85px;
    text-align: center;
    width: 100px;
    float: left;
    font-size: 30px;
    color: #24292e;
    cursor: pointer;
  }

  span {
    display: block;
    font-size: 16px;
    margin-top: 10px;
  }

  .disabled {
    pointer-events: none;
  }
}
</style>

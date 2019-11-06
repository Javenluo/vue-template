<template>
  <el-header class="tax-app-header" height="105">
    <div class="logo">
      <img class="pic-404__child right" src="@/assets/tax/images/logo/logo_gd.png" alt="404" />
    </div>
    <div class="operate-area">
      <el-button @click="logout">退出登录</el-button>
    </div>
  </el-header>
</template>

<script>
export default {
  name: "TaxAppHeader",
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch("tax_user/logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    }
    // toggleClick() {
    //   this.$emit("toggleClick");
    // }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/base/variables.scss";
.tax-app-header {
  position: fixed;
  z-index: 2;
  top: 0;
  height: $headerHeight;
  width: 100%;
  padding: 10px 20px;
  background-repeat: no-repeat;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  background-color: #1d82d8;
  background-position: right;
  background-image: url("~@/assets/tax/images/common/logintop.png");
  .operate-area {
    position: absolute;
    top: 40px;
    right: 100px;
  }
}
</style>
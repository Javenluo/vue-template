<template>
  <div :class="classObj" class="app-wrapper">
    <tax-app-header :class="{'fixed-header':fixedHeader}" />
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <sticky v-if="needTagsView" :sticky-top="105">
        <tags-view />
      </sticky>
      <app-main />
      <right-panel v-if="showSettings" :buttonTop="550">
        <settings />
      </right-panel>
    </div>
  </div>
</template>

<script>
import RightPanel from "@/components/lvbu/RightPanel";
import TaxAppHeader from "@/components/lvbu/TaxAppHeader";
import Sticky from "@/components/lvbu/Sticky";
import {
  TagsView,
  Settings,
  Sidebar,
  AppMain
} from "@/components/lvbu/layout/components";
import { mapState } from "vuex";
export default {
  name: "Layout",
  components: {
    Sticky,
    RightPanel,
    TaxAppHeader,
    Settings,
    Sidebar,
    AppMain,
    TagsView
  },
  // mixins: [ResizeMixin],
  computed: {
    ...mapState({
      sidebar: state => state.tax_app.sidebar,
      device: state => state.tax_app.device,
      showSettings: state => state.tax_settings.showSettings,
      needTagsView: state => state.tax_settings.tagsView,
      fixedHeader: state => state.tax_settings.fixedHeader
    }),
    sidebar() {
      return this.$store.state.tax_app.sidebar;
    },
    device() {
      return this.$store.state.tax_app.device;
    },
    fixedHeader() {
      return this.$store.state.tax_settings.fixedHeader;
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === "mobile"
      };
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch("app/closeSideBar", { withoutAnimation: false });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/base/mixin.scss";
@import "~@/assets/styles/base/variables.scss";
.app-wrapper {
  @include clearfix;
  height: 100%;
  width: 100%;
  position: relative;
  top: 0;

  // box-sizing: border-box;
  // overflow  : scroll;
  .sidebar-container {
    position: fixed;
    top: $headerHeight;
    border-right: 1px solid #c5c5c5;
    background: white;
    // padding: 10px;

    .tags-scroll-con {
      &:before {
        content: "";
        display: table;
      }

      padding: 0 20px;
      position: relative;

      .tab-next {
        right: 2px;
      }

      .tab-prev {
        left: 0px;
      }

      .tab-next,
      .tab-prev {
        cursor: pointer;
        border: 0;
        position: absolute;
        text-align: center;
        height: auto;
        z-index: 2;
        line-height: 2;
      }

      .scroll-container {
        white-space: nowrap;
        position: relative;
        overflow: hidden;
        z-index: 1;
        width: 100%;

        /deep/ {
          .el-scrollbar__bar {
            bottom: 0px;
          }

          .el-scrollbar__wrap {
            height: 49px;
          }
        }
      }
    }
  }

  .main-container {
    .app-main {
      /* 50= navbar  50  */
      min-height: calc(100vh - 50px);
      width: 100%;
      position: relative;
      overflow: hidden;
      padding: 20px;
      box-sizing: border-box;
      background: white;
    }

    .fixed-header {
      position: fixed;
      top: 0;
      right: 0;
      z-index: 2;
      // width  : calc(100% - #{$sideBarWidth});
      width: 100%;
      transition: width 0.28s;
    }

    &.collapse {
      .sidebar-logo {
        margin-right: 0px;
      }
    }
  }
}

.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;

  .drawer-title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    line-height: 22px;
  }

  .drawer-item {
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    padding: 12px 0;
  }

  .drawer-switch {
    float: right;
  }
}
</style>
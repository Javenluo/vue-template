<template>
  <div class="tax-app-sidebar" :class="{'has-search': showLogo}">
    <search v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in tax_permission_routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Search from "@/components/lvbu/HeaderSearch";
import SidebarItem from "./SidebarItem";

export default {
  components: { SidebarItem, Search },
  computed: {
    ...mapGetters(["tax_permission_routes", "tax_sidebar"]),
    routes() {
      return this.$router.options.routes;
    },
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;

      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    showLogo() {
      return this.$store.state.tax_settings.sidebarSearch;
    },
    variables() {
      return "variables css";
    },
    isCollapse() {
      return false; // this.tax_sidebar.opened
    }
  }
};
</script>

<style lang="scss" scoped>
.scrollbar-wrapper {
  overflow-x: hidden !important;
}
</style>

<template>
  <div :class="{'show':show}" class="header-search">
    <hamburger
      :is-active="tax_sidebar.opened"
      class="collection"
      :class="{'transform-btn': tax_sidebar.opened}"
      @toggleClick="toggleSideBar"
    />
    <div class="search" :class="{'search-active': tax_sidebar.opened}">
      <el-select
        ref="headerSearchSelect"
        v-model="search"
        :remote-method="querySearch"
        filterable
        default-first-option
        remote
        placeholder="Search"
        class="header-search-select"
        no-data-text="无匹配结果"
        @change="change"
      >
        <el-option
          v-for="item in options"
          :key="item.path"
          :value="item"
          :label="item.title.join(' > ')"
        />
      </el-select>
      <div class="icon-but" :class="{'active': tax_sidebar.opened}" @click.stop="click">
        <i class="icon iconfont fsicon-yihushichaxun search-icon"></i>
      </div>
    </div>
    <!-- <hamburger v-if="tax_sidebar.opened" :is-active="tax_sidebar.opened" class="collection breadcrumb-enter-active" @toggleClick="toggleSideBar" /> -->
  </div>
</template>

<script>
import Fuse from "fuse.js";
import { mapGetters } from "vuex";
import path from "path";
import Hamburger from "../Hamburger";

export default {
  name: "HeaderSearch",
  components: {
    Hamburger
  },
  data() {
    return {
      search: "",
      options: [],
      searchPool: [],
      sideBarState: this.$store.getters.tax_sidebar.opened,
      show: false,
      fuse: undefined
    };
  },
  computed: {
    ...mapGetters(["tax_sidebar"]),
    routes() {
      return this.$store.getters.tax_permission_routes;
    }
  },
  watch: {
    routes() {
      this.searchPool = this.generateRoutes(this.routes);
    },
    searchPool(list) {
      this.initFuse(list);
    },
    "tax_sidebar.opened": {
      handler(value) {
        if (value) {
          document.body.addEventListener("click", this.close);
        } else {
          document.body.removeEventListener("click", this.close);
        }
      }
    }
    // show(value) {
    //   if (value) {
    //     document.body.addEventListener("click", this.close);
    //   } else {
    //     document.body.removeEventListener("click", this.close);
    //   }
    // }
  },
  mounted() {
    this.searchPool = this.generateRoutes(this.routes);
  },
  methods: {
    click() {
      if (!this.sideBarState && !this.tax_sidebar.opened) {
        this.$store.dispatch("tax_app/toggleSideBar");
      }
      this.$refs.headerSearchSelect && this.$refs.headerSearchSelect.focus();
    },
    blur() {
      this.$store.dispatch("tax_app/toggleSideBar", this.sideBarState);
    },
    toggleSideBar() {
      this.$store.dispatch("tax_app/toggleSideBar");
      this.sideBarState = this.tax_sidebar.opened;
    },
    close() {
      if (!this.sideBarState) {
        this.$store.dispatch("tax_app/toggleSideBar", this.sideBarState);
      }
      this.$refs.headerSearchSelect && this.$refs.headerSearchSelect.blur();
      this.options = [];
      this.show = false;
    },
    change(val) {
      this.$router.push(val.path);
      this.search = "";
      this.options = [];
      this.$nextTick(() => {
        this.show = false;
      });
    },
    initFuse(list) {
      this.fuse = new Fuse(list, {
        shouldSort: true,
        threshold: 0.4,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
          {
            name: "title"
          }
        ]
      });
    },
    // 筛选出显示在菜单中的路由并格式化标题
    generateRoutes(routes, basePath = "/", prefixTitle = []) {
      let res = [];

      for (const router of routes) {
        // skip hidden router
        if (router.hidden) {
          continue;
        }

        const data = {
          path: path.resolve(basePath, router.path),
          title: [...prefixTitle]
        };

        if (router.meta && router.meta.title) {
          data.title = [...data.title, router.meta.title];
          // 只添加在菜单中显示的子级菜单到搜索池
          if (!router.children) {
            res.push(data);
          }
        }

        // 递归子级路由
        if (router.children) {
          const tempRoutes = this.generateRoutes(
            router.children,
            data.path,
            data.title
          );
          if (tempRoutes.length >= 1) {
            res = [...res, ...tempRoutes];
          }
        }
      }
      return res;
    },
    querySearch(query) {
      if (query !== "") {
        this.options = this.fuse.search(query);
      } else {
        this.options = [];
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.header-search {
  // font-size: 0 !important;
  border-bottom: 1px solid #c5c5c5;
  padding: 10px 10px;
  font-size: 18px;
  .search {
    position: relative;
    display: inline-block;
    .header-search-select {
      width: 190px;
      display: none;
      line-height: auto;
    }
    .icon-but {
      width: 180px;
      cursor: pointer;
      height: 30px;
      width: 30px;
      line-height: 22px;
      text-align: center;
      &.active {
        position: absolute;
        right: 0px;
        display: inline-block;
      }
      .search-icon {
        vertical-align: middle;
      }
    }
    &.search-active {
      .header-search-select {
        display: inline-block;
      }
      .icon-but {
        line-height: 28px;
      }
    }
  }

  .collection {
    display: inline-block;
    height: 30px;
    width: 30px;
    text-align: center;
    line-height: 30px;
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px dashed #c5c5c5;
  }
  .transform-btn {
    position: absolute;
    right: 0px;
    top: 8px;
    margin-right: 10px;
    transition: all 0.5s;
    padding-bottom: 0;
    margin-bottom: 0;
    border: none;
  }
  .icon {
    margin: 0 !important;
  }

  // &.show {
  //   .header-search-select {
  //     width: 210px;
  //     margin-left: 10px;
  //   }
  // }
}
</style>

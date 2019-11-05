<template>
  <div :class="{'show':show}" class="header-search">
    <div class="search">
      <el-select
        @focus.stop="focus"
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
      <div class="icon-but" @click.stop="click">
        <i class="icon iconfont fsicon-yihushichaxun search-icon"></i>
      </div>
    </div>
    <div class="collection">
      <i class="icon iconfont fsicon-shouqicaidan"></i>
      <!-- <i class="icon iconfont fsicon-weibiaoti25"></i> -->
    </div>
  </div>
</template>

<script>
import Fuse from "fuse.js";
import path from "path";

export default {
  name: "HeaderSearch",
  data() {
    return {
      search: "",
      options: [],
      searchPool: [],
      show: false,
      fuse: undefined
    };
  },
  computed: {
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
    show(value) {
      if (value) {
        document.body.addEventListener("click", this.close);
      } else {
        document.body.removeEventListener("click", this.close);
      }
    }
  },
  mounted() {
    this.searchPool = this.generateRoutes(this.routes);
  },
  methods: {
    click() {
      this.show = !this.show;
      if (this.show) {
        this.$refs.headerSearchSelect && this.$refs.headerSearchSelect.focus();
      }
    },
    focus(){
      this.show = !this.show;
    },
    close() {
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
        console.log("jjjjj", this.options);
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
    width: 180px;
    .icon-but {
      cursor: pointer;
      height: 30px;
      width: 30px;
      position: absolute;
      right: 0px;
      line-height: 30px;
      text-align: center;
      display: inline-block;

      .search-icon {
        vertical-align: middle;
      }
    }
  }
  .collection {
    display: inline-block;
    height: 30px;
    width: 30px;
    text-align: center;
    line-height: 30px;
  }
  .icon {
    margin: 0 !important;
  }

  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>

<template>
  <div class="drawer-container">
    <div>
      <h3 class="drawer-title">Page style setting</h3>

      <div class="drawer-item">
        <span>Theme Color</span>
        <!-- <theme-picker style="float: right;height: 26px;margin: -3px 8px 0 0;" @change="themeChange" /> -->
      </div>

      <div class="drawer-item">
        <span>Open Tags-View</span>
        <el-switch v-model="tagsView" class="drawer-switch" />
      </div>

      <div class="drawer-item">
        <span>Fixed Header</span>
        <!-- <el-switch v-model="fixedHeader" class="drawer-switch" /> -->
      </div>

      <div class="drawer-item">
        <span>Sidebar Logo</span>
        <!-- <el-switch v-model="sidebarLogo" class="drawer-switch" /> -->
      </div>

    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {}
  },
  computed: {
    fixedHeader: {
      get() {
        return this.$store.state.settings.fixedHeader
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'fixedHeader',
          value: val
        })
      }
    },
    tagsView: {
      get() {
        return true // this.$store.state.settings.tagsView
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'tagsView',
          value: val
        })
      }
    },
    sidebarLogo: {
      get() {
        return this.$store.state.settings.sidebarLogo
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'sidebarLogo',
          value: val
        })
      }
    }
  },
  // methods: {
  //   themeChange(val) {
  //     this.$store.dispatch('settings/changeSetting', {
  //       key: 'theme',
  //       value: val
  //     })
  //   }
  // }
}
</script>
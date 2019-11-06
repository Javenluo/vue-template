<template>
  <div @click="toggleClick">
    <i class="icon iconfont fsicon-zhankaicaidan" :class="{'is-active':isActive}"></i>
  </div>
</template>

<script>
export default {
  name: "Hamburger",
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggleClick() {
      this.$emit("toggleClick");
    }
  }
};
</script>

<style scoped>
.iconfont {
  display: inline-block;
  vertical-align: middle;
  width: 100%;
  font-size: 24px;
  margin: 0;
}

.iconfont.is-active {
  transform: rotate(180deg);
}
#app .sidebar-container .is-active{
  background-color:white !important;
}
</style>

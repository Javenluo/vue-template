<template>
  <div class="tags-scroll-con">
    <span class="tab-prev" @click.prevent="scroll($event, 'prev')">
      <i class="icon iconfont fsicon-xiangzuo"></i>
    </span>
    <!-- <div class="scroll-container">
      <div class="items">
        <slot />
      </div>
    </div> -->
    <span class="tab-next" @click.prevent="scroll($event, 'next')">
      <i class="icon iconfont fsicon-xiangyou"></i>
    </span>
    <el-scrollbar
      ref="scrollContainer"
      :vertical="false"
      class="scroll-container"
      @wheel.native.prevent="handleScroll"
    >
    <slot />
    </el-scrollbar>
  </div>
</template>

<script>
const tagAndTagSpacing = 4; // tagAndTagSpacing

export default {
  name: "ScrollPane",
  data() {
    return {
      left: 0
    };
  },
  computed: {
    scrollWrapper() {
      console.log("jjeeqqqq", this.$refs.scrollContainer.$refs);
      return this.$refs.scrollContainer.$refs.wrap;
    }
  },
  methods: {
    // transform: translateX(-1013px);
    scroll(event, name) {
      let transSpace = 100;
      if (name === "prev") transSpace = -100;
      const $scrollWrapper = this.scrollWrapper;
      $scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft + transSpace;
    },
    handleScroll(e) {
      const eventDelta = e.wheelDelta || -e.deltaY * 40;
      const $scrollWrapper = this.scrollWrapper;
      $scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft + eventDelta / 4;
    },
    moveToTarget(currentTag) {
      const $container = this.$refs.scrollContainer.$el;
      const $containerWidth = $container.offsetWidth;
      const $scrollWrapper = this.scrollWrapper;
      const tagList = this.$parent.$refs.tag;

      let firstTag = null;
      let lastTag = null;

      // find first tag and last tag
      if (tagList.length > 0) {
        firstTag = tagList[0];
        lastTag = tagList[tagList.length - 1];
      }

      if (firstTag === currentTag) {
        $scrollWrapper.scrollLeft = 0;
      } else if (lastTag === currentTag) {
        $scrollWrapper.scrollLeft =
          $scrollWrapper.scrollWidth - $containerWidth;
      } else {
        // find preTag and nextTag
        const currentIndex = tagList.findIndex(item => item === currentTag);
        const prevTag = tagList[currentIndex - 1];
        const nextTag = tagList[currentIndex + 1];

        // the tag's offsetLeft after of nextTag
        const afterNextTagOffsetLeft =
          nextTag.$el.offsetLeft + nextTag.$el.offsetWidth + tagAndTagSpacing;

        // the tag's offsetLeft before of prevTag
        const beforePrevTagOffsetLeft =
          prevTag.$el.offsetLeft - tagAndTagSpacing;

        if (
          afterNextTagOffsetLeft >
          $scrollWrapper.scrollLeft + $containerWidth
        ) {
          $scrollWrapper.scrollLeft = afterNextTagOffsetLeft - $containerWidth;
        } else if (beforePrevTagOffsetLeft < $scrollWrapper.scrollLeft) {
          $scrollWrapper.scrollLeft = beforePrevTagOffsetLeft;
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
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
    .items{
      display: inline-block;
      // /deep/ {
      //   .el-scrollbar__bar {
      //     bottom: 0px;
      //   }
      //   .el-scrollbar__wrap {
      //     height: 49px;
      //   }
      // }
    }
  }
}
</style>

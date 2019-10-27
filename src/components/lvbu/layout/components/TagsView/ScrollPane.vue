<template>
  <div class="tags-scroll-con">
    <span class="tab-prev" @click.prevent="scroll($event, 'prev')">
      <i class="icon iconfont fsicon-xiangzuo" />
    </span>
    <span class="tab-next" @click.prevent="scroll($event, 'next')">
      <i class="icon iconfont fsicon-xiangyou" />
    </span>
    <div ref="scrollWrapper" class="scroll-container">
      <div ref="scrollContainer" class="items" :style="{transform: `translateX(${trace}px)`}">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
// const tagAndTagSpacing = 4; // tagAndTagSpacing

export default {
  name: "ScrollPane",
  data() {
    return {
      left: 0,
      trace: 0
    };
  },
  computed: {
    scrollWrapper() {
      // return this.$refs.scrollContainer.$refs.wrap;
      return this.$refs.scrollWrapper;
    }
  },
  methods: {
    scroll(event, name) {
      const $container = this.$refs.scrollContainer;
      let transSpace = 150;
      if (name === "prev") transSpace = -150;
      this.trace = this.trace + transSpace;
      if (this.trace < -$container.offsetWidth + this.scrollWrapper.offsetWidth) {
        this.trace = -$container.offsetWidth + this.scrollWrapper.offsetWidth
      } 
      if (this.trace > 0) {
        this.trace = 0
      }

    },
    handleScroll(e) {
      const eventDelta = e.wheelDelta || -e.deltaY * 40;
      const $scrollWrapper = this.scrollWrapper;
      $scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft + eventDelta / 4;
    },
    moveToTarget(currentTag) {
      const $container = this.$refs.scrollContainer; // .$el;
      // debugger;
      const $containerWidth = $container.offsetWidth;
      // const $scrollWrapper = this.scrollWrapper;
      const tagList = this.$parent.$refs.tag;

      let firstTag = null;
      let lastTag = null;

      // find first tag and last tag
      if (tagList.length > 0) {
        firstTag = tagList[0];
        lastTag = tagList[tagList.length - 1];
      }
      if (
        firstTag === currentTag ||
        this.scrollWrapper.offsetWidth > $containerWidth
      ) {
        this.trace = 0;
      } else if (lastTag === currentTag) {
        this.trace = this.scrollWrapper.offsetWidth - $containerWidth;
      } else {
        // // find preTag and nextTag
        // const currentIndex = tagList.findIndex(item => item === currentTag);
        // const prevTag = tagList[currentIndex - 1];
        // const nextTag = tagList[currentIndex + 1];
        const cur = currentTag.$el;

        if ($containerWidth - cur.offsetLeft < this.scrollWrapper.offsetWidth) {
          this.trace = this.scrollWrapper.offsetWidth - $containerWidth;
        } else if (
          cur.offsetLeft + cur.offsetWidth <
          this.scrollWrapper.offsetWidth
        ) {
          this.trace = 0;
        } else {
          this.trace = -cur.offsetLeft + this.scrollWrapper.offsetWidth / 2;
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
    .items {
      transition: transform 0.3s;
      display: inline-block;
    }
  }
}
</style>

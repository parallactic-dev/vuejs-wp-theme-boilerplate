<template>
  <div class="page__wrap">
    <div class="page__start">
      <page-header />
    </div>
    <main class="page__main">
      <transition name="page-transition" mode="out-in">
        <router-view v-bind:key="$route.path"></router-view>
      </transition>
    </main>
    <div class="page__end">
      <page-footer />
    </div>
  </div>
</template>

<script>
import PageHeader from '@/components/layout/PageHeader.vue';
import PageFooter from '@/components/layout/PageFooter.vue';

export default {
  components: {
    PageHeader,
    PageFooter,
  },
  mounted() {
    this.$store.dispatch('getMenus');
  }
};
</script>

<style lang="scss">
@import '@/styles/static/main';

.page__wrap {
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  min-height: 100vh;
  overflow: hidden;
}

.page__start,
.page__end {
  flex: 0 0 auto;
}

.page__main {
  flex: 1 1 auto;
  padding: 27rem 0;

  @include breakpoint('phone') {
    padding: 15rem 0;
  }
}


// page transition
$transition-duration: 250ms;

.page-transition-leave-active,
.page-transition-enter-active {
  position: relative;
  z-index: 100;
  transition: opacity 1ms linear #{$transition-duration * 2};

  &::after {
    content: "";
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: $color-light;
    transform: scaleY(0);
    transform-origin: bottom;
    transition: transform $transition-duration cubic-bezier(0.16, 1, 0.3, 1) 0ms;
  }
}

.page-transition-enter-active {
  z-index: 99;

  &::after {
    transform: scaleY(1);
    transform-origin: top;
    transition: transform $transition-duration cubic-bezier(0.16, 1, 0.3, 1) $transition-duration;
  }
}

.page-transition-enter, .page-transition-leave-to {
  opacity: 0.999;
}

.page-transition-leave-to {

  &::after {
    transform: scaleY(1);
  }
}

.page-transition-enter-to {
  &::after {
    transform: scaleY(0);
  }
}
</style>
<template>
  <div class="page__wrap">
    <div class="page__start">
      <page-header />
    </div>
    <transition name="page-transition" mode="out-in" appear>
      <main class="page__main">
        <router-view v-bind:key="$route.path"></router-view>
      </main>
    </transition>
    <div class="page__end">
      <page-footer />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
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
}

.page__start,
.page__end {
  flex: 0 0 auto;
}

.page__main {
  flex: 1 1 auto;
  padding: 14rem 0;
}
</style>
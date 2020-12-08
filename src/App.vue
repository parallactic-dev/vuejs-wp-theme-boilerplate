<template>
  <div class="page">
    <page-header class="page__header" />
    <transition name="page-transition" mode="out-in" appear>
      <div class="page__content">
        <router-view></router-view>
      </div>
    </transition>
    <page-footer class="page__footer" />
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
};
</script>

<style lang="scss">
@import '@/styles/static/main';

</style>
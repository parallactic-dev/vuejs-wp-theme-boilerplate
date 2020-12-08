<template>
  <div class="page">
    <template v-if="pageLoaded">
      <h1 class="page__title">{{ pageContent.title.rendered }}</h1>
      <div class="page__content" v-html="pageContent.content.rendered"></div>
    </template>
    <loader v-else />
  </div>
</template>

<script>
import Loader from '@/components/layout/Loader.vue';
import { mapGetters } from 'vuex';
import api from '@/api';

export default {
  components: {
    Loader,
  },
  beforeMount() {
    // read the slug from body data attribute if on home route
    const slug = this.$route.name === 'Home' 
      ? document.querySelector('body').getAttribute('data-homepage') 
      : this.$route.params.pageSlug;
    this.$store.dispatch('getPage', slug);
  },
  computed: {
    ...mapGetters({
      page: 'page',
      pageLoaded: 'pageLoaded',
    }),

    pageContent() {
      return this.page;
    },
  },
};
</script>

<style lang="scss"></style>

<template>
  <div class="some-pages">
    <h2 class="some-pages__title">
      <slot></slot>
    </h2>

    <div v-if="pageLoaded">
      <router-link v-for="page in somePages(limit)" v-bind:key="page.id" v-bind:to="page.slug">
        <article class="page-preview">
          <h3 class="page-preview__title" v-html="page.title.rendered"></h3>
          <p class="page-preview__excerpt" v-html="page.excerpt.rendered"></p>
        </article>
      </router-link>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'SomePages',
  props: ['limit'],
  mounted() {
    this.$store.dispatch('getPages');
  },
  computed: {
    ...mapGetters({
      somePages: 'somePages',
      pageLoaded: 'pageLoaded',
    }),
  },
};
</script>

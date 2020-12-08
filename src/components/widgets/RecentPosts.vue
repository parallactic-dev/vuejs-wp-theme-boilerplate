<template>
  <div class="recent-posts">
    <h2 class="resent-posts__title">
      <slot></slot>
    </h2>
    <div v-if="recentPostsLoaded">
      <router-link v-for="post in recentPosts(limit)" v-bind:key="post.id" v-bind:to="post.slug">
        <article class="post-preview">
          <h3 class="page-preview__title" v-html="post.title.rendered"></h3>
          <p class="page-preview__excerpt" v-html="post.excerpt.rendered"></p>
        </article>
      </router-link>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'RecentPosts',
  props: ['limit'],
  mounted() {
    this.$store.dispatch('getPosts', { limit: this.limit });
  },
  computed: {
    ...mapGetters({
      recentPosts: 'recentPosts',
      recentPostsLoaded: 'recentPostsLoaded',
    }),
  },
};
</script>

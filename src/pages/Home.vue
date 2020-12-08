<template>
  <div class="page page--home">
    <recent-posts v-bind:limit="5">Recent Posts</recent-posts>
    <some-pages v-bind:limit="5">Pages</some-pages>
  </div>
</template>

<script>
import RecentPosts from '@/components/widgets/RecentPosts.vue';
import SomePages from '@/components/widgets/SomePages.vue';

export default {
  components: {
    RecentPosts,
    SomePages,
  },
};
</script>

<style lang="scss"></style>

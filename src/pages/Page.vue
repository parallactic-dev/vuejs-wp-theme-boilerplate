<template>
  <div class="content-page">
    <template v-if="pageLoaded">
      <div class="content-page__wrapper" v-bind:key="pageContent.id">
        <div class="content-page__content-column">
          <h1 class="content-page__title">{{ pageContent.title.rendered }}</h1>
          <!-- you could either use pre rendered html from wp -->
          <!-- <div class="content-page__content" v-html="pageContent.content.rendered"></div> -->

          <!-- or use frontend rendering blocks -->
          <content-blocks v-bind:blocks="pageContent.acf.page_content"></content-blocks>
        </div>
      </div>
    </template>
    <loader v-else />
  </div>
</template>

<script>
import Loader from '@/components/layout/Loader.vue';
import ContentBlocks from '@/components/content/ContentBlocks.vue';
import { mapGetters } from 'vuex';

export default {
  components: {
    Loader,
    ContentBlocks
  },
  metaInfo () {
    let meta = {
      title: this.pageTitle,
      meta: [
        { vmid: 'description', name: 'description', content: this.metaDescription },
        { vmid: 'og:title', property: 'og:title', content: this.pageTitle },
        { vmid: 'og:description', property: 'og:description', content: this.metaDescription },
        { vmid: 'og:url', property: 'og:url', content: this.linkCanonical },
      ],
      link: [
        { vmid: 'canonical', rel: 'canonical', href: this.linkCanonical },
      ]
    };

    if (this.ogImage) {
      meta.meta.push({ vmid: 'og:image', property: 'og:image', content: this.ogImage });
    }

    return meta;
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
      meta: 'meta',
      page: 'page',
      pageLoaded: 'pageLoaded',
    }),
    pageTitle() {
      if (!this.page) return;
      return this.page.acf.meta_title 
        ? this.page.acf.meta_title 
        : this.page.title.rendered;
    },
    metaDescription() {
      if (this.page && this.page.acf.meta_description) {
        return this.page.acf.meta_description
      }
    },
    linkCanonical() {
      if (!this.page) return;
      return `${window.origin}/${this.page.slug}`
    },
    ogImage() {
      if (!this.page || !this.page.acf || !this.page.acf.meta_image) return;
      return this.page.acf.meta_image.sizes.large;
    },
    pageContent() {
      return this.page;
    },
  }
};
</script>

<style lang="scss">
.content-page {
  @include container;
}

.content-page__wrapper {
  @include grid();
}

.content-page__content-column {
  @include grid__cell(5);
  @include grid__cell--push-left(1);
  max-width: 68rem;

  @include breakpoint('tablet') {
    @include grid__cell(11);
  }

  @include breakpoint('phone') {
    @include grid__cell(12);
    @include grid__cell--push-left(0);
  }
}

.content-page__title {
  font-size: 5rem;
  line-height: 1.2;

  @include breakpoint('phone') {
    font-size: 4rem;
  }
}
</style>
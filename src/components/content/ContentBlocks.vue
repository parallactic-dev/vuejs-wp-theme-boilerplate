<script>
import TextBlock from '@/components/content/TextBlock';
import ContactForm from '@/components/content/ContactForm';

export default {
  name: 'ContentBlocks',
  components: {
    TextBlock,
    ContactForm,
  },
  props: {
    blocks: Array | Boolean
  },
  methods: {
    getComponentName(layout) {
      switch (layout) {
        case 'text_block':
          return 'text-block';

        case 'contact_form':
          return 'contact-form';

      }
    }
  }
}
</script>

<template>
  <div class="content-blocks" v-if="blocks">
    <component
      v-for="(block, i) in blocks"
      v-bind:key="i"
      v-bind:data="block"
      v-bind:is="getComponentName(block.acf_fc_layout)"
    />
  </div>
</template>

<style lang="scss">

</style>

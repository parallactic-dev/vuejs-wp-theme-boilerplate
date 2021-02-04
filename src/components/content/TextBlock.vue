<script>
export default {
  name: 'TextBlock',
  props: {
    data: Object
  },
}
</script>

<template>
  <div class="text-block" v-html="data.text"></div>
</template>

<style lang="scss">

</style>
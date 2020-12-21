<template>
  <button class="main-menu__button" v-on:click="toggleMenu">
    <span v-if="!isExpanded">Menü</span>
    <span v-else>Menü schliessen</span>
  </button>
</template>

<script>
export default {
  name: 'MenuButton',
  props: {
    isExp
  }
};
</script>

<style lang="scss">
.logo {
    display: block;
}

.logo__shape {
    fill: $color-primary;
}
</style>
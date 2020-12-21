<template>
  <header class="page-header">
    <router-link class="page-header__logo" to="/">
      <logo />
    </router-link>
    <div class="page-header__main-menu">
      <main-menu />
    </div>
  </header>
</template>

<script>
import Logo from '@/components/layout/Logo';
import MainMenu from '@/components/layout/MainMenu';

export default {
  name: 'PageHeader',
  components: {
    Logo,
    MainMenu
  }
};
</script>

<style lang="scss">
.page-header {
  @include container;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 6rem;
}

.page-header__logo {
  flex: 0 1 16.667%;
}
</style>
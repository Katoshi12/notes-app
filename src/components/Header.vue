<script setup lang="ts">

</script>

<template>
  <header class="header">
    <div class="container header__content">
      <img
        src="@/assets/icons/logo.svg"
        alt="logo"
        class="header__logo"
      >

      <button class="btn text-normal">
        <img
          src="@/assets/icons/login.svg"
          alt="Login icon"
          class="btn__icon"
        />
        Войти
      </button>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  padding: 40px 0;
  .header__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .header__logo {
    @media (max-width: 360px) {
      width: 154px;
      height: 36px;
    }
  }
}
</style>

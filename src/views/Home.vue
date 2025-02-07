<script setup lang="ts"></script>

<template>
  <section class="welcome">
    <div class="container welcome__content">
      <div class="welcome__text">
        <h1>Мои заметки</h1>

        <h3>Не забывай о важном, храни его в облаке.</h3>
      </div>

      <div class="welcome__object">
        <img src="@/assets/icons/object.svg" alt="object" class="welcome__image" />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.welcome {
  &__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media (max-width: 768px) {
      flex-direction: column;
    }
  }
  &__text {
    h1 {
      width: 80px;
      @media (max-width: 768px) {
        text-align: center;
        width: 100%;
      }
    }
    h3 {
      width: 380px;
      @media (max-width: 768px) {
        text-align: center;
        width: 100%;
      }
    }
  }
  &__image {
    @media (max-width: 1367px) {
      width: 627px;
      height: 579px;
    }
    @media (max-width: 768px) {
      width: 100%;
    }
  }
}
</style>

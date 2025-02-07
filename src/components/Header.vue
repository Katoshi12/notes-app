<script setup lang="ts">
import { ref } from 'vue';
import Modal from '@/components/Modal.vue';
import axios from '@/utils/axios';
import LoginForm from '@/components/LoginForm.vue';

const showModal = ref<boolean>(false);

const email = ref('');
const password = ref('');
const confirmPassword = ref('');

const onLogin = async () => {
  try {
    const response = await axios.post('/reg', {
      email: email.value,
      password: password.value,
      confirm_password: confirmPassword.value,
    });
    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error during registration:', error);
  }
};
</script>

<template>
  <header class="header">
    <div class="container header__content">
      <img src="@/assets/icons/logo.svg" alt="logo" class="header__logo" />

      <button class="btn text-normal" @click="showModal = true">
        <img src="@/assets/icons/login.svg" alt="Login icon" class="btn__icon" />
        Войти
      </button>

      <Modal v-model="showModal">
        <login-form />
      </Modal>
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

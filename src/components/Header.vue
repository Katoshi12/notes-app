<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Modal from '@/components/Modal.vue'
import LoginForm from '@/components/LoginForm.vue'
import RegisterForm from '@/components/RegisterForm.vue'
import axios from '@/utils/axios.ts'

const showModal = ref<boolean>(false)
const isRegisterForm = ref<boolean>(false)
const token = ref<string | null>(null)
const userEmail = ref<string | null>(null)

const userInfo = async () => {
  if (!token.value) return

  try {
    const response = await axios.get('/auth', {
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    })
    userEmail.value = response.data.email
  } catch (error) {
    console.error('Ошибка получения профиля:', error)
  }
}

const loadUserData = () => {
  token.value = localStorage.getItem('token')
  userEmail.value = localStorage.getItem('email')
  showModal.value = false
}

const openLoginForm = () => {
  isRegisterForm.value = false
  showModal.value = true
}

const openRegisterForm = () => {
  isRegisterForm.value = true
  showModal.value = true
}

const handleLoginSuccess = () => {
  loadUserData()
  userInfo()
  showModal.value = false
}

onMounted(() => {
  loadUserData()
  if (token.value) {
    userInfo()
  }
})
</script>

<template>
  <header class="header">
    <div class="container header__content">
      <div class="header__logo"></div>

      <div v-if="token" class="header__user">
        <span class="text-small">{{ userEmail }}</span>
        <span class="user-profile">
          <img src="@/assets/icons/user.svg" alt="user profile" class="user-profile__icon">
        </span>
      </div>

      <button v-else class="btn text-normal" @click="showModal = true">
        <img
          src="@/assets/icons/login.svg"
          alt="Login icon"
          class="btn__icon"
        />
        Войти
      </button>

      <Modal v-model="showModal">

        <LoginForm
          v-if="!isRegisterForm"
          @switchToRegister="openRegisterForm"
          @loginSuccess="handleLoginSuccess"
        />

        <RegisterForm v-else @switchToLogin="openLoginForm" />
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

  .header__logo {
    width: 220px;
    height: 50px;
    background-image: url('@/assets/icons/logo.svg');
    background-repeat: no-repeat;
    background-position: center;
    transition: background-image 0.3s ease-in-out;

    @media (max-width: 360px) {
      background-image: url('@/assets/icons/logo-mob.svg');
      width: 154px;
      height: 36px;
      background-position: left;
    }
  }

  .header__email {
    font-size: 16px;
    font-weight: bold;
    color: var(--color-green-light);
  }
}

.header__user {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-profile {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--color-dark-middle);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

  &__icon {
    width: 24px;
    height: 24px;
    filter: brightness(0) invert(1);
  }
}
</style>

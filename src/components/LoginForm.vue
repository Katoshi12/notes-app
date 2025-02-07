<script setup lang="ts">
import { ref } from 'vue';
import BaseInput from '@/components/base/BaseInput.vue';
import axios from '@/utils/axios.ts';

const email = ref<string>('');
const password = ref<string>('');

const emailError = ref<string>('');
const passwordError = ref<string>('');
const errorAuth = ref<string>('');

const handleSubmit = async () => {
  emailError.value = '';
  passwordError.value = '';
  errorAuth.value = ''

  await axios.post('/auth', {
    email: email.value,
    password: password.value,
  }).then((response) => {
    console.log(response);
  }).catch((error) => {
    if (error.response) {
      const { message, statusCode } = error.response.data

      if (statusCode === 404) {
        errorAuth.value = message;
      }

      message.forEach((msg: string) => {
        console.log(msg);
        if (msg.includes('E-Mail') || msg.includes('адрес электронной почты')) {
          emailError.value = msg;
        }
        if (msg.includes('Пароль')) {
          passwordError.value = msg;
        }
      })

    }
  })
};
</script>

<template>
  <section class="login-form">
    <h2 class="login-form__title">Вход в ваш аккаунт</h2>

    <form @submit.prevent="handleSubmit" class="login-form__container">
      <BaseInput
        v-model="email"
        label="Email"
        class="text-gray text-small"
        placeholder="Введите email"
        :error-message="emailError"
      />

      <BaseInput
        v-model="password"
        :show-toggle="true"
        label="Пароль"
        type="password"
        class="login-form__field text-gray text-small"
        placeholder="Введите пароль"
        :error-message="passwordError"
      />

      <div class="login-form__footer">
        <div class="login-form__register">
          <span class="text-small text-gray">У вас нет аккаунта? </span>
          <a href="#" class="text-small-bold text-green">Зарегистрируйтесь</a>
        </div>

        <button class="btn text-normal btn-mob" type="submit">Войти</button>

      </div>
      <div v-if="errorAuth" class="login-form__error text-small">
        {{ errorAuth }}
      </div>

    </form>
  </section>
</template>

<style scoped lang="scss">
.login-form {
  width: 100%;
  max-width: 700px;
  margin: 0 auto;

  &__container {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
  }

  &__field {
    margin-top: 24px;
    margin-bottom: 40px;
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: 12px;
    @media (max-width: 360px) {
      flex-direction: column-reverse;
      .btn-mob {
        width: 100%;
        margin-bottom: 12px;
      }
    }
  }

  &__register {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  &__error {
    background: rgba(255, 116, 97, 0.1);
    color: var(--color-red);
    border-radius: 8px;
    padding: 8px 12px;
    font-size: 14px;
  }
}

.text-gray {
  color: var(--color-gray);
}

.text-green {
  color: var(--color-green-light);
}
</style>

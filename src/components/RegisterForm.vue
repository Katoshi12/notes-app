<script setup lang="ts">
import { reactive, ref } from 'vue'
import axios from '@/utils/axios.ts'
import BaseInput from '@/components/base/BaseInput.vue'

interface RegisterInterface {
  email: string
  password: string
  passwordConfirm: string
}

const form = reactive<RegisterInterface>({
  email: '',
  password: '',
  passwordConfirm: '',
})

const emit = defineEmits(['switchToLogin'])

const errorAuth = ref<string>('')
const emailError = ref<string>('')
const passwordError = ref<string>('')
const passwordConfirmError = ref<string>('')

const validateForm = (): boolean => {
  let isValid = true

  passwordError.value = ''
  passwordConfirmError.value = ''
  errorAuth.value = ''

  if (!form.passwordConfirm) {
    passwordConfirmError.value = 'Подтвердите пароль'
    isValid = false
  } else if (form.password !== form.passwordConfirm) {
    passwordConfirmError.value = 'Пароли не совпадают'
    isValid = false
  }

  return isValid
}

const handleSubmit = async (): Promise<void> => {
  if (!validateForm()) return

  await axios
    .post('/reg', {
      email: form.email,
      password: form.password,
      confirm_password: form.passwordConfirm,
    })
    .then((response) => {
      if (response.status !== 200) {
        throw new Error('Ошибка регистрации')
      }
      emit('switchToLogin')
    })
    .catch((error) => {
      const { message } = error.response.data
      errorAuth.value = message
      if (error.response) {
        message.forEach((msg: string) => {
          if (msg.includes('E-Mail') || msg.includes('адрес электронной почты')) {
            emailError.value = msg
          } else if (msg.includes('Пароль')) {
            passwordError.value = msg
          } else if (msg.includes('совпадают')) {
            passwordConfirmError.value = msg
          } else {
            errorAuth.value = msg
          }
        })
      }
    })

}
</script>

<template>
  <section class="register-form">
    <h2 class="register-form__title">Регистрация</h2>

    <form @submit.prevent="handleSubmit" class="register-form__container">
      <BaseInput
        v-model="form.email"
        label="Email"
        class="text-gray"
        placeholder="Введите email"
        autocomplete="off"
        :error-message="emailError"
      />

      <BaseInput
        v-model="form.password"
        label="Пароль"
        type="password"
        class="text-gray"
        placeholder="Введите пароль"
        autocomplete="off"
        :show-toggle="true"
        :error-message="passwordError"
      />

      <BaseInput
        v-model="form.passwordConfirm"
        label="Подтвердите пароль"
        type="password"
        class="text-gray register-form__field"
        placeholder="Повторите пароль"
        autocomplete="off"
        :show-toggle="true"
        :error-message="passwordConfirmError"
      />

      <div class="register-form__footer">
        <div class="register-form__register">
          <span class="text-small text-gray">У вас есть аккаунт? </span>
          <span
            @click.prevent="$emit('switchToLogin')"
            class="text-small-bold text-green text-hover"
          >
            Войти
          </span>
        </div>

        <button class="btn text-normal btn-mob" type="submit">Зарегистрироваться</button>
      </div>

      <div v-if="errorAuth" class="register-form__error text-small">
        {{ errorAuth }}
      </div>
    </form>
  </section>
</template>

<style scoped lang="scss">
.register-form {
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
</style>

<script setup lang="ts">
import { ref, computed } from 'vue'
import axios from '@/utils/axios.ts'
import BaseInput from '@/components/base/BaseInput.vue'

const emit = defineEmits(['noteAdded'])

const title = ref<string>('')
const content = ref<string>('')
const titleError = ref<string | null>(null)
const contentError = ref<string | null>(null)
const msgError = ref<string>('')

const TITLE_LIMIT = 64
const CONTENT_LIMIT = 255

const titleLength = computed(() => title.value.length)
const contentLength = computed(() => content.value.length)

const isTitleValid = computed(() => titleLength.value <= TITLE_LIMIT)
const isContentValid = computed(() => contentLength.value <= CONTENT_LIMIT)

const submitNote = async () => {
  titleError.value = null
  contentError.value = null
  msgError.value = ''

  const newNote = {
    title: title.value,
    content: content.value,
  }

  await axios
    .post('/notes', newNote)
    .then((response) => {
      emit('noteAdded', response.data)
      title.value = ''
      content.value = ''
    })
    .catch((error) => {
      if (error.response) {
        const { message, status } = error.response.data

        message.forEach((msg: string) => {
          if (msg.includes('Заголовок')) {
            titleError.value = msg
          }
          if (msg.includes('Содержимое')) {
            contentError.value = msg
          }
          if (status === 400 || status === 401) {
            msgError.value = msg
          }
        })
      }
    })
}
</script>

<template>
  <section class="add-note">
    <h2 class="add-note__title">Добавление заметки</h2>

    <form @submit.prevent="submitNote" class="add-note__container">
      <!-- Заголовок -->
      <div class="add-note__field">
        <BaseInput v-model="title" label="Название" placeholder="Введите название" />
        <span class="add-note__counter text-small" :class="{ 'add-note__error-text': !isTitleValid }">
          {{ titleLength }}/{{ TITLE_LIMIT }}
        </span>
        <span v-if="titleError" class="add-note__error text-small">{{ titleError }}</span>
      </div>

      <!-- Содержимое -->
      <div class="add-note__field">
        <label class="text-small">Описание</label>
        <textarea v-model="content" placeholder="Введите текст заметки" class="add-note__textarea text-small" />
        <span class="add-note__counter text-small" :class="{ 'add-note__error-text': !isContentValid }">
          {{ contentLength }}/{{ CONTENT_LIMIT }}
        </span>
        <span v-if="contentError" class="add-note__error text-small">{{ contentError }}</span>
      </div>

      <div class="add-note__footer">
        <button class="btn text-normal btn-mob" type="submit">
          Добавить
        </button>
      </div>

      <div v-if="msgError" class="add-note__error text-small">
        {{ msgError }}
      </div>
    </form>
  </section>
</template>

<style scoped lang="scss">
.add-note {
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
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  &__textarea {
    height: 120px;
    padding: 16px 28px;
    border: 1px solid var(--color-gray);
    border-radius: 36px;
    outline: none;
    resize: none;
    transition: border-color 0.2s ease-in-out;

    &:focus {
      border-color: var(--color-green-light);
    }
  }

  &__counter {
    color: var(--color-gray);
    text-align: right;
    margin-right: 24px;
  }

  &__error-text {
    color: var(--color-red);
  }

  &__error {
    background: rgba(255, 116, 97, 0.1);
    color: var(--color-red);
    border-radius: 8px;
    padding: 8px 12px;
    font-size: 14px;
  }

  &__footer {
    display: flex;
    justify-content: flex-end;
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
}
</style>

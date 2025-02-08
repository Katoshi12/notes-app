<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import axios from '@/utils/axios.ts'

const props = defineProps({
  id: Number,
  title: String,
  text: String
})

const emit = defineEmits(['deleteNote'])

const handleDelete = async () => {
  if (!props.id) return

    await axios.delete(`/notes/${props.id}`)
      .then(res => console.log(res))
    emit('deleteNote', props.id)
}
</script>

<template>
  <div class="note">
    <div class="note__title">
      <h4>{{ title }}</h4>
    </div>
    <div class="note__body">
      <p class="text-normal">{{ text }}</p>
    </div>
    <div class="note__footer">
      <button class="note__delete text-normal" @click="handleDelete">
        Удалить
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.note {
  position: relative;
  width: 508px;
  word-break: break-all;
  min-height: 300px;
  background: var(--color-green-light);
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  clip-path: polygon(0 0, calc(100% - 40px) 0, 100% 40px, 100% 100%, 0 100%);
  @media (max-width: 768px) {
    width: 688px;
  }
  @media (min-width: 320px) and (max-width: 480px) {
    width: 290px;
  }

  &::after {
    content: "";
    position: absolute;
    top: 40px;
    right: 40px;
    width: 40px;
    height: 40px;
    background: var(--color-green-middle);
    clip-path: polygon(0 0, 100% 0, 100% 100%);
    transform: rotate(180deg);
    transform-origin: top right;
  }

  &__title {
    padding-left: 28px;
    border-bottom: 1px solid var(--color-green-middle);
  }

  &__body {
    padding:0 28px;
    flex-grow: 1;
  }

  &__footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 12px;
    margin-right: 32px;
  }

  &__delete {
    border: none;
    background: transparent;
    cursor: pointer;
    color: var(--color-white);
    background-image: url('@/assets/icons/close.svg');
    background-repeat: no-repeat;
    background-position: left center;
    background-size: 16px;
    padding-left: 24px;

    &:hover {
      text-decoration: underline;
      transition: text-decoration 0.3s ease-in-out;
    }
  }
}
</style>

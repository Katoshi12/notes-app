<script setup lang="ts">
defineProps({
  modelValue: Boolean,
})

const emit = defineEmits(['update:modelValue'])

const closeModal = (): void => {
  emit('update:modelValue', false)
}
</script>

<template>
  <transition name="modal-fade">
    <div
      v-if="modelValue"
      class="modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalTitle"
    >
      <div class="modal__overlay" @click="closeModal"></div>

      <div class="modal__content">
        <button
          class="btn-rounded modal__close"
          type="button"
          aria-label="Закрыть окно"
          @click="closeModal"
        >
          <img src="@/assets/icons/close.svg" alt="close" />
        </button>

        <slot />
      </div>
    </div>
  </transition>
</template>

<style scoped lang="scss">
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;

  &__overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background: transparent;
  }

  &__content {
    position: relative;
    width: 780px;
    min-height: 200px;
    background: var(--color-dark-middle);
    border-radius: 40px;
    padding: 24px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);

    @media (max-width: 1366px) {
      width: 594px;
      min-height: 300px;
    }

    @media (max-width: 768px) {
      width: 688px;
      min-height: 300px;
    }

    @media (max-width: 360px) {
      width: 352px;
      min-height: 300px;
    }
  }

  &__close {
    position: absolute;
    top: 20px;
    right: 20px;
    border: none;
    cursor: pointer;
    font-size: 24px;
    line-height: 1;
  }
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>

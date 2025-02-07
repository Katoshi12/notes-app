<script setup lang="ts">
import { computed, ref } from 'vue';

const props = defineProps<{
  modelValue: string;
  type?: string;
  label?: string;
  placeholder?: string;
  showToggle?: boolean;
  errorMessage?: string;
}>();

const emits = defineEmits(['update:modelValue']);

const showPassword = ref(false);

const toggleShowPassword = (): void => {
  showPassword.value = !showPassword.value;
};

const actualType = computed(() =>
  props.type === 'password' && showPassword.value ? 'text' : props.type || 'text',
);
</script>

<template>
  <div class="base-input">
    <label v-if="label" class="text-small base-input__label">
      {{ label }}
    </label>

    <div class="base-input__wrapper">
      <input
        :type="actualType"
        :placeholder="placeholder"
        :value="modelValue"
        @input="(e) => emits('update:modelValue', (e.target as HTMLInputElement).value)"
        class="base-input__field"
      />

      <button
        v-if="type === 'password' && showToggle"
        type="button"
        class="base-input__toggle"
        @click="toggleShowPassword"
      >
        <img v-if="!showPassword" src="@/assets/icons/visible.svg" alt="Show password" />
        <img v-else src="@/assets/icons/hide.svg" alt="Hide password" />
      </button>
    </div>

    <span v-if="errorMessage" class="base-input__error">{{ errorMessage }}</span>
  </div>
</template>

<style scoped lang="scss">
.base-input {
  display: flex;
  flex-direction: column;
  gap: 8px;

  &__label {
    margin-left: 24px;
  }

  &__wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }

  &__field {
    width: 100%;
    padding: 23px 28px;
    font-size: 14px;
    border-radius: 36px;
    outline: none;
    transition: border-color ease-in-out 0.3s;
  }

  &__error {
    color: var(--color-red);
    font-size: 14px;
    margin-left: 24px;
    margin-top: 4px;
  }

  &__toggle {
    position: absolute;
    right: 12px;
    background: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
  }
}
</style>

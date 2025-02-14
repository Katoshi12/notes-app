<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Modal from '@/components/Modal.vue'
import Note from '@/components/Note.vue'
import AddNote from '@/components/AddNote.vue'
import axios from '@/utils/axios.ts'

const showModal = ref<boolean>(false)
const notes = ref<any[]>([])

const getNotes = async () => {
  try {
    const response = await axios.get('/notes')
    notes.value = response.data
  } catch (error) {
    console.error('Ошибка получения заметок:', error)
  }
}

const removeNote = (id: number) => {
  notes.value = notes.value.filter((note) => note.id !== id)
}

const handleNoteAdded = (newNote: any) => {
  notes.value.push(newNote)
  showModal.value = false
}

onMounted(() => {
  getNotes()
})
</script>

<template>
  <section class="dashboard">
    <button @click="showModal = true" class="add-note-btn">
      <img src="@/assets/icons/add.svg" alt="Добавить заметку" />
    </button>

    <transition-group name="fade" tag="div" class="notes-container">
      <Note
        v-for="note in notes"
        :key="note.id"
        :id="note.id"
        :title="note.title"
        :text="note.content"
        @deleteNote="removeNote"
      />
    </transition-group>

    <Modal v-model="showModal">
      <AddNote @noteAdded="handleNoteAdded" />
    </Modal>
  </section>
</template>

<style scoped lang="scss">
.add-note-btn {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--color-green-light);
  border: none;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  z-index: 99999;
  cursor: pointer;
  transition:
    background 0.2s ease-in-out,
    transform 0.2s ease-in-out;

  &:hover {
    background: var(--color-green-middle);
    transform: scale(1.1);
  }

  &:active {
    background: var(--color-green-dark);
    transform: scale(0.95);
  }
}

.notes-container {
  display: grid;
  gap: 16px;
  justify-content: center;
  align-items: start;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  @media (min-width: 1366px) and (max-width: 1920px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>

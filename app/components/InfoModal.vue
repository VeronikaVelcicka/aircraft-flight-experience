<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

const {
  visible
} = defineProps<{
  visible: boolean
}>()

const emit = defineEmits<{ close: [] }>()

const specs = [
  { label: 'Length', value: '8.28 m' },
  { label: 'Wingspan', value: '11.0 m' },
  { label: 'Max Speed', value: '302 km/h' },
  { label: 'Range', value: '1 289 km' }
]

function onKeydown(event: KeyboardEvent) {
  if (visible && event.key === 'Escape') emit('close')
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="visible" class="info-modal" @click.self="emit('close')">
        <div
          class="info-modal__content"
          role="dialog"
          aria-modal="true"
          aria-labelledby="info-modal-title"
        >
          <h2 id="info-modal-title" class="info-modal__title">
            Cessna 172 Skyhawk
          </h2>
          <dl class="info-modal__grid">
            <div v-for="spec in specs" :key="spec.label" class="info-modal__item">
              <dt class="info-modal__label">
                {{ spec.label }}
              </dt>
              <dd class="info-modal__value">
                {{ spec.value }}
              </dd>
            </div>
          </dl>
          <button type="button" class="info-modal__close" @click="emit('close')">
            Close
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.info-modal {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(0 0 0 / 60%);
  z-index: 100;
}

.info-modal__content {
  background: var(--color-surface);
  border: 1px solid rgb(var(--color-accent-rgb) / 30%);
  border-radius: var(--radius-lg);
  padding: 1.5rem 2rem;
  color: var(--color-text);
  font-family: var(--font-mono);
  min-width: 17.5rem;
}

.info-modal__title {
  margin: 0;
}

.info-modal__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem 1.5rem;
  margin: 1rem 0;
}

.info-modal__item {
  display: flex;
  flex-direction: column;
}

.info-modal__label {
  font-size: 0.8rem;
  opacity: 0.7;
}

.info-modal__value {
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0;
}

.info-modal__close {
  background: rgb(var(--color-accent-rgb) / 15%);
  border: 1px solid rgb(var(--color-accent-rgb) / 40%);
  color: var(--color-text);
  padding: 0.5rem 1rem;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-family: inherit;
}

.info-modal__close:hover {
  background: rgb(var(--color-accent-rgb) / 25%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

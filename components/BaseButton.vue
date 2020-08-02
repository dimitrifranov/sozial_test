<template>
  <div class="mb-4">
    <button
      :type="type"
      name="button"
      class="font-light bg-transparent h-10 hover:bg-white text-white hover:text-grey py-2 px-4 mt-2 border border-white hover:border-transparent transition-colors duration-200"
    >
      <slot />
    </button>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'button'
    },
    name: {
      type: String,
      default: 'button'
    }
  }
}
</script>

<style scoped></style>

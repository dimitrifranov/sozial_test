<template>
  <div class="container mb-4">
    <label class="block text-white font-light text-xs" :for="value">
      {{ label }}
    </label>
    <input
      :type="type"
      :name="value"
      :value="value"
      class="border border-white w-full py-2 px-3 text-white bg-transparent focus:bg-white focus:text-grey font-light transition-colors duration-200"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'text'
    },
    label: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped></style>

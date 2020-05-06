<template>
  <div class="container mb-4">
    <label class="block text-white font-light text-xs" :for="value">
      {{ label }}
    </label>
    <input
      :type="type"
      :name="value"
      :value="value"
      class="border border-white w-full h-10 py-2 px-3 text-white bg-transparent font-light transition-colors duration-150 focus:text-grey"
      @focus="toggle"
      @blur="toggle"
      @input="$emit('input', $event.target.value)"
    />
    <transition name="scale">
      <div v-show="hover" class="w-full bg-white -mt-10 h-10" />
    </transition>
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
  },
  data() {
    return {
      hover: false
    }
  },
  methods: {
    toggle() {
      this.hover = !this.hover
    }
  }
}
</script>

<style scoped>
.scale-enter,
.scale-leave-to {
  @apply transform scale-y-0 origin-bottom;
}

.scale-enter-to {
  @apply transform scale-y-100 origin-bottom;
}

.scale-enter-active,
.scale-leave-active {
  @apply transition-transform duration-200 ease-out;
}
</style>

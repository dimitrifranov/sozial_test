<template>
  <div class=" container mb-4">
    <label class="block text-white font-light text-xs" :for="value">
      {{ label }}
    </label>
    <input
      v-bind="$attrs"
      :type="type"
      :name="value"
      :value="value"
      :class="inputClass"
      class="border border-white w-full h-10 py-2 px-3 text-white bg-transparent font-light transition-colors duration-150 focus:text-grey"
      v-on="inputListeners"
      @focus="toggle"
      @blur="toggle"
    />
    <transition name="scale">
      <div v-show="hover" class="w-full bg-white -mt-10 h-10" />
    </transition>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,

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
    },
    inputClass: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      hover: false
    }
  },
  computed: {
    inputListeners() {
      const vm = this
      // `Object.assign` merges objects together to form a new object
      return Object.assign(
        {},
        // We add all the listeners from the parent
        this.$listeners,
        // Then we can add custom listeners or override the
        // behavior of some listeners.
        {
          // This ensures that the component works with v-model
          input(event) {
            vm.$emit('input', event.target.value)
          }
        }
      )
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

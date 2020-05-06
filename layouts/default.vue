<template>
  <div>
    <topAppBar />
    <transition name="fade" mode="out-in">
      <nuxt />
    </transition>
    <bottomNav />
  </div>
</template>

<script>
import { authComputed } from '../store/helpers.js'

import topAppBar from '@/components/topAppBar.vue'
import bottomNav from '@/components/bottomNav.vue'
export default {
  components: {
    topAppBar,
    bottomNav
  },
  computed: {
    ...authComputed
  },
  head() {
    return {
      title: '%s - sozial_test',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Das beste soziale netzwerk'
        }
      ]
    }
  }
}
</script>

<style scoped>
.fade-enter,
.fade-leave-to {
  @apply opacity-0;
}

.fade-enter-active,
.fade-leave-active {
  @apply transition-opacity duration-500 ease-out;
}
</style>

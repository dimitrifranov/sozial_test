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
    user() {
      return this.$auth.user
    },
    ...authComputed
  },
  mounted() {
    window.OneSignal = window.OneSignal || []
    window.OneSignal.push(() => {
      window.OneSignal.getUserId(async (userId) => {
        await this.$store.dispatch(
          'users/updateUser',
          this.user.push({ signal_id: userId })
        )
        console.log(userId)
      })
    })
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

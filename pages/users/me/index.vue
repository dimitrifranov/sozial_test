<template>
  <div>
    <profile :user="user" />
  </div>
</template>

<script>
import profile from '@/components/profile.vue'
export default {
  components: {
    profile
  },
  middleware: 'auth',
  computed: {
    user() {
      return this.$auth.user
    }
  }
}
</script>

<style scoped></style>

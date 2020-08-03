<template>
  <div>
    <profile :user="user" />
  </div>
</template>

<script>
import profile from '@/components/profile.vue'
export default {
  middleware: 'auth',
  components: {
    profile
  },
  computed: {
    user() {
      return this.$auth.user
    }
  }
}
</script>

<style scoped></style>

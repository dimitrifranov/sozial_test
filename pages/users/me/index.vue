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
  },
  head() {
    return {
      title: 'Dein Profil',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Das ist dein persönliches Profil'
        }
      ]
    }
  }
}
</script>

<style scoped></style>

<template>
  <div class="center-items h-screen">
    <form class="text-grey" @submit.prevent="register">
      <label for="name">
        Name:
      </label>
      <input
        v-model="username"
        type="text"
        name="username"
        value
        class="w-20 h-5 bg-white"
      />

      <label for="email">
        Email:
      </label>
      <input v-model="email" type="email" name="email" value class="w-20 h-5" />

      <label for="password">
        Password:
      </label>
      <input v-model="password" type="password" name value class="w-20 h-5" />
      <button type="submit" name="button" class="w-20 h-5 bg-white">
        Register
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      email: '',
      password: ''
    }
  },
  methods: {
    register() {
      this.$store.dispatch('registration/registerUser', {
        username: this.username,
        email: this.email,
        password: this.password
      })
    }
  }
}
</script>

<style scoped></style>

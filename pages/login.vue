<template>
  <div>
    <form class="h-screen center-items" @submit.prevent="login">
      <label for="username">
        Username:
      </label>
      <input
        v-model="username"
        type="text"
        name="username"
        value
        class="w-20 h-5 bg-white"
      />

      <label for="password">
        Password:
      </label>
      <input
        v-model="password"
        type="password"
        name="password"
        value
        class="w-20 h-5 bg-white"
      />

      <button type="submit" name="button" class="w-20 h-5 bg-white">
        Login
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login() {
      this.$store.dispatch('registration/loginUser', {
        username: this.username,
        password: this.password
      })
    }
  }
}
</script>

<style scoped></style>

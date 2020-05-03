<template>
  <div class="container">
    <form class="h-screen center-items" @submit.prevent="loginUser">
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
      <label for="email">
        Email:
      </label>
      <input
        v-model="email"
        type="email"
        name="email"
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
      username: 'dimi',
      password: 'Petz2001',
      email: 'dfranov01@gmail.com'
    }
  },
  methods: {
    login() {
      this.$store.dispatch('registration/loginUser', {
        username: this.username,
        password: this.password
      })
    },
    loginUser() {
      this.$auth
        .loginWith('local', {
          data: {
            username: this.username,
            password: this.password,
            email: this.email
          }
        })
        .then(() => {
          this.$router.push('/')
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }
}
</script>

<style scoped></style>

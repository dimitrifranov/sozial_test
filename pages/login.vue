<template>
  <div class="center-items w-screen">
    <form
      class=" w-full max-w-xs h-screen center-items flex-col"
      @submit.prevent="loginUser"
    >
      <BaseInput v-model="username" value="username" label="Username:" />
      <BaseInput v-model="email" value="email" label="E-mail:" />
      <BaseInput
        v-model="password"
        value="password"
        label="Password:"
        type="password"
      />

      <BaseButton type="submit">
        Login
      </BaseButton>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      email: ''
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
          this.error({
            statusCode: 503,
            message: 'Unable to login'
          })
        })
    }
  }
}
</script>

<style scoped></style>

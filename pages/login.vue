<template>
  <div class="center-items w-screen">
    <form
      class=" w-full max-w-xs h-screen center-items flex-col"
      @submit.prevent="loginUser"
    >
      <BaseInput v-model="username" value="username" label="Benutzername:" />
      <BaseInput v-model="email" value="email" label="E-mail:" />
      <BaseInput
        v-model="password"
        value="password"
        label="Passwort:"
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
  },
  head() {
    return {
      title: 'Login',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Melde dich an um Freunden zu Folgen'
        }
      ]
    }
  }
}
</script>

<style scoped></style>

<template>
  <div class="center-items">
    <form
      class=" w-full max-w-xs h-screen center-items flex-col"
      @submit.prevent="register"
    >
      <BaseInput v-model="firstname" value="firstname" label="First Name:" />
      <BaseInput v-model="lasname" value="lastname" label="Last Name:" />
      <BaseInput v-model="username" value="username" label="Username:" />
      <BaseInput v-model="email" value="email" label="E-mail:" />
      <BaseInput
        v-model="password"
        value="password"
        label="Password:"
        type="password"
      />
      <BaseInput
        v-model="password2"
        value="password2"
        label="Password again:"
        type="password"
      />

      <BaseButton type="submit">
        Register
      </BaseButton>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      password2: '',
      firstname: '',
      lasname: ''
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

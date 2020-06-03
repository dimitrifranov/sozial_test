<template>
  <div class="center-items">
    <form
      class=" w-full max-w-xs h-screen center-items flex-col"
      @submit.prevent="registerUser"
    >
      <BaseInput
        v-model="user.firstname"
        value="firstname"
        label="First Name:"
      />
      <BaseInput v-model="user.lastname" value="lastname" label="Last Name:" />
      <BaseInput v-model="user.username" value="username" label="Username:" />
      <BaseInput v-model="user.email" value="email" label="E-mail:" />
      <BaseInput
        v-model="user.password"
        value="password"
        label="Password:"
        type="password"
      />
      <BaseInput
        v-model="user.password2"
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
import UserService from '@/services/UserService.js'
export default {
  data() {
    return {
      user: {
        username: '',
        email: '',
        password: '',
        password2: '',
        firstname: '',
        lastname: ''
      }
    }
  },
  methods: {
    register() {
      this.$store.dispatch('registration/registerUser', {
        username: this.username,
        email: this.email,
        password: this.password
      })
    },
    registerUser() {
      UserService.registerUser(this.user).then(
        this.$auth
          .loginWith('local', {
            data: {
              username: this.user.username,
              password: this.user.password,
              email: this.user.email
            }
          })
          .then(() => {
            this.$router.push('/')
          })
          .catch((e) => {
            this.error({
              statusCode: 503,
              message: 'Unable to register'
            })
          })
      )
    }
  }
}
</script>

<style scoped></style>

<template>
  <div class="center-items w-screen">
    <form
      class=" w-full max-w-xs h-screen center-items flex-col"
      @submit.prevent="loginUser"
    >
      <inputComponent v-model="username" value="username" label="Username:" />
      <inputComponent v-model="email" value="email" label="E-mail:" />
      <inputComponent
        v-model="password"
        value="password"
        label="Password:"
        type="password"
      />

      <button
        type="submit"
        name="button"
        class="font-light bg-transparent hover:bg-white text-white hover:text-grey py-2 px-4 border border-white hover:border-transparent transition-colors duration-200"
      >
        Login
      </button>
    </form>
  </div>
</template>

<script>
import inputComponent from '@/components/inputComponent.vue'
export default {
  components: {
    inputComponent
  },
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
          console.log(e)
        })
    }
  }
}
</script>

<style scoped></style>

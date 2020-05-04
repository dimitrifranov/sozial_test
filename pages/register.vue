<template>
  <div class="center-items">
    <form
      class=" w-full max-w-xs h-screen center-items flex-col"
      @submit.prevent="register"
    >
      <inputComponent
        v-model="firstname"
        value="firstname"
        label="First Name:"
      />
      <inputComponent v-model="lasname" value="lastname" label="Last Name:" />
      <inputComponent v-model="username" value="username" label="Username:" />
      <inputComponent v-model="email" value="email" label="E-mail:" />
      <inputComponent
        v-model="password"
        value="password"
        label="Password:"
        type="password"
      />
      <inputComponent
        v-model="password2"
        value="password2"
        label="Password again:"
        type="password"
      />
      <button
        type="submit"
        name="button"
        class="font-light bg-transparent hover:bg-white text-white hover:text-grey py-2 px-4 mt-2 border border-white hover:border-transparent"
      >
        Register
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

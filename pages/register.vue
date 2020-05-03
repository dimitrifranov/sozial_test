<template>
  <div class="container center-items">
    <form
      class=" w-full max-w-xs h-screen center-items flex-col"
      @submit.prevent="register"
    >
      <div class="mb-4">
        <label class="block text-white text-sm mb-2" for="username">
          Username:
        </label>
        <input
          v-model="username"
          type="text"
          name="username"
          value
          class="border border-white w-full py-2 px-3 text-white bg-transparent focus:rounded font-light"
        />
      </div>
      <div class="mb-4">
        <label class="block text-white text-sm mb-2" for="email">
          Email:
        </label>
        <input
          v-model="email"
          type="email"
          name="email"
          value
          class="border border-white w-full py-2 px-3 text-white bg-transparent focus:rounded font-light"
        />
      </div>
      <div class="mb-4">
        <label class="block text-white text-sm mb-2" for="password">
          Password:
        </label>
        <input
          v-model="password"
          type="password"
          name="password"
          value
          class="border border-white w-full py-2 px-3 text-white bg-transparent focus:rounded font-light"
        />
      </div>

      <button
        type="submit"
        name="button"
        class=" bg- bg-transparent hover:bg-white text-white hover:text-grey py-2 px-4 border border-white hover:border-transparent"
      >
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

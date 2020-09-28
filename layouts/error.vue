<template>
  <div class="container center-items h-screen">
    <div>
      <h2 class="text-white text-l leading-none text-opacity-25">
        ERROR
      </h2>
      <h3 class="text-white text-10xl leading-none -mt-4 -mb-4">
        {{ statusCode }}
      </h3>
      <h2 class="text-white text-l leading-none uppercase">
        {{ message }}
      </h2>
    </div>
  </div>
</template>
<script>
export default {
  name: 'NuxtError',
  props: {
    error: {
      // <--- Send in the error
      type: Object,
      default: null
    }
  },
  computed: {
    statusCode() {
      // <--- Get the status code
      return (this.error && this.error.statusCode) || 500
    },
    message() {
      // <--- Print the error
      return this.error.message
    }
  },
  head() {
    return {
      title: 'ERROR',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.message
        }
      ]
    }
  }
}
</script>

<style scoped></style>

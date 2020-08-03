<template>
  <div class="center-items h-screen">
    <form
      class=" w-full max-w-xs h-screen center-items flex-col"
      @submit.prevent="loginUser"
    >
      <BaseToggle :title="title" @changed="changed" />
    </form>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  data() {
    return {
      title: 'ehre',
      toggle: false
    }
  },
  methods: {
    changed() {
      this.toggle = !this.toggle
    }
  }
}
</script>

<style scoped></style>

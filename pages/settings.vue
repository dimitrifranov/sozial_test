<template>
  <div class="center-items h-screen">
    <form
      class=" w-full max-w-xs h-screen center-items flex-col"
      @submit.prevent="updateUser"
    >
      <BaseToggle v-model="toggle" :title="title" />
      <BaseButton type="submit">
        Speichern
      </BaseButton>
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
    updateUser() {}
  },
  head() {
    return {
      title: 'Einstellungen',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Personalisiere deine Einstellungen nach deinen Wünschen'
        }
      ]
    }
  }
}
</script>

<style scoped></style>

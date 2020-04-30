<template>
  <div>
    <topAppBar />
    <nuxt />
    <bottomNav />
  </div>
</template>

<script>
import topAppBar from '@/components/topAppBar.vue'
import bottomNav from '@/components/bottomNav.vue'
export default {
  components: {
    topAppBar,
    bottomNav
  },
  head() {
    return {
      title: '%s - sozial_test',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Das beste soziale netzwerk'
        }
      ]
    }
  }
}
</script>

<style scoped></style>

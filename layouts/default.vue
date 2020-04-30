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
  }
}
</script>

<style scoped></style>

<template>
  <div class="center-items h-screen">
    <postComponent :post="post" />
  </div>
</template>

<script>
import postComponent from '@/components/postComponent.vue'

export default {
  components: {
    postComponent
  },
  asyncData({ $axios, route, error }) {
    return $axios
      .get('http://localhost:8000/groups/1/posts/' + route.params.id + '/')
      .then((response) => {
        return {
          post: response.data
        }
      })
      .catch((e) => {
        error({
          statusCode: 503,
          message: 'Unable to get this Users'
        })
      })
  }
}
</script>

<style scoped></style>
